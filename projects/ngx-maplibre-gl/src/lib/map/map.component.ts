import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  afterNextRender,
  afterRender,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import type {
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
import { MapService, type MovingOptions } from './map.service';
import type { MapEvent, EventData } from './map.types';
import { firstValueFrom } from 'rxjs';

/**
 * `mgl-map` - The main map component
 * @see [Map](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/)
 *
 * @category Map Component
 *
 * @example
 * ```typescript
 * ...
 * @Component({
 *   template: `
 *   <mgl-map
 *     [style]="'https://demotiles.maplibre.org/style.json'"
 *     [zoom]="[9]"
 *     [center]="[-74.50, 40]"
 *     (mapLoad)="map = $event"
 *   ></mgl-map>
 *   `,
 * ...
 * })
 * export class DisplayMapComponent {
 *   map: Map; // MapLibre GL Map object (MapLibre is ran outside angular zone, keep that in mind when binding events from this object)
 * ...
 * }
 * ```
 */

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
export class MapComponent implements OnChanges, OnDestroy, MapEvent {
  private readonly mapService = inject(MapService);
  private readonly elementRef = inject(ElementRef);

  /** Init input */
  readonly collectResourceTiming = input<MapOptions['collectResourceTiming']>();
  /** Init input */
  readonly crossSourceCollisions = input<MapOptions['crossSourceCollisions']>();
  /** Init input */
  readonly customMapboxApiUrl = input<string>();
  /** Init input */
  readonly fadeDuration = input<MapOptions['fadeDuration']>();
  /** Init input */
  readonly hash = input<MapOptions['hash']>();
  /** Init input */
  readonly refreshExpiredTiles = input<MapOptions['refreshExpiredTiles']>();
  /** Init input */
  readonly canvasContextAttributes = input<MapOptions['canvasContextAttributes']>();
  /** Init input */
  readonly bearingSnap = input<MapOptions['bearingSnap']>();
  /** Init input */
  readonly interactive = input<MapOptions['interactive']>();
  /** Init input */
  readonly pitchWithRotate = input<MapOptions['pitchWithRotate']>();
  /** Init input */
  readonly clickTolerance = input<MapOptions['clickTolerance']>();
  /** Init input */
  readonly attributionControl = input<MapOptions['attributionControl']>();
  /** Init input */
  readonly logoPosition = input<MapOptions['logoPosition']>();
  /** Init input */
  readonly maxTileCacheSize = input<MapOptions['maxTileCacheSize']>();
  /** Init input */
  readonly localIdeographFontFamily = input<MapOptions['localIdeographFontFamily']>();
  /** Init input */
  readonly trackResize = input<MapOptions['trackResize']>();
  /** Init input */
  readonly transformRequest = input<MapOptions['transformRequest']>();
  /** Init input */
  readonly bounds = input<MapOptions['bounds']>();
  /** Init input */
  readonly locale = input<MapOptions['locale']>();
  /** Init input */
  readonly cooperativeGestures = input<MapOptions['cooperativeGestures']>();
  /** Init input */
  readonly cancelPendingTileRequestsWhileZooming = input<MapOptions['cancelPendingTileRequestsWhileZooming']>();
  /** Init input */
  readonly centerClampedToGround = input<MapOptions['centerClampedToGround']>();
  /** Init input */
  readonly maplibreLogo = input<MapOptions['maplibreLogo']>();
  /** Init input */
  readonly maxCanvasSize = input<MapOptions['maxCanvasSize']>();
  /** Init input */
  readonly maxTileCacheZoomLevels = input<MapOptions['maxTileCacheZoomLevels']>();
  /** Init input */
  readonly pixelRatio = input<MapOptions['pixelRatio']>();
  /** Init input */
  readonly rollEnabled = input<MapOptions['rollEnabled']>();
  /** Init input */
  readonly transformCameraUpdate = input<MapOptions['transformCameraUpdate']>();
  /** Init input */
  readonly validateStyle = input<MapOptions['validateStyle']>();

  /** Dynamic input */
  readonly minZoom = input<MapOptions['minZoom']>();
  /** Dynamic input */
  readonly maxZoom = input<MapOptions['maxZoom']>();
  /** Dynamic input */
  readonly minPitch = input<MapOptions['minPitch']>();
  /** Dynamic input */
  readonly maxPitch = input<MapOptions['maxPitch']>();
  /** Dynamic input */
  readonly scrollZoom = input<MapOptions['scrollZoom']>();
  /** Dynamic input */
  readonly dragRotate = input<MapOptions['dragRotate']>();
  /** Dynamic input */
  readonly touchPitch = input<MapOptions['touchPitch']>();
  /** Dynamic input */
  readonly touchZoomRotate = input<MapOptions['touchZoomRotate']>();
  /** Dynamic input */
  readonly doubleClickZoom = input<MapOptions['doubleClickZoom']>();
  /** Dynamic input */
  readonly keyboard = input<MapOptions['keyboard']>();
  /** Dynamic input */
  readonly dragPan = input<MapOptions['dragPan']>();
  /** Dynamic input */
  readonly boxZoom = input<MapOptions['boxZoom']>();
  /** Dynamic input */
  readonly style = input.required<MapOptions['style']>();
  /** Dynamic input */
  readonly center = input<MapOptions['center']>();
  /** Dynamic input */
  readonly maxBounds = input<MapOptions['maxBounds']>();
  /** Dynamic input */
  readonly zoom = input<[number]>();
  /** Dynamic input */
  readonly bearing = input<[number]>();
  /** Dynamic input */
  readonly pitch = input<[number]>();
  /** Dynamic input */
  readonly roll = input<MapOptions['roll']>();
  /** Dynamic input */
  readonly fitBoundsOptions = input<MapOptions['fitBoundsOptions']>(); // First value goes to options.fitBoundsOptions. Subsequents changes are passed to fitBounds
  /** Dynamic input */
  readonly renderWorldCopies = input<MapOptions['renderWorldCopies']>();
  /** Dynamic input */
  readonly terrain = input<TerrainSpecification>();
  /** Dynamic input */
  readonly elevation = input<MapOptions['elevation']>();


  /** Added by ngx-mapbox-gl */
  readonly movingMethod = input<'jumpTo' | 'easeTo' | 'flyTo'>('flyTo');
  readonly movingOptions = input<MovingOptions>();

  // => First value is a alias to bounds input (since mapbox 0.53.0). Subsequents changes are passed to fitBounds
  readonly fitBounds = input<LngLatBoundsLike>();
  readonly fitScreenCoordinates = input<[PointLike, PointLike]>();
  readonly centerWithPanTo = input<boolean>();
  readonly panToOptions = input<AnimationOptions>();
  readonly cursorStyle = input<string>();

  readonly mapResize = output<MapLibreEvent & EventData>();
  readonly mapRemove = output<MapLibreEvent & EventData>();
  readonly mapMouseDown = output<MapMouseEvent & EventData>();
  readonly mapMouseUp = output<MapMouseEvent & EventData>();
  readonly mapMouseMove = output<MapMouseEvent & EventData>();
  readonly mapClick = output<MapMouseEvent & EventData>();
  readonly mapDblClick = output<MapMouseEvent & EventData>();
  readonly mapMouseOver = output<MapMouseEvent & EventData>();
  readonly mapMouseOut = output<MapMouseEvent & EventData>();
  readonly mapContextMenu = output<MapMouseEvent & EventData>();
  readonly mapTouchStart = output<MapTouchEvent & EventData>();
  readonly mapTouchEnd = output<MapTouchEvent & EventData>();
  readonly mapTouchMove = output<MapTouchEvent & EventData>();
  readonly mapTouchCancel = output<MapTouchEvent & EventData>();
  readonly mapWheel = output<MapWheelEvent & EventData>();
  readonly moveStart = output<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >();
  readonly move = output<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >();
  readonly moveEnd = output<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >();
  readonly mapDragStart = output<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  readonly mapDrag = output<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  readonly mapDragEnd = output<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  readonly zoomStart = output<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >();
  readonly zoomEvt = output<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >();
  readonly zoomEnd = output<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >();
  readonly rotateStart = output<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  readonly rotate = output<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  readonly rotateEnd = output<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  readonly pitchStart = output<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  readonly pitchEvt = output<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  readonly pitchEnd = output<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  readonly boxZoomStart = output<MapLibreZoomEvent & EventData>();
  readonly boxZoomEnd = output<MapLibreZoomEvent & EventData>();
  readonly boxZoomCancel = output<MapLibreZoomEvent & EventData>();
  readonly webGlContextLost = output<MapContextEvent & EventData>();
  readonly webGlContextRestored = output<MapContextEvent & EventData>();
  readonly mapLoad = output<Map>();
  readonly idle = output<MapLibreEvent & EventData>();
  readonly render = output<MapLibreEvent & EventData>();
  readonly mapError = output<ErrorEvent & EventData>();
  readonly data = output<MapDataEvent & EventData>();
  readonly styleData = output<MapStyleDataEvent & EventData>();
  readonly sourceData = output<MapSourceDataEvent & EventData>();
  readonly dataLoading = output<MapDataEvent & EventData>();
  readonly styleDataLoading = output<MapStyleDataEvent & EventData>();
  readonly sourceDataLoading = output<MapSourceDataEvent & EventData>();
  readonly styleImageMissing = output<
    {
      id: string;
    } & EventData
  >();

  get mapInstance(): Map {
    return this.mapService.mapInstance;
  }

  readonly mapContainer =
    viewChild.required<ElementRef<HTMLDivElement>>('container');

  constructor() {
    afterNextRender(() => {
      if (this.canvasContextAttributes()?.preserveDrawingBuffer) {
        // This is to allow better interaction with the map state
        const htmlElement: HTMLElement = this.elementRef.nativeElement;
        htmlElement.setAttribute('data-cy', 'map');
        this.mapLoad.subscribe(() => {
          htmlElement.setAttribute('data-loaded', 'true');
        });
        this.idle.subscribe(() => {
          htmlElement.setAttribute('data-idle', 'true');
        });
        this.render.subscribe(() => {
          htmlElement.removeAttribute('data-idle');
        });
      }
      this.mapService.setup({
        mapOptions: {
          collectResourceTiming: this.collectResourceTiming(),
          container: this.mapContainer().nativeElement,
          crossSourceCollisions: this.crossSourceCollisions(),
          fadeDuration: this.fadeDuration(),
          minZoom: this.minZoom(),
          maxZoom: this.maxZoom(),
          minPitch: this.minPitch(),
          maxPitch: this.maxPitch(),
          style: this.style(),
          hash: this.hash(),
          interactive: this.interactive(),
          bearingSnap: this.bearingSnap(),
          pitchWithRotate: this.pitchWithRotate(),
          clickTolerance: this.clickTolerance(),
          attributionControl: this.attributionControl(),
          logoPosition: this.logoPosition(),
          canvasContextAttributes: this.canvasContextAttributes(),
          refreshExpiredTiles: this.refreshExpiredTiles(),
          maxBounds: this.maxBounds(),
          scrollZoom: this.scrollZoom(),
          boxZoom: this.boxZoom(),
          dragRotate: this.dragRotate(),
          dragPan: this.dragPan(),
          keyboard: this.keyboard(),
          doubleClickZoom: this.doubleClickZoom(),
          touchPitch: this.touchPitch(),
          touchZoomRotate: this.touchZoomRotate(),
          trackResize: this.trackResize(),
          center: this.center(),
          zoom: this.zoom(),
          bearing: this.bearing(),
          pitch: this.pitch(),
          roll: this.roll(),
          renderWorldCopies: this.renderWorldCopies(),
          maxTileCacheSize: this.maxTileCacheSize(),
          localIdeographFontFamily: this.localIdeographFontFamily(),
          transformRequest: this.transformRequest(),
          bounds: this.bounds() ? this.bounds() : this.fitBounds(),
          fitBoundsOptions: this.fitBoundsOptions(),
          locale: this.locale,
          cooperativeGestures: this.cooperativeGestures(),
          terrain: this.terrain(),
          cancelPendingTileRequestsWhileZooming: this.cancelPendingTileRequestsWhileZooming(),
          centerClampedToGround: this.centerClampedToGround(),
          elevation: this.elevation(),
          maplibreLogo: this.maplibreLogo(),
          maxCanvasSize: this.maxCanvasSize(),
          maxTileCacheZoomLevels: this.maxTileCacheZoomLevels(),
          pixelRatio: this.pixelRatio(),
          rollEnabled: this.rollEnabled(),
          transformCameraUpdate: this.transformCameraUpdate(),
          validateStyle: this.validateStyle()
        },
        mapEvents: this,
      });
      const cursorStyle = this.cursorStyle();
      if (cursorStyle) {
        this.mapService.changeCanvasCursor(cursorStyle);
      }
    });

    afterRender(() => {
      this.mapService.clearMapElements();
    });
  }

  ngOnDestroy(): void {
    this.mapService.destroyMap();
  }

  async ngOnChanges(changes: SimpleChanges) {
    await firstValueFrom(this.mapService.mapCreated$);
    const zoom = this.zoom();
    const bearing = this.bearing();
    const pitch = this.pitch();
    const center = this.center();

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
        this.fitBoundsOptions()
      );
    }
    if (
      changes.fitScreenCoordinates &&
      changes.fitScreenCoordinates.currentValue
    ) {
      if (
        (center || zoom || pitch || this.fitBounds()) &&
        changes.fitScreenCoordinates.isFirstChange()
      ) {
        console.warn(
          '[ngx-maplibre-gl] center / zoom / pitch / fitBounds inputs are being overridden by fitScreenCoordinates input'
        );
      }
      this.mapService.fitScreenCoordinates(
        changes.fitScreenCoordinates.currentValue,
        bearing ? bearing[0] : 0,
        this.movingOptions()
      );
    }
    if (
      this.centerWithPanTo() &&
      changes.center &&
      !changes.center.isFirstChange() &&
      !changes.zoom &&
      !changes.bearing &&
      !changes.pitch &&
      !changes.roll
    ) {
      this.mapService.panTo(this.center()!, this.panToOptions());
    } else if (
      (changes.center && !changes.center.isFirstChange()) ||
      (changes.zoom && !changes.zoom.isFirstChange()) ||
      (changes.bearing && !changes.bearing.isFirstChange() && !changes.fitScreenCoordinates) ||
      (changes.pitch && !changes.pitch.isFirstChange()) ||
      (changes.roll && !changes.roll.isFirstChange())
    ) {
      this.mapService.move(
        this.movingMethod(),
        this.movingOptions(),
        changes.zoom && zoom ? zoom[0] : undefined,
        changes.center ? center : undefined,
        changes.bearing && bearing ? bearing[0] : undefined,
        changes.pitch && pitch ? pitch[0] : undefined,
        changes.roll ? changes.roll.currentValue : undefined
      );
    }
    if (changes.terrain && !changes.terrain.isFirstChange()) {
      this.mapService.updateTerrain(changes.terrain.currentValue);
    }
    if (changes.elevation && !changes.elevation.isFirstChange()) {
      this.mapService.setCenterElevation(changes.elevation.currentValue);
    }
  }
}
