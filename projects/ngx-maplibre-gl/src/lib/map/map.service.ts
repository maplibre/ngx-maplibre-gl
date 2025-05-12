import {
  Injectable,
  NgZone,
  OutputEmitterRef,
  inject,
  signal,
} from '@angular/core';
import {
  type CameraOptions,
  type FlyToOptions,
  type LngLatLike,
  type MapOptions,
  type MarkerOptions,
  type PopupOptions,
  Map as MaplibreMap,
  Marker,
  Popup,
  type Evented,
  type AnimationOptions,
  type LayerSpecification,
  type StyleSpecification,
  type LngLatBoundsLike,
  type PointLike,
  type IControl,
  type SourceSpecification,
  type FitBoundsOptions,
  type Source,
  type BackgroundLayerSpecification,
  type FillLayerSpecification,
  type FillExtrusionLayerSpecification,
  type LineLayerSpecification,
  type SymbolLayerSpecification,
  type RasterLayerSpecification,
  type CircleLayerSpecification,
  type FilterSpecification,
  type TerrainSpecification,
  type QueryRenderedFeaturesOptions,
  type ControlPosition,
  type Subscription,
  type MapLayerEventType,
  type ProjectionSpecification
} from 'maplibre-gl';
import { AsyncSubject } from 'rxjs';
import type {
  LayerEvents,
  MapEvent,
  MapImageData,
  MapImageOptions,
} from './map.types';
import { keepAvailableObjectValues } from '../shared/utils/functions/object.fn';

export interface SetupMap {
  mapOptions: Omit<MapOptions, 'bearing' | 'pitch' | 'zoom'> & {
    bearing?: [number];
    pitch?: [number];
    zoom?: [number];
    terrain?: TerrainSpecification;
    projection?: ProjectionSpecification;
  };
  mapEvents: MapEvent;
}

export interface SetupLayer {
  layerOptions: LayerSpecification;
  layerEvents: LayerEvents;
}

export interface SetupPopup {
  popupOptions: PopupOptions;
  popupEvents: {
    popupOpen: OutputEmitterRef<void>;
    popupClose: OutputEmitterRef<void>;
  };
}

export interface SetupMarkerOptions extends MarkerOptions {
  element: HTMLElement;
  feature?: GeoJSON.Feature<GeoJSON.Point>;
  lngLat?: LngLatLike;
}

export interface SetupMarker {
  markersOptions: SetupMarkerOptions;
  markersEvents: {
    markerDragStart: OutputEmitterRef<Marker>;
    markerDrag: OutputEmitterRef<Marker>;
    markerDragEnd: OutputEmitterRef<Marker>;
  };
}

export type MovingOptions =
  | FlyToOptions
  | (AnimationOptions & CameraOptions)
  | CameraOptions;

@Injectable()
export class MapService {
  private readonly zone = inject(NgZone);

  mapInstance: MaplibreMap;
  mapEvents: MapEvent;
  private readonly subscriptionsPerInstance = new Map<Evented, Subscription[]>();

  private readonly mapCreated = new AsyncSubject<void>();
  private readonly mapLoaded = new AsyncSubject<void>();
  private readonly markersToRemove = signal<Marker[]>([]);
  private readonly popupsToRemove = signal<Popup[]>([]);
  private readonly imageIdsToRemove = signal<string[]>([]);

  readonly mapCreated$ = this.mapCreated.asObservable();
  readonly mapLoaded$ = this.mapLoaded.asObservable();

  setup(options: SetupMap) {
    // Workaround rollup issue
    this.createMap(options.mapOptions as MapOptions);
    this.hookEvents(options.mapEvents);
    this.mapEvents = options.mapEvents;
    this.mapCreated.next(undefined);
    this.mapCreated.complete();

    if (options.mapOptions.terrain || options.mapOptions.projection) {
      this.mapInstance.on('load', () => {
        if (options.mapOptions.projection) {
          this.setProjection(options.mapOptions.projection!);
        }
        if (options.mapOptions.terrain) {
          this.setTerrain(options.mapOptions.terrain!);
        }
      });
    }
  }

  destroyMap() {
    if (this.mapInstance) {
      this.mapInstance.remove();
    }
  }

  updateMinZoom(minZoom: number) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.setMinZoom(minZoom);
    });
  }

  updateMaxZoom(maxZoom: number) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.setMaxZoom(maxZoom);
    });
  }

  updateMinPitch(minPitch: number) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.setMinPitch(minPitch);
    });
  }

  updateMaxPitch(maxPitch: number) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.setMaxPitch(maxPitch);
    });
  }

  updateRenderWorldCopies(status: boolean) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.setRenderWorldCopies(status);
    });
  }

  updateScrollZoom(status: boolean) {
    return this.zone.runOutsideAngular(() => {
      status
        ? this.mapInstance.scrollZoom.enable()
        : this.mapInstance.scrollZoom.disable();
    });
  }

  updateDragRotate(status: boolean) {
    return this.zone.runOutsideAngular(() => {
      status
        ? this.mapInstance.dragRotate.enable()
        : this.mapInstance.dragRotate.disable();
    });
  }

  updateTouchPitch(status: boolean) {
    return this.zone.runOutsideAngular(() => {
      status
        ? this.mapInstance.touchPitch.enable()
        : this.mapInstance.touchPitch.disable();
    });
  }

  updateTouchZoomRotate(status: boolean) {
    return this.zone.runOutsideAngular(() => {
      status
        ? this.mapInstance.touchZoomRotate.enable()
        : this.mapInstance.touchZoomRotate.disable();
    });
  }

  updateDoubleClickZoom(status: boolean) {
    return this.zone.runOutsideAngular(() => {
      status
        ? this.mapInstance.doubleClickZoom.enable()
        : this.mapInstance.doubleClickZoom.disable();
    });
  }

  updateKeyboard(status: boolean) {
    return this.zone.runOutsideAngular(() => {
      status
        ? this.mapInstance.keyboard.enable()
        : this.mapInstance.keyboard.disable();
    });
  }

  updateDragPan(status: boolean) {
    return this.zone.runOutsideAngular(() => {
      status
        ? this.mapInstance.dragPan.enable()
        : this.mapInstance.dragPan.disable();
    });
  }

  updateBoxZoom(status: boolean) {
    return this.zone.runOutsideAngular(() => {
      status
        ? this.mapInstance.boxZoom.enable()
        : this.mapInstance.boxZoom.disable();
    });
  }

  updateStyle(style: StyleSpecification) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.setStyle(style);
    });
  }

  updateMaxBounds(maxBounds: LngLatBoundsLike) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.setMaxBounds(maxBounds);
    });
  }

  setProjection(options: ProjectionSpecification) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.setProjection(options);
    });
  }

  setTerrain(options: TerrainSpecification) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.setTerrain(options);
    });
  }

  getTerrain(): TerrainSpecification | null {
    return this.zone.runOutsideAngular(() => {
      return this.mapInstance.getTerrain();
    });
  }

  setCenterElevation(elevation: number) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.setCenterElevation(elevation);
    });
  }

  changeCanvasCursor(cursor: string) {
    const canvas = this.mapInstance.getCanvasContainer();
    canvas.style.cursor = cursor;
  }

  queryRenderedFeatures(
    pointOrBox?:
      | PointLike
      | [PointLike, PointLike]
      | QueryRenderedFeaturesOptions,
    parameters?: QueryRenderedFeaturesOptions
  ): GeoJSON.Feature<GeoJSON.GeometryObject>[] {
    return this.mapInstance.queryRenderedFeatures(pointOrBox, parameters);
  }

  panTo(center: LngLatLike, options?: AnimationOptions) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.panTo(center, options);
    });
  }

  move(
    movingMethod: 'jumpTo' | 'easeTo' | 'flyTo',
    movingOptions?: MovingOptions,
    zoom?: number,
    center?: LngLatLike,
    bearing?: number,
    pitch?: number,
    roll?: number
  ) {
    return this.zone.runOutsideAngular(() => {
      (this.mapInstance[movingMethod] as any)({
        ...movingOptions,
        zoom: zoom != null ? zoom : this.mapInstance.getZoom(),
        center: center != null ? center : this.mapInstance.getCenter(),
        bearing: bearing != null ? bearing : this.mapInstance.getBearing(),
        pitch: pitch != null ? pitch : this.mapInstance.getPitch(),
        roll: roll != null ? roll : this.mapInstance.getRoll(),
      });
    });
  }

  addLayer(layer: SetupLayer, bindEvents: boolean, before?: string) {
    this.zone.runOutsideAngular(() => {
      Object.keys(layer.layerOptions).forEach((key: string) => {
        const tkey = <keyof LayerSpecification>key;
        if (layer.layerOptions[tkey] === undefined) {
          delete layer.layerOptions[tkey];
        }
      });
      this.mapInstance.addLayer(
        layer.layerOptions as LayerSpecification,
        before
      );
      if (!bindEvents) {
        return;
      }
      const subscriptions: Subscription[] = [];
      subscriptions.push(this.createSubscriptionForLayer(layer.layerOptions.id, 'click', layer.layerEvents.layerClick));
      subscriptions.push(this.createSubscriptionForLayer(layer.layerOptions.id, 'dblclick', layer.layerEvents.layerDblClick));
      subscriptions.push(this.createSubscriptionForLayer(layer.layerOptions.id, 'mousedown', layer.layerEvents.layerMouseDown));
      subscriptions.push(this.createSubscriptionForLayer(layer.layerOptions.id, 'mouseup', layer.layerEvents.layerMouseUp));
      subscriptions.push(this.createSubscriptionForLayer(layer.layerOptions.id, 'mouseenter', layer.layerEvents.layerMouseEnter));
      subscriptions.push(this.createSubscriptionForLayer(layer.layerOptions.id, 'mouseleave', layer.layerEvents.layerMouseLeave));
      subscriptions.push(this.createSubscriptionForLayer(layer.layerOptions.id, 'mousemove', layer.layerEvents.layerMouseMove));
      subscriptions.push(this.createSubscriptionForLayer(layer.layerOptions.id, 'mouseover', layer.layerEvents.layerMouseOver));
      subscriptions.push(this.createSubscriptionForLayer(layer.layerOptions.id, 'mouseout', layer.layerEvents.layerMouseOut));
      subscriptions.push(this.createSubscriptionForLayer(layer.layerOptions.id, 'contextmenu', layer.layerEvents.layerContextMenu));
      subscriptions.push(this.createSubscriptionForLayer(layer.layerOptions.id, 'touchstart', layer.layerEvents.layerTouchStart));
      subscriptions.push(this.createSubscriptionForLayer(layer.layerOptions.id, 'touchend', layer.layerEvents.layerTouchEnd));
      subscriptions.push(this.createSubscriptionForLayer(layer.layerOptions.id, 'touchcancel', layer.layerEvents.layerTouchCancel));
      const layerInstance = this.mapInstance.getLayer(layer.layerOptions.id);
      if (layerInstance) {
        this.subscriptionsPerInstance.set(layerInstance, subscriptions);
      }
    });
  }

  removeLayer(layerId: string) {
    this.zone.runOutsideAngular(() => {
      const layerInstance = this.mapInstance.getLayer(layerId);
      if (layerInstance != null) {
        const subscriptions = this.subscriptionsPerInstance.get(layerInstance) || [];
        for (const subscription of subscriptions) {
          subscription.unsubscribe();
        }
        this.subscriptionsPerInstance.delete(layerInstance);
        this.mapInstance.removeLayer(layerId);
      }
    });
  }

  addMarker(marker: SetupMarker) {
    const options: MarkerOptions = {
      offset: marker.markersOptions.offset,
      anchor: marker.markersOptions.anchor,
      color: marker.markersOptions.color,
      scale: marker.markersOptions.scale,
      draggable: !!marker.markersOptions.draggable,
      rotationAlignment: marker.markersOptions.rotationAlignment,
      rotation: marker.markersOptions.rotation,
      pitchAlignment: marker.markersOptions.pitchAlignment,
      clickTolerance: marker.markersOptions.clickTolerance,
      element:
        marker.markersOptions.element.childNodes.length > 0
          ? marker.markersOptions.element
          : undefined,
      opacity: marker.markersOptions.opacity,
      opacityWhenCovered: marker.markersOptions.opacityWhenCovered,
      subpixelPositioning: marker.markersOptions.subpixelPositioning,
    };

    const markerInstance = new Marker(options);
    markerInstance.on('dragstart', (event: { target: Marker }) => {
      if (event) {
        const { target } = event;
        this.zone.run(() => {
          marker.markersEvents.markerDragStart.emit(target);
        });
      }
    });

    markerInstance.on('drag', (event: { target: Marker }) => {
      if (event) {
        const { target } = event;
        this.zone.run(() => marker.markersEvents.markerDrag.emit(target));
      }
    });
    markerInstance.on('dragend', (event: { target: Marker }) => {
      if (event) {
        const { target } = event;
        this.zone.run(() => marker.markersEvents.markerDragEnd.emit(target));
      }
    });
    const lngLat: LngLatLike = marker.markersOptions.feature
      ? <[number, number]>marker.markersOptions.feature.geometry!.coordinates
      : marker.markersOptions.lngLat!;
    markerInstance.setLngLat(lngLat);
    return this.zone.runOutsideAngular(() => {
      markerInstance.addTo(this.mapInstance);
      return markerInstance;
    });
  }

  removeMarker(marker: Marker) {
    this.markersToRemove.update((markers) => [...markers, marker]);
  }

  createPopup(popup: SetupPopup, element: Node) {
    return this.zone.runOutsideAngular(() => {
      const popupOptions = keepAvailableObjectValues(popup.popupOptions);
      const popupInstance = new Popup(popupOptions);
      popupInstance.setDOMContent(element);
      const subscriptions: Subscription[] = [];
      subscriptions.push(this.createSubscriptionForPopup(popupInstance, 'open', popup.popupEvents.popupOpen));
      subscriptions.push(this.createSubscriptionForPopup(popupInstance, 'close', popup.popupEvents.popupClose));
      this.subscriptionsPerInstance.set(popupInstance, subscriptions);
      return popupInstance;
    });
  }

  addPopupToMap(popup: Popup, lngLat: LngLatLike) {
    return this.zone.runOutsideAngular(() => {
      popup.setLngLat(lngLat);
      popup.addTo(this.mapInstance);
    });
  }

  addPopupToMarker(marker: Marker, popup: Popup) {
    return this.zone.runOutsideAngular(() => {
      marker.setPopup(popup);
    });
  }

  removePopupFromMap(popup: Popup) {
    if (this.subscriptionsPerInstance.has(popup)) {
      const subscriptions = this.subscriptionsPerInstance.get(popup) || [];
      for (const subscription of subscriptions) {
        subscription.unsubscribe();
      }
      this.subscriptionsPerInstance.delete(popup);
    }
    this.popupsToRemove.update((popups) => [...popups, popup]);
  }

  removePopupFromMarker(marker: Marker) {
    return this.zone.runOutsideAngular(() => {
      const popup = marker.getPopup();
      if (this.subscriptionsPerInstance.has(popup)) {
        const subscriptions = this.subscriptionsPerInstance.get(popup) || [];
        for (const subscription of subscriptions) {
          subscription.unsubscribe();
        }
        this.subscriptionsPerInstance.delete(popup);
      }
      marker.setPopup(undefined);
    });
  }

  addControl(control: IControl, position?: ControlPosition) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.addControl(control, position);
    });
  }

  removeControl(control: IControl) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.removeControl(control);
    });
  }

  async loadAndAddImage(
    imageId: string,
    url: string,
    options?: MapImageOptions
  ) {
    return this.zone.runOutsideAngular(async () => {
      const image = await this.mapInstance.loadImage(url);
      this.addImage(imageId, image.data, options);
    });
  }

  addImage(imageId: string, data: MapImageData, options?: MapImageOptions) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.addImage(imageId, data as any, options);
    });
  }

  removeImage(imageId: string) {
    this.imageIdsToRemove.update((imagesIds) => [...imagesIds, imageId]);
  }

  addSource(sourceId: string, source: SourceSpecification) {
    return this.zone.runOutsideAngular(() => {
      Object.keys(source).forEach(
        (key) =>
          (source as any)[key] === undefined && delete (source as any)[key]
      );
      this.mapInstance.addSource(sourceId, source);
    });
  }

  getSource<T extends Source>(sourceId: string): T {
    return <T>this.mapInstance.getSource(sourceId);
  }

  removeSource(sourceId: string) {
    this.zone.runOutsideAngular(() => {
      this.findLayersBySourceId(sourceId).forEach((layer) =>
        this.removeLayer(layer.id)
      );
      this.mapInstance.removeSource(sourceId);
    });
  }

  setAllLayerPaintProperty(
    layerId: string,
    paint:
      | BackgroundLayerSpecification['paint']
      | FillLayerSpecification['paint']
      | FillExtrusionLayerSpecification['paint']
      | LineLayerSpecification['paint']
      | SymbolLayerSpecification['paint']
      | RasterLayerSpecification['paint']
      | CircleLayerSpecification['paint']
  ) {
    return this.zone.runOutsideAngular(() => {
      Object.keys(paint as any).forEach((key) => {
        // TODO Check for perf, setPaintProperty only on changed paint props maybe
        this.mapInstance.setPaintProperty(layerId, key, (paint as any)[key]);
      });
    });
  }

  setAllLayerLayoutProperty(
    layerId: string,
    layout:
      | BackgroundLayerSpecification['layout']
      | FillLayerSpecification['layout']
      | FillExtrusionLayerSpecification['layout']
      | LineLayerSpecification['layout']
      | SymbolLayerSpecification['layout']
      | RasterLayerSpecification['layout']
      | CircleLayerSpecification['layout']
  ) {
    return this.zone.runOutsideAngular(() => {
      Object.keys(layout as any).forEach((key) => {
        // TODO Check for perf, setPaintProperty only on changed paint props maybe
        this.mapInstance.setLayoutProperty(layerId, key, (layout as any)[key]);
      });
    });
  }

  setLayerFilter(
    layerId: string,
    filter: FilterSpecification | null | undefined
  ) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.setFilter(layerId, filter);
    });
  }

  setLayerBefore(layerId: string, beforeId: string) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.moveLayer(layerId, beforeId);
    });
  }

  setLayerZoomRange(layerId: string, minZoom?: number, maxZoom?: number) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.setLayerZoomRange(
        layerId,
        minZoom ? minZoom : 0,
        maxZoom ? maxZoom : 20
      );
    });
  }

  fitBounds(bounds: LngLatBoundsLike, options?: FitBoundsOptions) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.fitBounds(bounds, options);
    });
  }

  fitScreenCoordinates(
    points: [PointLike, PointLike],
    bearing: number,
    options?: AnimationOptions & CameraOptions
  ) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.fitScreenCoordinates(
        points[0],
        points[1],
        bearing,
        options
      );
    });
  }

  clearMapElements() {
    this.zone.runOutsideAngular(() => {
      this.removeMarkers();
      this.removePopups();
      this.removeImages();
    });
  }

  private createMap(options: MapOptions) {
    NgZone.assertNotInAngularZone();

    const mapOptions = keepAvailableObjectValues<MapOptions>(options);

    this.mapInstance = new MaplibreMap(mapOptions);

    const isIEorEdge =
      window && /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
    if (isIEorEdge) {
      this.mapInstance.setStyle(options.style!);
    }
  }

  private removeMarkers() {
    for (const marker of this.markersToRemove()) {
      marker.remove();
    }
    this.markersToRemove.set([]);
  }

  private removePopups() {
    for (const popup of this.popupsToRemove()) {
      popup.remove();
    }
    this.popupsToRemove.set([]);
  }

  private removeImages() {
    for (const imageId of this.imageIdsToRemove()) {
      this.mapInstance.removeImage(imageId);
    }
    this.imageIdsToRemove.set([]);
  }

  private findLayersBySourceId(sourceId: string): LayerSpecification[] {
    const layers = this.mapInstance.getStyle().layers;
    if (layers == null) {
      return [];
    }

    return layers.filter((l) =>
      'source' in l ? l.source === sourceId : false
    );
  }

  private hookEvents(events: MapEvent) {
    this.mapInstance.on('load', (evt) => {
      this.mapLoaded.next(undefined);
      this.mapLoaded.complete();
      this.zone.run(() => {
        events.mapLoad.emit(evt.target);
      });
    });
    this.mapInstance.on('resize', (evt) =>
      this.zone.run(() => {
        events.mapResize.emit(evt);
      })
    );
    this.mapInstance.on('remove', (evt) =>
      this.zone.run(() => {
        events.mapRemove.emit(evt);
      })
    );
    this.mapInstance.on('mousedown', (evt) =>
      this.zone.run(() => {
        events.mapMouseDown.emit(evt);
      })
    );
    this.mapInstance.on('mouseup', (evt) =>
      this.zone.run(() => {
        events.mapMouseUp.emit(evt);
      })
    );
    this.mapInstance.on('mousemove', (evt) =>
      this.zone.run(() => {
        events.mapMouseMove.emit(evt);
      })
    );
    this.mapInstance.on('click', (evt) =>
      this.zone.run(() => {
        events.mapClick.emit(evt);
      })
    );
    this.mapInstance.on('dblclick', (evt) =>
      this.zone.run(() => {
        events.mapDblClick.emit(evt);
      })
    );
    this.mapInstance.on('mouseover', (evt) =>
      this.zone.run(() => {
        events.mapMouseOver.emit(evt);
      })
    );
    this.mapInstance.on('mouseout', (evt) =>
      this.zone.run(() => {
        events.mapMouseOut.emit(evt);
      })
    );
    this.mapInstance.on('contextmenu', (evt) =>
      this.zone.run(() => {
        events.mapContextMenu.emit(evt);
      })
    );
    this.mapInstance.on('touchstart', (evt) =>
      this.zone.run(() => {
        events.mapTouchStart.emit(evt);
      })
    );
    this.mapInstance.on('touchend', (evt) =>
      this.zone.run(() => {
        events.mapTouchEnd.emit(evt);
      })
    );
    this.mapInstance.on('touchmove', (evt) =>
      this.zone.run(() => {
        events.mapTouchMove.emit(evt);
      })
    );
    this.mapInstance.on('touchcancel', (evt) =>
      this.zone.run(() => {
        events.mapTouchCancel.emit(evt);
      })
    );
    this.mapInstance.on('wheel', (evt) =>
      this.zone.run(() => {
        events.mapWheel.emit(evt);
      })
    );
    this.mapInstance.on('movestart', (evt) =>
      this.zone.run(() => events.moveStart.emit(evt))
    );
    this.mapInstance.on('move', (evt) =>
      this.zone.run(() => events.move.emit(evt))
    );
    this.mapInstance.on('moveend', (evt) =>
      this.zone.run(() => events.moveEnd.emit(evt))
    );
    this.mapInstance.on('dragstart', (evt) =>
      this.zone.run(() => {
        events.mapDragStart.emit(evt);
      })
    );
    this.mapInstance.on('drag', (evt) =>
      this.zone.run(() => {
        events.mapDrag.emit(evt);
      })
    );
    this.mapInstance.on('dragend', (evt) =>
      this.zone.run(() => {
        events.mapDragEnd.emit(evt);
      })
    );
    this.mapInstance.on('zoomstart', (evt) =>
      this.zone.run(() => events.zoomStart.emit(evt))
    );
    this.mapInstance.on('zoom', (evt) =>
      this.zone.run(() => events.zoomEvt.emit(evt))
    );
    this.mapInstance.on('zoomend', (evt) =>
      this.zone.run(() => events.zoomEnd.emit(evt))
    );
    this.mapInstance.on('rotatestart', (evt) =>
      this.zone.run(() => events.rotateStart.emit(evt))
    );
    this.mapInstance.on('rotate', (evt) =>
      this.zone.run(() => events.rotate.emit(evt))
    );
    this.mapInstance.on('rotateend', (evt) =>
      this.zone.run(() => events.rotateEnd.emit(evt))
    );
    this.mapInstance.on('pitchstart', (evt) =>
      this.zone.run(() => events.pitchStart.emit(evt))
    );
    this.mapInstance.on('pitch', (evt) =>
      this.zone.run(() => events.pitchEvt.emit(evt))
    );
    this.mapInstance.on('pitchend', (evt) =>
      this.zone.run(() => events.pitchEnd.emit(evt))
    );
    this.mapInstance.on('boxzoomstart', (evt) =>
      this.zone.run(() => events.boxZoomStart.emit(evt))
    );
    this.mapInstance.on('boxzoomend', (evt) =>
      this.zone.run(() => events.boxZoomEnd.emit(evt))
    );
    this.mapInstance.on('boxzoomcancel', (evt) =>
      this.zone.run(() => events.boxZoomCancel.emit(evt))
    );
    this.mapInstance.on('webglcontextlost', (evt) =>
      this.zone.run(() => events.webGlContextLost.emit(evt))
    );
    this.mapInstance.on('webglcontextrestored', (evt) =>
      this.zone.run(() => events.webGlContextRestored.emit(evt))
    );
    this.mapInstance.on('render', (evt) =>
      this.zone.run(() => events.render.emit(evt))
    );
    this.mapInstance.on('error', (evt) =>
      this.zone.run(() => {
        events.mapError.emit(evt);
      })
    );
    this.mapInstance.on('data', (evt) =>
      this.zone.run(() => events.data.emit(evt))
    );
    this.mapInstance.on('styledata', (evt) =>
      this.zone.run(() => events.styleData.emit(evt))
    );
    this.mapInstance.on('sourcedata', (evt) =>
      this.zone.run(() => events.sourceData.emit(evt))
    );
    this.mapInstance.on('dataloading', (evt) =>
      this.zone.run(() => events.dataLoading.emit(evt))
    );
    this.mapInstance.on('styledataloading', (evt) =>
      this.zone.run(() => events.styleDataLoading.emit(evt))
    );
    this.mapInstance.on('sourcedataloading', (evt) =>
      this.zone.run(() => events.sourceDataLoading.emit(evt))
    );
    this.mapInstance.on('styleimagemissing', (evt) =>
      this.zone.run(() => events.styleImageMissing.emit(evt))
    );
    this.mapInstance.on('idle', (evt) =>
      this.zone.run(() => events.idle.emit(evt))
    );
  }

  private createSubscriptionForLayer(layerId: string, event: keyof MapLayerEventType, emitter: OutputEmitterRef<any>): Subscription {
    const handler = (evt: any) => {
      this.zone.run(() => {
        emitter.emit(evt);
      });
    }
    this.mapInstance.on(event, layerId, handler);
    return {
      unsubscribe: () => {
        this.mapInstance.off(event, layerId, handler);
      },
    }
  }

  private createSubscriptionForPopup(popup: Popup, event: "open" | "close", emitter: OutputEmitterRef<any>): Subscription {
    const handler = (evt: any) => {
      this.zone.run(() => {
        emitter.emit(evt);
      });
    }
    popup.on(event, handler);
    return {
      unsubscribe: () => {
        popup.off(event, handler);
      },
    }
  }
}
