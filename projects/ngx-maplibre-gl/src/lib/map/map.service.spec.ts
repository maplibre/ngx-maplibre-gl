import { OutputEmitterRef, NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  Map,
  MapLibreEvent,
  MapLibreZoomEvent,
  MapContextEvent,
  MapDataEvent,
  MapMouseEvent,
  MapSourceDataEvent,
  MapStyleDataEvent,
  MapTouchEvent,
  MapWheelEvent,
  StyleSpecification,
} from 'maplibre-gl';
import { MapService } from './map.service';
import { MapEvent, EventData } from './map.types';
import { MockNgZone } from './mock-ng-zone';
import type { FeatureCollection } from 'geojson';

const countries = require('./countries.geo.json'); // eslint-disable-line @typescript-eslint/no-require-imports

const geoJSONStyle: StyleSpecification = {
  sources: {
    world: {
      type: 'geojson',
      data: countries,
    },
  },
  version: 8,
  layers: [
    {
      id: 'countries',
      type: 'fill',
      source: 'world',
      layout: {},
      paint: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'fill-color': '#6F788A',
      },
    },
  ],
};

describe('MapService', () => {
  let container: HTMLElement;
  let mapEvents: MapEvent;
  let mapService: MapService;
  let zone: MockNgZone;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MapService,
        {
          provide: NgZone,
          useFactory: () => {
            zone = new MockNgZone();
            return zone;
          },
        },
      ],
    });
    container = document.createElement('div');
    mapService = TestBed.inject(MapService);

    TestBed.runInInjectionContext(() => {
      mapEvents = {
        mapResize: new OutputEmitterRef<MapLibreEvent & EventData>(),
        mapRemove: new OutputEmitterRef<MapLibreEvent & EventData>(),
        mapMouseDown: new OutputEmitterRef<MapMouseEvent & EventData>(),
        mapMouseUp: new OutputEmitterRef<MapMouseEvent & EventData>(),
        mapMouseMove: new OutputEmitterRef<MapMouseEvent & EventData>(),
        mapClick: new OutputEmitterRef<MapMouseEvent & EventData>(),
        mapDblClick: new OutputEmitterRef<MapMouseEvent & EventData>(),
        mapMouseOver: new OutputEmitterRef<MapMouseEvent & EventData>(),
        mapMouseOut: new OutputEmitterRef<MapMouseEvent & EventData>(),
        mapContextMenu: new OutputEmitterRef<MapMouseEvent & EventData>(),
        mapTouchStart: new OutputEmitterRef<MapTouchEvent & EventData>(),
        mapTouchEnd: new OutputEmitterRef<MapTouchEvent & EventData>(),
        mapTouchMove: new OutputEmitterRef<MapTouchEvent & EventData>(),
        mapTouchCancel: new OutputEmitterRef<MapTouchEvent & EventData>(),
        mapWheel: new OutputEmitterRef<MapWheelEvent & EventData>(),
        moveStart: new OutputEmitterRef<
          MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> &
            EventData
        >(),
        move: new OutputEmitterRef<
          MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> &
            EventData
        >(),
        moveEnd: new OutputEmitterRef<
          MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> &
            EventData
        >(),
        mapDragStart: new OutputEmitterRef<
          MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
        >(),
        mapDrag: new OutputEmitterRef<
          MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
        >(),
        mapDragEnd: new OutputEmitterRef<
          MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
        >(),
        zoomStart: new OutputEmitterRef<
          MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> &
            EventData
        >(),
        zoomEvt: new OutputEmitterRef<
          MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> &
            EventData
        >(),
        zoomEnd: new OutputEmitterRef<
          MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> &
            EventData
        >(),
        rotateStart: new OutputEmitterRef<
          MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
        >(),
        rotate: new OutputEmitterRef<
          MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
        >(),
        rotateEnd: new OutputEmitterRef<
          MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
        >(),
        pitchStart: new OutputEmitterRef<
          MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
        >(),
        pitchEvt: new OutputEmitterRef<
          MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
        >(),
        pitchEnd: new OutputEmitterRef<
          MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
        >(),
        boxZoomStart: new OutputEmitterRef<MapLibreZoomEvent & EventData>(),
        boxZoomEnd: new OutputEmitterRef<MapLibreZoomEvent & EventData>(),
        boxZoomCancel: new OutputEmitterRef<MapLibreZoomEvent & EventData>(),
        webGlContextLost: new OutputEmitterRef<MapContextEvent & EventData>(),
        webGlContextRestored: new OutputEmitterRef<
          MapContextEvent & EventData
        >(),
        mapLoad: new OutputEmitterRef<Map>(),
        render: new OutputEmitterRef<MapLibreEvent & EventData>(),
        mapError: new OutputEmitterRef<ErrorEvent & EventData>(),
        data: new OutputEmitterRef<MapDataEvent & EventData>(),
        styleData: new OutputEmitterRef<MapStyleDataEvent & EventData>(),
        sourceData: new OutputEmitterRef<MapSourceDataEvent & EventData>(),
        dataLoading: new OutputEmitterRef<MapDataEvent & EventData>(),
        styleDataLoading: new OutputEmitterRef<MapStyleDataEvent & EventData>(),
        sourceDataLoading: new OutputEmitterRef<
          MapSourceDataEvent & EventData
        >(),
        styleImageMissing: new OutputEmitterRef<{ id: string } & EventData>(),
        idle: new OutputEmitterRef<MapLibreEvent & EventData>(),
      };
    });
  });

  beforeEach(() => {
    mapService.setup({
      mapOptions: {
        container,
        style: geoJSONStyle,
        zoom: [0],
      },
      mapEvents,
    });
    zone.simulateZoneExit();
  });

  it('should create a map', () => {
    expect(mapService.mapInstance).toBeTruthy();
  });

  it('should fire mapLoad event', (done: DoneFn) => {
    mapEvents.mapLoad.subscribe(() => {
      expect(true).toBe(true);
      done();
    });
  });

  it('should update minZoom', (done: DoneFn) => {
    mapEvents.mapLoad.subscribe(() => {
      mapService.updateMinZoom(6);
      expect(mapService.mapInstance.getMinZoom()).toEqual(6);
      done();
    });
  });

  it('should update minPitch', (done: DoneFn) => {
    mapEvents.mapLoad.subscribe(() => {
      mapService.updateMinPitch(15);
      expect(mapService.mapInstance.getMinPitch()).toEqual(15);
      done();
    });
  });

  it('should update maxPitch', (done: DoneFn) => {
    mapEvents.mapLoad.subscribe(() => {
      mapService.updateMaxPitch(25);
      expect(mapService.mapInstance.getMaxPitch()).toEqual(25);
      done();
    });
  });

  it('should unsubscribe from events on destroy', async () => {
    const container = document.createElement('div');
    const popupEvents = {
      popupOpen: { emit: jasmine.createSpy() },
      popupClose: { emit: jasmine.createSpy() },
    } as any;
    const popup = mapService.createPopup({ 
      popupOptions: {}, 
      popupEvents
    }, container);
    mapService.addPopupToMap(popup, [0, 0]);
    mapService.removePopupFromMap(popup);
    popup.fire('close');
    expect(popupEvents.popupClose.emit).not.toHaveBeenCalled();
  });

  const geoJsonData = {
    type: 'FeatureCollection',
    features: [
      { type: 'Feature', id: 1, geometry: { type: 'Point', coordinates: [0, 0] }, properties: {} },
      { type: 'Feature', id: 2, geometry: { type: 'Point', coordinates: [1, 1] }, properties: {} }
    ]
  } as FeatureCollection;

  function makeSourceId() {
    const id = `world-${Math.random().toString(36).slice(2, 9)}`;
    return {
      sourceId: id,
      feature1: {source: id, id: 1},
      feature2: {source: id, id: 2},
    }
  }

  it('should set feature state for a single feature', (done: DoneFn) => {
    mapEvents.mapLoad.subscribe(() => {
      const state = { selected: true };
      
      const {sourceId, feature1, feature2} = makeSourceId();
      mapService.addSource(sourceId, { type: 'geojson', data: geoJsonData });
      
      mapService.setFeatureState(feature1, state);
      
      expect(mapService.getFeatureState(feature1)).toEqual(state);
      expect(mapService.getFeatureState(feature2)).toEqual({}); // ensure other feature remains unchanged
      done();
    });
  });

  it('should remove specific feature state key', (done: DoneFn) => {
    mapEvents.mapLoad.subscribe(() => {
      const {sourceId, feature1, feature2} = makeSourceId();

      mapService.addSource(sourceId, { type: 'geojson', data: geoJsonData });
      
      mapService.setFeatureState(feature1, { selected: true, highlighted: true });
      mapService.setFeatureState(feature2, { selected: false });
      
      mapService.removeFeatureState(feature1, 'selected');
      
      expect(mapService.getFeatureState(feature1)).toEqual({ highlighted: true });
      expect(mapService.getFeatureState(feature2)).toEqual({ selected: false }); // ensure other feature remains unchanged
      done();
    });
  });

  it('should remove entire feature state', (done: DoneFn) => {
    mapEvents.mapLoad.subscribe(() => {
      const {sourceId, feature1, feature2} = makeSourceId();

      mapService.addSource(sourceId, { type: 'geojson', data: geoJsonData });
      
      mapService.setFeatureState(feature1, { selected: true, highlighted: true });
      mapService.setFeatureState(feature2, { selected: false, hovered: true });
      
      mapService.removeFeatureState(feature1);
      
      expect(mapService.getFeatureState(feature1)).toEqual({});
      expect(mapService.getFeatureState(feature2)).toEqual({ selected: false, hovered: true }); // ensure other feature remains unchanged
      done();
    });
  });
});
