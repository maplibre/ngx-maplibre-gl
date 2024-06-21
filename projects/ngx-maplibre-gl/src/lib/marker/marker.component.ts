import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
  afterRender,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import type { LngLatLike, Marker, MarkerOptions } from 'maplibre-gl';
import { MapService } from '../map/map.service';

/**
 * `mgl-marker` - a marker component
 * @see [Marker](https://maplibre.org/maplibre-gl-js/docs/API/classes/Marker/)
 *
 * @category Components
 *
 * @example
 * ```html
 * ...
 * <mgl-map ...>
 *   <mgl-marker [lngLat]="[-66.324462890625, -16.024695711685304]">
 *     <div (click)="alert('Foo')" class="marker">Hello</div>
 *   </mgl-marker>
 * </mgl-map>
 * ```
 *
 * Note: Only use this if you **really** need to use HTML/Angular component to render your symbol. These markers are slow compared to a `Layer` of symbol because they're not rendered using WebGL.
 */
@Component({
  selector: 'mgl-marker',
  template: '<div [class]="className()" #content><ng-content></ng-content></div>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class MarkerComponent implements OnChanges, OnDestroy, OnInit {
  /* Init injection */
  private readonly mapService = inject(MapService);

  /* Init input */
  readonly offset = input<MarkerOptions['offset']>();
  readonly anchor = input<MarkerOptions['anchor']>();
  readonly clickTolerance = input<MarkerOptions['clickTolerance']>();
  readonly color = input<MarkerOptions['color']>();

  /* Dynamic input */
  readonly feature = input<GeoJSON.Feature<GeoJSON.Point>>();
  readonly lngLat = input<LngLatLike>();
  readonly draggable = input<MarkerOptions['draggable']>();
  readonly popupShown = input<boolean>();
  readonly className = input<string>();
  readonly pitchAlignment = input<MarkerOptions['pitchAlignment']>();
  readonly rotationAlignment = input<MarkerOptions['rotationAlignment']>();
  readonly rotation = input<MarkerOptions['rotation']>();

  readonly markerDragStart = output<Marker>();
  readonly markerDragEnd = output<Marker>();
  readonly markerDrag = output<Marker>();

  readonly content = viewChild.required<string, ElementRef>('content', {
    read: ElementRef,
  });

  readonly markerInstance = signal<Marker | null>(null);

  constructor() {
    afterRender(() => {
      this.mapService.mapCreated$.subscribe(() => {
        const marker = this.mapService.addMarker({
          markersOptions: {
            offset: this.offset(),
            anchor: this.anchor(),
            color: this.color(),
            pitchAlignment: this.pitchAlignment(),
            rotationAlignment: this.rotationAlignment(),
            rotation: this.rotation(),
            draggable: !!this.draggable(),
            element: this.content().nativeElement,
            feature: this.feature(),
            lngLat: this.lngLat(),
            clickTolerance: this.clickTolerance(),
          },
          markersEvents: {
            markerDragStart: this.markerDragStart,
            markerDrag: this.markerDrag,
            markerDragEnd: this.markerDragEnd,
          },
        });
        this.markerInstance.set(marker);
      });
    });
  }

  ngOnInit() {
    if (this.feature() && this.lngLat()) {
      throw new Error('feature and lngLat input are mutually exclusive');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const markerInstance = this.markerInstance()!;
    if (changes.lngLat && !changes.lngLat.isFirstChange()) {
      markerInstance.setLngLat(changes.lngLat.currentValue);
    }

    if (changes.feature && !changes.feature.isFirstChange()) {
      markerInstance.setLngLat(
        <[number, number]>changes.feature.currentValue.geometry.coordinates
      );
    }
    if (changes.draggable && !changes.draggable.isFirstChange()) {
      markerInstance.setDraggable(!!changes.draggable.currentValue);
    }
    if (changes.popupShown && !changes.popupShown.isFirstChange()) {
      changes.popupShown.currentValue
        ? markerInstance.getPopup().addTo(this.mapService.mapInstance)
        : markerInstance.getPopup().remove();
    }
    if (changes.pitchAlignment && !changes.pitchAlignment.isFirstChange()) {
      markerInstance.setPitchAlignment(changes.pitchAlignment.currentValue);
    }
    if (
      changes.rotationAlignment &&
      !changes.rotationAlignment.isFirstChange()
    ) {
      markerInstance.setRotationAlignment(
        changes.rotationAlignment.currentValue
      );
    }
    if (changes.rotation && !changes.rotation.isFirstChange()) {
      markerInstance.setRotation(changes.rotation.currentValue);
    }
  }

  ngOnDestroy() {
    this.mapService.removeMarker(this.markerInstance()!);
    this.markerInstance.set(null);
  }

  togglePopup() {
    this.markerInstance()!.togglePopup();
  }

  updateCoordinates(coordinates: number[]) {
    this.markerInstance()!.setLngLat(<[number, number]>coordinates);
  }
}
