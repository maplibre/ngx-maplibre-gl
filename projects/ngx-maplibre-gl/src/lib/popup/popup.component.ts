import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  afterNextRender,
} from '@angular/core';
import { LngLatLike, Offset, Popup, PopupOptions } from 'maplibre-gl';
import { MapService } from '../map/map.service';
import { MarkerComponent } from '../marker/marker.component';

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
export class PopupComponent implements OnChanges, OnDestroy, OnInit {
  /** Init input */
  @Input() closeButton?: PopupOptions['closeButton'];
  /** Init input */
  @Input() closeOnClick?: PopupOptions['closeOnClick'];
  /** Init input */
  @Input() closeOnMove?: PopupOptions['closeOnMove'];
  /** Init input */
  @Input() focusAfterOpen?: PopupOptions['focusAfterOpen'];
  /** Init input */
  @Input() anchor?: PopupOptions['anchor'];
  /** Init input */
  @Input() className?: PopupOptions['className'];
  /** Init input */
  @Input() maxWidth?: PopupOptions['maxWidth'];

  /**
   * Dynamic input [ngx]
   * Mutually exclusive with `lngLat`
   */
  @Input() feature?: GeoJSON.Feature<GeoJSON.Point>;
  /** Dynamic input */
  @Input() lngLat?: LngLatLike;
  /**
   * Dynamic input [ngx]
   * The targeted marker
   */
  @Input() marker?: MarkerComponent;
  /** Dynamic input */
  @Input() offset?: Offset;

  @Output() popupClose = new EventEmitter<void>();
  @Output() popupOpen = new EventEmitter<void>();

  /** @hidden */
  @ViewChild('content', { static: true }) content: ElementRef;

  popupInstance?: maplibregl.Popup;

  constructor(private mapService: MapService) {
    afterNextRender(() => {
      this.popupInstance = this.createPopup();
      this.addPopup(this.popupInstance as Popup);
    });
  }

  ngOnInit() {
    if (
      (this.lngLat && this.marker) ||
      (this.feature && this.lngLat) ||
      (this.feature && this.marker)
    ) {
      throw new Error('marker, lngLat, feature input are mutually exclusive');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.feature && !changes.feature.isFirstChange()) {
      const newlngLat = changes.lngLat
        ? this.lngLat!
        : <[number, number]>this.feature!.geometry!.coordinates!;
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
      this.popupInstance!.setLngLat(this.lngLat!);
    }

    if (changes.marker && !changes.marker.isFirstChange()) {
      const previousMarker: MarkerComponent = changes.marker.previousValue;
      if (previousMarker.markerInstance) {
        this.mapService.removePopupFromMarker(previousMarker.markerInstance);
      }
      if (this.marker && this.marker.markerInstance && this.popupInstance) {
        this.mapService.addPopupToMarker(
          this.marker.markerInstance,
          this.popupInstance
        );
      }
    }
    if (
      changes.offset &&
      !changes.offset.isFirstChange() &&
      this.popupInstance
    ) {
      this.popupInstance.setOffset(this.offset);
    }
  }

  ngOnDestroy() {
    if (this.popupInstance) {
      if (this.lngLat || this.feature) {
        this.mapService.removePopupFromMap(this.popupInstance);
      } else if (this.marker && this.marker.markerInstance) {
        this.mapService.removePopupFromMarker(this.marker.markerInstance);
      }
    }
    this.popupInstance = undefined;
  }

  private createPopup() {
    return this.mapService.createPopup(
      {
        popupOptions: {
          closeButton: this.closeButton,
          closeOnClick: this.closeOnClick,
          closeOnMove: this.closeOnMove,
          focusAfterOpen: this.focusAfterOpen,
          anchor: this.anchor,
          offset: this.offset,
          className: this.className,
          maxWidth: this.maxWidth,
        },
        popupEvents: {
          popupOpen: this.popupOpen,
          popupClose: this.popupClose,
        },
      },
      this.content.nativeElement
    );
  }

  private addPopup(popup: Popup) {
    this.mapService.mapCreated$.subscribe(() => {
      if (this.lngLat || this.feature) {
        this.mapService.addPopupToMap(
          popup,
          this.lngLat
            ? this.lngLat
            : <[number, number]>this.feature!.geometry!.coordinates!
        );
      } else if (this.marker && this.marker.markerInstance) {
        this.mapService.addPopupToMarker(this.marker.markerInstance, popup);
      } else {
        throw new Error(
          'mgl-popup need either lngLat/marker/feature to be set'
        );
      }
    });
  }
}
