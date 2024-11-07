import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
  afterNextRender,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import type { LngLatLike, Marker, MarkerOptions } from 'maplibre-gl';
import { MapService } from '../map/map.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  template: `<div [class]="className()" #content>
    <ng-content></ng-content>
  </div>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class MarkerComponent implements OnChanges, OnInit, OnDestroy {
  /** Init injection */
  private readonly mapService = inject(MapService);
  private readonly destroyRef = inject(DestroyRef);

  /** Init inputs */
  readonly offset = input<MarkerOptions['offset']>();
  readonly anchor = input<MarkerOptions['anchor']>();
  readonly clickTolerance = input<MarkerOptions['clickTolerance']>();
  readonly color = input<MarkerOptions['color']>();
  readonly scale = input<MarkerOptions['scale']>();
  readonly opacity = input<MarkerOptions['opacity']>();
  readonly opacityWhenCovered = input<MarkerOptions['opacityWhenCovered']>();
  readonly subpixelPositioning = input<MarkerOptions['subpixelPositioning']>();
  /** Dynamic input */
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

  readonly content = viewChild.required<ElementRef<HTMLDivElement>>('content');

  readonly markerInstance = signal<Marker | null>(null);

  constructor() {
    afterNextRender(() => {
      this.mapService.mapCreated$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          const marker = this.mapService.addMarker({
            markersOptions: {
              element: this.content().nativeElement,
              feature: this.feature(),
              lngLat: this.lngLat(),
              offset: this.offset(),
              anchor: this.anchor(),
              color: this.color(),
              scale: this.scale(),
              draggable: !!this.draggable(),
              clickTolerance: this.clickTolerance(),
              rotation: this.rotation(),
              rotationAlignment: this.rotationAlignment(),
              pitchAlignment: this.pitchAlignment(),
              opacity: this.opacity(),
              opacityWhenCovered: this.opacityWhenCovered(),
              subpixelPositioning: this.subpixelPositioning(),
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

  ngOnDestroy(): void {
    this.removeMarker();
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
        changes.feature.currentValue.geometry.coordinates
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

  removeMarker() {
    this.mapService.removeMarker(this.markerInstance()!);
    this.markerInstance.set(null);
  }

  togglePopup() {
    this.markerInstance()!.togglePopup();
  }
}
