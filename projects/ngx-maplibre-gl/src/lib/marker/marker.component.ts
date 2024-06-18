import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
  inject,
  output,
  viewChild,
} from '@angular/core';
import { LngLatLike, Marker, MarkerOptions } from 'maplibre-gl';
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
  template: '<div [class]="className" #content><ng-content></ng-content></div>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class MarkerComponent
  implements OnChanges, OnDestroy, AfterViewInit, OnInit
{
  /* Init injection */
  private readonly mapService = inject(MapService);

  /* Init input */
  @Input() offset?: MarkerOptions['offset'];
  @Input() anchor?: MarkerOptions['anchor'];
  @Input() clickTolerance?: MarkerOptions['clickTolerance'];
  @Input() color?: MarkerOptions['color'];

  /* Dynamic input */
  @Input() feature?: GeoJSON.Feature<GeoJSON.Point>;
  @Input() lngLat?: LngLatLike;
  @Input() draggable?: MarkerOptions['draggable'];
  @Input() popupShown?: boolean;
  @Input() className: string;
  @Input() pitchAlignment?: MarkerOptions['pitchAlignment'];
  @Input() rotationAlignment?: MarkerOptions['rotationAlignment'];
  @Input() rotation?: MarkerOptions['rotation'];

  readonly markerDragStart = output<Marker>();
  readonly markerDragEnd = output<Marker>();
  readonly markerDrag = output<Marker>();

  readonly content = viewChild.required<ElementRef>('content');

  markerInstance?: Marker;

  ngOnInit() {
    if (this.feature && this.lngLat) {
      throw new Error('feature and lngLat input are mutually exclusive');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.lngLat && !changes.lngLat.isFirstChange()) {
      this.markerInstance!.setLngLat(this.lngLat!);
    }
    if (changes.feature && !changes.feature.isFirstChange()) {
      this.markerInstance!.setLngLat(
        <[number, number]>this.feature!.geometry!.coordinates
      );
    }
    if (changes.draggable && !changes.draggable.isFirstChange()) {
      this.markerInstance!.setDraggable(!!this.draggable);
    }
    if (changes.popupShown && !changes.popupShown.isFirstChange()) {
      changes.popupShown.currentValue
        ? this.markerInstance!.getPopup().addTo(this.mapService.mapInstance)
        : this.markerInstance!.getPopup().remove();
    }
    if (changes.pitchAlignment && !changes.pitchAlignment.isFirstChange()) {
      this.markerInstance!.setPitchAlignment(
        changes.pitchAlignment.currentValue
      );
    }
    if (
      changes.rotationAlignment &&
      !changes.rotationAlignment.isFirstChange()
    ) {
      this.markerInstance!.setRotationAlignment(
        changes.rotationAlignment.currentValue
      );
    }
    if (changes.rotation && !changes.rotation.isFirstChange()) {
      this.markerInstance!.setRotation(changes.rotation.currentValue);
    }
  }

  ngAfterViewInit() {
    this.mapService.mapCreated$.subscribe(() => {
      this.markerInstance = this.mapService.addMarker({
        markersOptions: {
          offset: this.offset,
          anchor: this.anchor,
          color: this.color,
          pitchAlignment: this.pitchAlignment,
          rotationAlignment: this.rotationAlignment,
          rotation: this.rotation,
          draggable: !!this.draggable,
          element: this.content().nativeElement,
          feature: this.feature,
          lngLat: this.lngLat,
          clickTolerance: this.clickTolerance,
        },
        markersEvents: {
          markerDragStart: this.markerDragStart,
          markerDrag: this.markerDrag,
          markerDragEnd: this.markerDragEnd,
        },
      });
    });
  }

  ngOnDestroy() {
    this.mapService.removeMarker(this.markerInstance!);
    this.markerInstance = undefined;
  }

  togglePopup() {
    this.markerInstance!.togglePopup();
  }

  updateCoordinates(coordinates: number[]) {
    this.markerInstance!.setLngLat(<[number, number]>coordinates);
  }
}
