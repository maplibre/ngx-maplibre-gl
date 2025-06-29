// Can't use MapEvent interface because some event name are changed (eg zoomChange)
import { OutputEmitterRef } from '@angular/core';
import type {
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

export type EventData = Record<string, unknown>;

export type MapEvent = {
  mapResize: OutputEmitterRef<MapLibreEvent & EventData>;
  mapRemove: OutputEmitterRef<MapLibreEvent & EventData>;
  mapMouseDown: OutputEmitterRef<MapMouseEvent & EventData>;
  mapMouseUp: OutputEmitterRef<MapMouseEvent & EventData>;
  mapMouseMove: OutputEmitterRef<MapMouseEvent & EventData>;
  mapClick: OutputEmitterRef<MapMouseEvent & EventData>;
  mapDblClick: OutputEmitterRef<MapMouseEvent & EventData>;
  mapMouseOver: OutputEmitterRef<MapMouseEvent & EventData>;
  mapMouseOut: OutputEmitterRef<MapMouseEvent & EventData>;
  mapContextMenu: OutputEmitterRef<MapMouseEvent & EventData>;
  mapTouchStart: OutputEmitterRef<MapTouchEvent & EventData>;
  mapTouchEnd: OutputEmitterRef<MapTouchEvent & EventData>;
  mapTouchMove: OutputEmitterRef<MapTouchEvent & EventData>;
  mapTouchCancel: OutputEmitterRef<MapTouchEvent & EventData>;
  mapWheel: OutputEmitterRef<MapWheelEvent & EventData>;
  moveStart: OutputEmitterRef<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >;
  move: OutputEmitterRef<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >;
  moveEnd: OutputEmitterRef<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >;
  mapDragStart: OutputEmitterRef<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  mapDrag: OutputEmitterRef<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  mapDragEnd: OutputEmitterRef<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  zoomStart: OutputEmitterRef<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >;
  zoomEvt: OutputEmitterRef<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >;
  zoomEnd: OutputEmitterRef<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >;
  rotateStart: OutputEmitterRef<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  rotate: OutputEmitterRef<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  rotateEnd: OutputEmitterRef<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  pitchStart: OutputEmitterRef<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  pitchEvt: OutputEmitterRef<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  pitchEnd: OutputEmitterRef<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  boxZoomStart: OutputEmitterRef<MapLibreZoomEvent & EventData>;
  boxZoomEnd: OutputEmitterRef<MapLibreZoomEvent & EventData>;
  boxZoomCancel: OutputEmitterRef<MapLibreZoomEvent & EventData>;
  webGlContextLost: OutputEmitterRef<MapContextEvent & EventData>;
  webGlContextRestored: OutputEmitterRef<MapContextEvent & EventData>;
  mapLoad: OutputEmitterRef<Map>; // Consider emitting MapLibreEvent for consistency (breaking change).
  render: OutputEmitterRef<MapLibreEvent & EventData>;
  mapError: OutputEmitterRef<ErrorEvent & EventData>;
  data: OutputEmitterRef<MapDataEvent & EventData>;
  styleData: OutputEmitterRef<MapStyleDataEvent & EventData>;
  sourceData: OutputEmitterRef<MapSourceDataEvent & EventData>;
  dataLoading: OutputEmitterRef<MapDataEvent & EventData>;
  styleDataLoading: OutputEmitterRef<MapStyleDataEvent & EventData>;
  sourceDataLoading: OutputEmitterRef<MapSourceDataEvent & EventData>;
  styleImageMissing: OutputEmitterRef<{ id: string } & EventData>;
  idle: OutputEmitterRef<MapLibreEvent & EventData>;
}

export type LayerEvents = {
  layerClick: OutputEmitterRef<MapLayerMouseEvent & EventData>;
  layerDblClick: OutputEmitterRef<MapLayerMouseEvent & EventData>;
  layerMouseDown: OutputEmitterRef<MapLayerMouseEvent & EventData>;
  layerMouseUp: OutputEmitterRef<MapLayerMouseEvent & EventData>;
  layerMouseEnter: OutputEmitterRef<MapLayerMouseEvent & EventData>;
  layerMouseLeave: OutputEmitterRef<MapLayerMouseEvent & EventData>;
  layerMouseMove: OutputEmitterRef<MapLayerMouseEvent & EventData>;
  layerMouseOver: OutputEmitterRef<MapLayerMouseEvent & EventData>;
  layerMouseOut: OutputEmitterRef<MapLayerMouseEvent & EventData>;
  layerContextMenu: OutputEmitterRef<MapLayerMouseEvent & EventData>;
  layerTouchStart: OutputEmitterRef<MapLayerTouchEvent & EventData>;
  layerTouchEnd: OutputEmitterRef<MapLayerTouchEvent & EventData>;
  layerTouchCancel: OutputEmitterRef<MapLayerTouchEvent & EventData>;
}

/**
 * in typescript 4.1 DOM interface Position and Coordinates renamed to GeolocationPosition GeolocationCoordinates
 * to avoid deprecation angular version < 11.0.0 we declared own Coordinates, Position interface
 */

export type NgxMapLibreGeolocationCoordinates = {
  readonly accuracy: number;
  readonly altitude: number | null;
  readonly altitudeAccuracy: number | null;
  readonly heading: number | null;
  readonly latitude: number;
  readonly longitude: number;
  readonly speed: number | null;
}

export type Position = {
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

export type MapImageOptions = {
  pixelRatio: number;
  sdf: boolean;
}
