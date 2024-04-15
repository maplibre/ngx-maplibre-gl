// Can't use MapEvent interface because some event name are changed (eg zoomChange)
import { EventEmitter } from '@angular/core';
import {
  GeolocateControl,
  Map,
  MapLibreEvent,
  MapLibreZoomEvent,
  MapContextEvent,
  MapDataEvent,
  MapLayerMouseEvent,
  MapLayerTouchEvent,
  MapMouseEvent,
  MapSourceDataEvent,
  MapStyleDataEvent,
  MapTouchEvent,
  MapWheelEvent,
} from 'maplibre-gl';

export interface EventData {
  [key: string]: any;
}

export interface MapEvent {
  mapResize: EventEmitter<MapLibreEvent & EventData>;
  mapRemove: EventEmitter<MapLibreEvent & EventData>;
  mapMouseDown: EventEmitter<MapMouseEvent & EventData>;
  mapMouseUp: EventEmitter<MapMouseEvent & EventData>;
  mapMouseMove: EventEmitter<MapMouseEvent & EventData>;
  mapClick: EventEmitter<MapMouseEvent & EventData>;
  mapDblClick: EventEmitter<MapMouseEvent & EventData>;
  mapMouseOver: EventEmitter<MapMouseEvent & EventData>;
  mapMouseOut: EventEmitter<MapMouseEvent & EventData>;
  mapContextMenu: EventEmitter<MapMouseEvent & EventData>;
  mapTouchStart: EventEmitter<MapTouchEvent & EventData>;
  mapTouchEnd: EventEmitter<MapTouchEvent & EventData>;
  mapTouchMove: EventEmitter<MapTouchEvent & EventData>;
  mapTouchCancel: EventEmitter<MapTouchEvent & EventData>;
  mapWheel: EventEmitter<MapWheelEvent & EventData>;
  moveStart: EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >;
  move: EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >;
  moveEnd: EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >;
  mapDragStart: EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  mapDrag: EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  mapDragEnd: EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  zoomStart: EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >;
  zoomEvt: EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >;
  zoomEnd: EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >;
  rotateStart: EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  rotate: EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  rotateEnd: EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  pitchStart: EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  pitchEvt: EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  pitchEnd: EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  boxZoomStart: EventEmitter<MapLibreZoomEvent & EventData>;
  boxZoomEnd: EventEmitter<MapLibreZoomEvent & EventData>;
  boxZoomCancel: EventEmitter<MapLibreZoomEvent & EventData>;
  webGlContextLost: EventEmitter<MapContextEvent & EventData>;
  webGlContextRestored: EventEmitter<MapContextEvent & EventData>;
  mapLoad: EventEmitter<Map>; // Consider emitting MapLibreEvent for consistency (breaking change).
  render: EventEmitter<MapLibreEvent & EventData>;
  mapError: EventEmitter<ErrorEvent & EventData>;
  data: EventEmitter<MapDataEvent & EventData>;
  styleData: EventEmitter<MapStyleDataEvent & EventData>;
  sourceData: EventEmitter<MapSourceDataEvent & EventData>;
  dataLoading: EventEmitter<MapDataEvent & EventData>;
  styleDataLoading: EventEmitter<MapStyleDataEvent & EventData>;
  sourceDataLoading: EventEmitter<MapSourceDataEvent & EventData>;
  styleImageMissing: EventEmitter<{ id: string } & EventData>;
  idle: EventEmitter<MapLibreEvent & EventData>;
}

export interface LayerEvents {
  layerClick: EventEmitter<MapLayerMouseEvent & EventData>;
  layerDblClick: EventEmitter<MapLayerMouseEvent & EventData>;
  layerMouseDown: EventEmitter<MapLayerMouseEvent & EventData>;
  layerMouseUp: EventEmitter<MapLayerMouseEvent & EventData>;
  layerMouseEnter: EventEmitter<MapLayerMouseEvent & EventData>;
  layerMouseLeave: EventEmitter<MapLayerMouseEvent & EventData>;
  layerMouseMove: EventEmitter<MapLayerMouseEvent & EventData>;
  layerMouseOver: EventEmitter<MapLayerMouseEvent & EventData>;
  layerMouseOut: EventEmitter<MapLayerMouseEvent & EventData>;
  layerContextMenu: EventEmitter<MapLayerMouseEvent & EventData>;
  layerTouchStart: EventEmitter<MapLayerTouchEvent & EventData>;
  layerTouchEnd: EventEmitter<MapLayerTouchEvent & EventData>;
  layerTouchCancel: EventEmitter<MapLayerTouchEvent & EventData>;
}

/**
 * in typescript 4.1 DOM interface Position and Coordinates renamed to GeolocationPosition GeolocationCoordinates
 * to avoid deprecation angular version < 11.0.0 we declared own Coordinates, Position interface
 */

export interface NgxMapLibreGeolocationCoordinates {
  readonly accuracy: number;
  readonly altitude: number | null;
  readonly altitudeAccuracy: number | null;
  readonly heading: number | null;
  readonly latitude: number;
  readonly longitude: number;
  readonly speed: number | null;
}

export interface Position {
  coords: NgxMapLibreGeolocationCoordinates;
  target: GeolocateControl;
  timestamp: number;
  type: string;
}

export type MapImageData =
  | HTMLImageElement
  | ArrayBufferView
  | { width: number; height: number; data: Uint8Array | Uint8ClampedArray }
  | ImageData
  | ImageBitmap;

export interface MapImageOptions {
  pixelRatio: number;
  sdf: boolean;
}
