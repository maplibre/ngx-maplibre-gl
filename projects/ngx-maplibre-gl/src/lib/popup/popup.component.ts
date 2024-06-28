import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  afterNextRender,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import type { LngLatLike, Offset, Popup, PopupOptions } from 'maplibre-gl';
import { MapService } from '../map/map.service';
import { MarkerComponent } from '../marker/marker.component';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * `mgl-popup` - a popup component
 * @see [Popup](https://maplibre.org/maplibre-gl-js/docs/API/classes/Popup/)
 *
 * @category Components
 *
 * @example
 * ```html
 * ...
 * <mgl-map ...>
 *   <mgl-popup [lngLat]="[-96, 37.8]" [closeOnClick]="false">
 *     <h1>Hello world !</h1>
 *   </mgl-popup>
 *   ...
 *   <mgl-marker #myMarker ...> ... </mgl-marker>
 *   <mgl-popup [marker]="myMarker"> Hello from marker ! </mgl-popup>
 * </mgl-map>
 * ```
 */
@Component({
  selector: 'mgl-popup',
  template: '<div #content data-cy="mgl-popup"><ng-content></ng-content></div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class PopupComponent implements OnChanges, OnInit {
  /** Init injection */
  private readonly destroyRef = inject(DestroyRef);
  private readonly mapService = inject(MapService);

  /** Init input */
  readonly closeButton = input<PopupOptions['closeButton']>();
  readonly closeOnClick = input<PopupOptions['closeOnClick']>();
  readonly closeOnMove = input<PopupOptions['closeOnMove']>();
  readonly focusAfterOpen = input<PopupOptions['focusAfterOpen']>();
  readonly anchor = input<PopupOptions['anchor']>();
  readonly className = input<PopupOptions['className']>();
  readonly maxWidth = input<PopupOptions['maxWidth']>();

  /**
   * Dynamic input [ngx]
   * Mutually exclusive with `lngLat`
   */
  readonly feature = input<GeoJSON.Feature<GeoJSON.Point>>();

  /** Dynamic input */
  readonly lngLat = input<LngLatLike>();

  /**
   * Dynamic input [ngx]
   * The targeted marker
   */
  readonly marker = input<MarkerComponent>();

  /** Dynamic input */
  readonly offset = input<Offset>();

  readonly popupClose = output<void>();
  readonly popupOpen = output<void>();

  /** @hidden */
  readonly content = viewChild.required<ElementRef<HTMLDivElement>>('content');

  private popupInstance: maplibregl.Popup | null = null;

  constructor() {
    afterNextRender(() => {
      this.popupInstance = this.createPopup();
      this.addPopup(this.popupInstance as Popup)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe();
    });

    this.destroyRef.onDestroy(() => this.removePopupFromMarker());
  }

  ngOnInit() {
    if (
      (this.lngLat() && this.marker()) ||
      (this.feature() && this.lngLat()) ||
      (this.feature() && this.marker())
    ) {
      throw new Error('marker, lngLat, feature input are mutually exclusive');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.feature && !changes.feature.isFirstChange()) {
      const newlngLat = this.getLngLat(this.lngLat(), this.feature());
      this.mapService.removePopupFromMap(this.popupInstance!, true);
      const popupInstanceTmp = this.createPopup();
      this.mapService.addPopupToMap(
        popupInstanceTmp,
        newlngLat,
        this.popupInstance!.isOpen()
      );
      this.popupInstance = popupInstanceTmp;
    }

    if (changes.lngLat && !changes.lngLat.isFirstChange()) {
      this.popupInstance!.setLngLat(changes.lngLat.currentValue);
    }

    if (changes.marker && !changes.marker.isFirstChange()) {
      const previousMarker: MarkerComponent = changes.marker.previousValue;
      const previousMarkerInstance = previousMarker.markerInstance();

      if (previousMarkerInstance) {
        this.mapService.removePopupFromMarker(previousMarkerInstance);
      }

      const markerInstance = this.marker()?.markerInstance();
      if (markerInstance && this.popupInstance) {
        this.mapService.addPopupToMarker(markerInstance, this.popupInstance);
      }
    }
    if (
      changes.offset &&
      !changes.offset.isFirstChange() &&
      this.popupInstance
    ) {
      this.popupInstance.setOffset(changes.offset.currentValue);
    }
  }

  private createPopup() {
    return this.mapService.createPopup(
      {
        popupOptions: {
          closeButton: this.closeButton(),
          closeOnClick: this.closeOnClick(),
          closeOnMove: this.closeOnMove(),
          focusAfterOpen: this.focusAfterOpen(),
          anchor: this.anchor(),
          offset: this.offset(),
          className: this.className(),
          maxWidth: this.maxWidth(),
        },
        popupEvents: {
          popupOpen: this.popupOpen,
          popupClose: this.popupClose,
        },
      },
      this.content().nativeElement
    );
  }

  private addPopup(popup: Popup) {
    return this.mapService.mapCreated$.pipe(
      tap(() => {
        const lngLat = this.lngLat();
        const feature = this.feature();
        const markerInstance = this.marker()?.markerInstance();
        if (lngLat || feature) {
          this.mapService.addPopupToMap(popup, this.getLngLat(lngLat, feature));
        } else if (markerInstance) {
          this.mapService.addPopupToMarker(markerInstance, popup);
        } else {
          throw new Error(
            'mgl-popup need either lngLat/marker/feature to be set'
          );
        }
      })
    );
  }

  removePopupFromMarker() {
    if (this.popupInstance) {
      const markerInstance = this.marker()?.markerInstance();
      if (this.lngLat() || this.feature()) {
        this.mapService.removePopupFromMap(this.popupInstance, true);
      } else if (markerInstance) {
        this.mapService.removePopupFromMarker(markerInstance);
      }
    }
    this.popupInstance = null;
  }

  getLngLat(
    lngLat: LngLatLike | undefined,
    feature: GeoJSON.Feature<GeoJSON.Point> | undefined
  ) {
    if (lngLat) {
      return lngLat;
    } else if (feature) {
      return feature.geometry.coordinates as [number, number];
    }
    throw new Error('lngLat or feature value is required');
  }
}
