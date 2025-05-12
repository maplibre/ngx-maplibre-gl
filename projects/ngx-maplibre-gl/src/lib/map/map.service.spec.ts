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
  StyleSpecification, SourceSpecification, MapGeoJSONFeature,
} from 'maplibre-gl';
import { MapService, SetupLayer } from './map.service';
import { MapEvent, EventData, type LayerEvents } from './map.types';
import { MockNgZone } from './mock-ng-zone';
import { firstValueFrom, ReplaySubject } from "rxjs";
import { tap } from "rxjs/operators";

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

  describe('layer handling', () => {
    it('should unsubscribe from events on removeLayer via source', async () => {
      spyOn(mapService.mapInstance, 'queryRenderedFeatures').and.returnValue([{} as MapGeoJSONFeature]);

      const sourceData: SourceSpecification = {
        "type": "geojson",
        "data": {
          "type": "FeatureCollection",
          "features": []
        }
      }
      const layerEventThatShouldNotEmit = {
        ...createLayerEvents(),
        layerClick: { emit: jasmine.createSpy() } as any,
      };
      const layer: SetupLayer = {
        layerOptions: {
          type: 'fill',
          id: 'layerId',
          source: "sourceId",
          paint: {},
        },
        layerEvents: layerEventThatShouldNotEmit,
      };
      const layer2: SetupLayer = {
        layerOptions: {
          type: 'fill',
          id: 'layerId',
          source: "sourceId",
          paint: {},
        },
        layerEvents: createLayerEvents(),
      };
      const mapLoaded = new ReplaySubject(1);
      mapEvents.mapLoad.subscribe(() => {
        mapLoaded.next(true);
      });
      await firstValueFrom(
        mapLoaded.pipe(
          tap(() => {
            mapService.addSource("sourceId", sourceData);
            mapService.addLayer(layer, true);
            mapService.removeSource("sourceId");
            mapService.addSource("sourceId", sourceData);
            mapService.addLayer(layer2, true);
            click(mapService.mapInstance.getCanvas());
            expect(layer.layerEvents.layerClick.emit).not.toHaveBeenCalled();
      })));
    });
  });
});

function click(target: HTMLElement | Window | Element) {
  const options = {bubbles: true};
  target.dispatchEvent(new MouseEvent('mousedown', options));
  target.dispatchEvent(new MouseEvent('mouseup', options));
  target.dispatchEvent(new MouseEvent('click', options));
}

function createLayerEvents(): LayerEvents {
  const mockEmit = { emit: () => {return;}};
  return  {
    layerClick: mockEmit as any,
    layerDblClick: mockEmit as any,
    layerMouseOver: mockEmit as any,
    layerMouseOut: mockEmit as any,
    layerMouseDown: mockEmit as any,
    layerMouseUp: mockEmit as any,
    layerMouseEnter: mockEmit as any,
    layerMouseLeave: mockEmit as any,
    layerMouseMove: mockEmit as any,
    layerContextMenu: mockEmit as any,
    layerTouchStart: mockEmit as any,
    layerTouchEnd: mockEmit as any,
    layerTouchCancel: mockEmit as any,
  };
}
