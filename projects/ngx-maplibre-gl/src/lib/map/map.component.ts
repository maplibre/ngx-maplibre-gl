import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  AnimationOptions,
  LngLatBoundsLike,
  Map,
  MapLibreEvent,
  MapOptions,
  MapLibreZoomEvent,
  MapContextEvent,
  MapDataEvent,
  MapMouseEvent,
  MapSourceDataEvent,
  MapStyleDataEvent,
  MapTouchEvent,
  MapWheelEvent,
  PointLike,
  TerrainSpecification,
} from 'maplibre-gl';
import { MapService, MovingOptions } from './map.service';
import { MapEvent, EventData } from './map.types';
import { Subscription, firstValueFrom } from 'rxjs';

@Component({
  selector: 'mgl-map',
  template: '<div #container></div>',
  styles: [
    `
      :host {
        display: block;
      }
      div {
        height: 100%;
        width: 100%;
      }
    `,
  ],
  providers: [MapService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class MapComponent
  implements
    OnChanges,
    OnDestroy,
    AfterViewInit,
    Omit<MapOptions, 'bearing' | 'container' | 'pitch' | 'zoom'>,
    MapEvent {
  /* Init inputs */
  @Input() collectResourceTiming?: MapOptions['collectResourceTiming'];
  @Input() crossSourceCollisions?: MapOptions['crossSourceCollisions'];
  @Input() customMapboxApiUrl?: string;
  @Input() fadeDuration?: MapOptions['fadeDuration'];
  @Input() hash?: MapOptions['hash'];
  @Input() refreshExpiredTiles?: MapOptions['refreshExpiredTiles'];
  @Input()
  failIfMajorPerformanceCaveat?: MapOptions['failIfMajorPerformanceCaveat'];
  @Input() bearingSnap?: MapOptions['bearingSnap'];
  @Input() interactive?: MapOptions['interactive'];
  @Input() pitchWithRotate?: MapOptions['pitchWithRotate'];
  @Input() clickTolerance?: MapOptions['clickTolerance'];
  @Input() attributionControl?: MapOptions['attributionControl'];
  @Input() logoPosition?: MapOptions['logoPosition'];
  @Input() maxTileCacheSize?: MapOptions['maxTileCacheSize'];
  @Input() localIdeographFontFamily?: MapOptions['localIdeographFontFamily'];
  @Input() preserveDrawingBuffer?: MapOptions['preserveDrawingBuffer'];
  @Input() trackResize?: MapOptions['trackResize'];
  @Input() transformRequest?: MapOptions['transformRequest'];
  @Input() bounds?: MapOptions['bounds']; // Use fitBounds for dynamic input
  @Input() antialias?: MapOptions['antialias'];
  @Input() locale: MapOptions['locale'];
  @Input() cooperativeGestures?: MapOptions['cooperativeGestures'];

  /* Dynamic inputs */
  @Input() minZoom?: MapOptions['minZoom'];
  @Input() maxZoom?: MapOptions['maxZoom'];
  @Input() minPitch?: MapOptions['minPitch'];
  @Input() maxPitch?: MapOptions['maxPitch'];
  @Input() scrollZoom?: MapOptions['scrollZoom'];
  @Input() dragRotate?: MapOptions['dragRotate'];
  @Input() touchPitch?: MapOptions['touchPitch'];
  @Input() touchZoomRotate?: MapOptions['touchZoomRotate'];
  @Input() doubleClickZoom?: MapOptions['doubleClickZoom'];
  @Input() keyboard?: MapOptions['keyboard'];
  @Input() dragPan?: MapOptions['dragPan'];
  @Input() boxZoom?: MapOptions['boxZoom'];
  @Input() style: MapOptions['style'];
  @Input() center?: MapOptions['center'];
  @Input() maxBounds?: MapOptions['maxBounds'];
  @Input() zoom?: [number];
  @Input() bearing?: [number];
  @Input() pitch?: [number];
  @Input() fitBoundsOptions?: MapOptions['fitBoundsOptions']; // First value goes to options.fitBoundsOptions. Subsequents changes are passed to fitBounds
  @Input() renderWorldCopies?: MapOptions['renderWorldCopies'];

  /* Added by ngx-mapbox-gl */
  @Input() movingMethod: 'jumpTo' | 'easeTo' | 'flyTo' = 'flyTo';
  @Input() movingOptions?: MovingOptions;
  @Input() terrain: TerrainSpecification;

  // => First value is a alias to bounds input (since mapbox 0.53.0). Subsequents changes are passed to fitBounds
  @Input() fitBounds?: LngLatBoundsLike;
  @Input() fitScreenCoordinates?: [PointLike, PointLike];
  @Input() centerWithPanTo?: boolean;
  @Input() panToOptions?: AnimationOptions;
  @Input() cursorStyle?: string;

  @Output() mapResize = new EventEmitter<MapLibreEvent & EventData>();
  @Output() mapRemove = new EventEmitter<MapLibreEvent & EventData>();
  @Output() mapMouseDown = new EventEmitter<MapMouseEvent & EventData>();
  @Output() mapMouseUp = new EventEmitter<MapMouseEvent & EventData>();
  @Output() mapMouseMove = new EventEmitter<MapMouseEvent & EventData>();
  @Output() mapClick = new EventEmitter<MapMouseEvent & EventData>();
  @Output() mapDblClick = new EventEmitter<MapMouseEvent & EventData>();
  @Output() mapMouseOver = new EventEmitter<MapMouseEvent & EventData>();
  @Output() mapMouseOut = new EventEmitter<MapMouseEvent & EventData>();
  @Output() mapContextMenu = new EventEmitter<MapMouseEvent & EventData>();
  @Output() mapTouchStart = new EventEmitter<MapTouchEvent & EventData>();
  @Output() mapTouchEnd = new EventEmitter<MapTouchEvent & EventData>();
  @Output() mapTouchMove = new EventEmitter<MapTouchEvent & EventData>();
  @Output() mapTouchCancel = new EventEmitter<MapTouchEvent & EventData>();
  @Output() mapWheel = new EventEmitter<MapWheelEvent & EventData>();
  @Output() moveStart = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >();
  @Output() move = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >();
  @Output() moveEnd = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >();
  @Output() mapDragStart = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  @Output() mapDrag = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  @Output() mapDragEnd = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  @Output() zoomStart = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >();
  @Output() zoomEvt = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >();
  @Output() zoomEnd = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >();
  @Output() rotateStart = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  @Output() rotate = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  @Output() rotateEnd = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  @Output() pitchStart = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  @Output() pitchEvt = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  @Output() pitchEnd = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  @Output() boxZoomStart = new EventEmitter<MapLibreZoomEvent & EventData>();
  @Output() boxZoomEnd = new EventEmitter<MapLibreZoomEvent & EventData>();
  @Output() boxZoomCancel = new EventEmitter<MapLibreZoomEvent & EventData>();
  @Output() webGlContextLost = new EventEmitter<MapContextEvent & EventData>();
  @Output() webGlContextRestored = new EventEmitter<
    MapContextEvent & EventData
  >();
  @Output() mapLoad = new EventEmitter<Map>();
  @Output() idle = new EventEmitter<MapLibreEvent & EventData>();
  @Output() render = new EventEmitter<MapLibreEvent & EventData>();
  @Output() mapError = new EventEmitter<ErrorEvent & EventData>();
  @Output() data = new EventEmitter<MapDataEvent & EventData>();
  @Output() styleData = new EventEmitter<MapStyleDataEvent & EventData>();
  @Output() sourceData = new EventEmitter<MapSourceDataEvent & EventData>();
  @Output() dataLoading = new EventEmitter<MapDataEvent & EventData>();
  @Output() styleDataLoading = new EventEmitter<
    MapStyleDataEvent & EventData
  >();
  @Output() sourceDataLoading = new EventEmitter<
    MapSourceDataEvent & EventData
  >();
  @Output() styleImageMissing = new EventEmitter<{ id: string } & EventData>();

  get mapInstance(): Map {
    return this.mapService.mapInstance;
  }

  private subscriptions: Subscription[] = [];

  @ViewChild('container', { static: true }) mapContainer: ElementRef;

  constructor(private mapService: MapService, private elementRef: ElementRef) {}

  ngAfterViewInit() {
    if (this.preserveDrawingBuffer) { // This is to allow better interaction with the map state
      const htmlElement: HTMLElement = this.elementRef.nativeElement;
      htmlElement.setAttribute('data-cy', 'map');
      this.subscriptions.push(this.mapLoad.subscribe(() => {
        htmlElement.setAttribute('data-loaded', 'true');
      }));
      this.subscriptions.push(this.idle.subscribe(() => {
        htmlElement.setAttribute('data-idle', 'true');
      }));
      this.subscriptions.push(this.render.subscribe(() => {
        htmlElement.removeAttribute('data-idle');
      }));
    }
    
    this.mapService.setup({
      mapOptions: {
        collectResourceTiming: this.collectResourceTiming,
        container: this.mapContainer.nativeElement,
        crossSourceCollisions: this.crossSourceCollisions,
        fadeDuration: this.fadeDuration,
        minZoom: this.minZoom,
        maxZoom: this.maxZoom,
        minPitch: this.minPitch,
        maxPitch: this.maxPitch,
        style: this.style,
        hash: this.hash,
        interactive: this.interactive,
        bearingSnap: this.bearingSnap,
        pitchWithRotate: this.pitchWithRotate,
        clickTolerance: this.clickTolerance,
        attributionControl: this.attributionControl,
        logoPosition: this.logoPosition,
        failIfMajorPerformanceCaveat: this.failIfMajorPerformanceCaveat,
        preserveDrawingBuffer: this.preserveDrawingBuffer,
        refreshExpiredTiles: this.refreshExpiredTiles,
        maxBounds: this.maxBounds,
        scrollZoom: this.scrollZoom,
        boxZoom: this.boxZoom,
        dragRotate: this.dragRotate,
        dragPan: this.dragPan,
        keyboard: this.keyboard,
        doubleClickZoom: this.doubleClickZoom,
        touchPitch: this.touchPitch,
        touchZoomRotate: this.touchZoomRotate,
        trackResize: this.trackResize,
        center: this.center,
        zoom: this.zoom,
        bearing: this.bearing,
        pitch: this.pitch,
        renderWorldCopies: this.renderWorldCopies,
        maxTileCacheSize: this.maxTileCacheSize,
        localIdeographFontFamily: this.localIdeographFontFamily,
        transformRequest: this.transformRequest,
        bounds: this.bounds ? this.bounds : this.fitBounds,
        fitBoundsOptions: this.fitBoundsOptions,
        antialias: this.antialias,
        locale: this.locale,
        cooperativeGestures: this.cooperativeGestures,
        terrain: this.terrain,
      },
      mapEvents: this,
    });
    if (this.cursorStyle) {
      this.mapService.changeCanvasCursor(this.cursorStyle);
    }
  }

  ngOnDestroy() {
    this.mapService.destroyMap();
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  async ngOnChanges(changes: SimpleChanges) {
    await firstValueFrom(this.mapService.mapCreated$);
    if (changes.cursorStyle && !changes.cursorStyle.isFirstChange()) {
      this.mapService.changeCanvasCursor(changes.cursorStyle.currentValue);
    }
    if (changes.minZoom && !changes.minZoom.isFirstChange()) {
      this.mapService.updateMinZoom(changes.minZoom.currentValue);
    }
    if (changes.maxZoom && !changes.maxZoom.isFirstChange()) {
      this.mapService.updateMaxZoom(changes.maxZoom.currentValue);
    }
    if (changes.minPitch && !changes.minPitch.isFirstChange()) {
      this.mapService.updateMinPitch(changes.minPitch.currentValue);
    }
    if (changes.maxPitch && !changes.maxPitch.isFirstChange()) {
      this.mapService.updateMaxPitch(changes.maxPitch.currentValue);
    }
    if (
      changes.renderWorldCopies &&
      !changes.renderWorldCopies.isFirstChange()
    ) {
      this.mapService.updateRenderWorldCopies(
        changes.renderWorldCopies.currentValue
      );
    }
    if (changes.scrollZoom && !changes.scrollZoom.isFirstChange()) {
      this.mapService.updateScrollZoom(changes.scrollZoom.currentValue);
    }
    if (changes.dragRotate && !changes.dragRotate.isFirstChange()) {
      this.mapService.updateDragRotate(changes.dragRotate.currentValue);
    }
    if (changes.touchPitch && !changes.touchPitch.isFirstChange()) {
      this.mapService.updateTouchPitch(changes.touchPitch.currentValue);
    }
    if (changes.touchZoomRotate && !changes.touchZoomRotate.isFirstChange()) {
      this.mapService.updateTouchZoomRotate(
        changes.touchZoomRotate.currentValue
      );
    }
    if (changes.doubleClickZoom && !changes.doubleClickZoom.isFirstChange()) {
      this.mapService.updateDoubleClickZoom(
        changes.doubleClickZoom.currentValue
      );
    }
    if (changes.keyboard && !changes.keyboard.isFirstChange()) {
      this.mapService.updateKeyboard(changes.keyboard.currentValue);
    }
    if (changes.dragPan && !changes.dragPan.isFirstChange()) {
      this.mapService.updateDragPan(changes.dragPan.currentValue);
    }
    if (changes.boxZoom && !changes.boxZoom.isFirstChange()) {
      this.mapService.updateBoxZoom(changes.boxZoom.currentValue);
    }
    if (changes.style && !changes.style.isFirstChange()) {
      this.mapService.updateStyle(changes.style.currentValue);
    }
    if (changes.maxBounds && !changes.maxBounds.isFirstChange()) {
      this.mapService.updateMaxBounds(changes.maxBounds.currentValue);
    }
    if (
      changes.fitBounds &&
      changes.fitBounds.currentValue &&
      !changes.fitBounds.isFirstChange()
    ) {
      this.mapService.fitBounds(
        changes.fitBounds.currentValue,
        this.fitBoundsOptions
      );
    }
    if (
      changes.fitScreenCoordinates &&
      changes.fitScreenCoordinates.currentValue
    ) {
      if (
        (this.center || this.zoom || this.pitch || this.fitBounds) &&
        changes.fitScreenCoordinates.isFirstChange()
      ) {
        console.warn(
          '[ngx-maplibre-gl] center / zoom / pitch / fitBounds inputs are being overridden by fitScreenCoordinates input'
        );
      }
      this.mapService.fitScreenCoordinates(
        changes.fitScreenCoordinates.currentValue,
        this.bearing ? this.bearing[0] : 0,
        this.movingOptions
      );
    }
    if (
      this.centerWithPanTo &&
      changes.center &&
      !changes.center.isFirstChange() &&
      !changes.zoom &&
      !changes.bearing &&
      !changes.pitch
    ) {
      this.mapService.panTo(this.center!, this.panToOptions);
    } else if (
      (changes.center && !changes.center.isFirstChange()) ||
      (changes.zoom && !changes.zoom.isFirstChange()) ||
      (changes.bearing &&
        !changes.bearing.isFirstChange() &&
        !changes.fitScreenCoordinates) ||
      (changes.pitch && !changes.pitch.isFirstChange())
    ) {
      this.mapService.move(
        this.movingMethod,
        this.movingOptions,
        changes.zoom && this.zoom ? this.zoom[0] : undefined,
        changes.center ? this.center : undefined,
        changes.bearing && this.bearing ? this.bearing[0] : undefined,
        changes.pitch && this.pitch ? this.pitch[0] : undefined
      );
    }
    if (changes.terrain && !changes.terrain.isFirstChange()) {
      this.mapService.updateTerrain(changes.terrain.currentValue);
    }
  }
}
