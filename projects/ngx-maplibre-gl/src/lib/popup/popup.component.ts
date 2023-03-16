import {
  AfterViewInit,
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
} from '@angular/core';
import { LngLatLike, Offset, Popup, PopupOptions } from 'maplibre-gl';
import { MapService } from '../map/map.service';
import { MarkerComponent } from '../marker/marker.component';

@Component({
  selector: 'mgl-popup',
  template: '<div #content><ng-content></ng-content></div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent
  implements OnChanges, OnDestroy, AfterViewInit, OnInit {
  /* Init input */
  @Input() closeButton?: PopupOptions['closeButton'];
  @Input() closeOnClick?: PopupOptions['closeOnClick'];
  @Input() closeOnMove?: PopupOptions['closeOnMove'];
  @Input() focusAfterOpen?: PopupOptions['focusAfterOpen'];
  @Input() anchor?: PopupOptions['anchor'];
  @Input() className?: PopupOptions['className'];
  @Input() maxWidth?: PopupOptions['maxWidth'];

  /* Dynamic input */
  @Input() feature?: GeoJSON.Feature<GeoJSON.Point>;
  @Input() lngLat?: LngLatLike;
  @Input() marker?: MarkerComponent;
  @Input() offset?: Offset;

  @Output() popupClose = new EventEmitter<void>();
  @Output() popupOpen = new EventEmitter<void>();

  @ViewChild('content', { static: true }) content: ElementRef;

  popupInstance?: maplibregl.Popup;

  constructor(private mapService: MapService) {}

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
    if (
      changes.feature && !changes.feature.isFirstChange()
    ) {
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

    if (
      changes.lngLat && !changes.lngLat.isFirstChange()
    ) {
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

  ngAfterViewInit() {
    this.popupInstance = this.createPopup();
    this.addPopup(this.popupInstance as Popup);
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
