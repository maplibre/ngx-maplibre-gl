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
  Map,
  Marker,
  Popup,
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
} from 'maplibre-gl';
import { AsyncSubject, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import type {
  LayerEvents,
  MapEvent,
  MapImageData,
  MapImageOptions,
} from './map.types';

export interface SetupMap {
  mapOptions: Omit<MapOptions, 'bearing' | 'pitch' | 'zoom'> & {
    bearing?: [number];
    pitch?: [number];
    zoom?: [number];
    terrain?: TerrainSpecification;
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

export interface SetupMarker {
  markersOptions: {
    pitchAlignment?: MarkerOptions['pitchAlignment'];
    rotationAlignment?: MarkerOptions['rotationAlignment'];
    rotation?: MarkerOptions['rotation'];
    offset?: MarkerOptions['offset'];
    anchor?: MarkerOptions['anchor'];
    color?: MarkerOptions['color'];
    draggable?: MarkerOptions['draggable'];
    element: HTMLElement;
    feature?: GeoJSON.Feature<GeoJSON.Point>;
    lngLat?: LngLatLike;
    clickTolerance?: MarkerOptions['clickTolerance'];
  };
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

  mapInstance: Map;
  mapEvents: MapEvent;

  private readonly mapCreated = new AsyncSubject<void>();
  private readonly mapLoaded = new AsyncSubject<void>();
  private readonly markersToRemove = signal<Marker[]>([]);
  private readonly popupsToRemove = signal<Popup[]>([]);
  private readonly imageIdsToRemove = signal<string[]>([]);
  private readonly subscription = new Subscription();

  readonly mapCreated$ = this.mapCreated.asObservable();
  readonly mapLoaded$ = this.mapLoaded.asObservable();

  setup(options: SetupMap) {
    // Need onStable to wait for a potential @angular/route transition to end
    this.zone.onStable.pipe(first()).subscribe(() => {
      // Workaround rollup issue
      this.createMap(options.mapOptions as MapOptions);
      this.hookEvents(options.mapEvents);
      this.mapEvents = options.mapEvents;
      this.mapCreated.next(undefined);
      this.mapCreated.complete();

      if (options.mapOptions.terrain) {
        this.mapInstance.on('load', () => {
          this.updateTerrain(options.mapOptions.terrain!);
        });
      }
    });
  }

  destroyMap() {
    if (this.mapInstance) {
      this.subscription.unsubscribe();
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

  updateTerrain(options: TerrainSpecification) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.setTerrain(options);
    });
  }

  getTerrain(): TerrainSpecification | null {
    return this.zone.runOutsideAngular(() => {
      return this.mapInstance.getTerrain();
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
    pitch?: number
  ) {
    return this.zone.runOutsideAngular(() => {
      (this.mapInstance[movingMethod] as any)({
        ...movingOptions,
        zoom: zoom != null ? zoom : this.mapInstance.getZoom(),
        center: center != null ? center : this.mapInstance.getCenter(),
        bearing: bearing != null ? bearing : this.mapInstance.getBearing(),
        pitch: pitch != null ? pitch : this.mapInstance.getPitch(),
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
      if (bindEvents) {
        this.mapInstance.on('click', layer.layerOptions.id, (evt) => {
          this.zone.run(() => {
            layer.layerEvents.layerClick.emit(evt);
          });
        });
        this.mapInstance.on('dblclick', layer.layerOptions.id, (evt) => {
          this.zone.run(() => {
            layer.layerEvents.layerDblClick.emit(evt);
          });
        });
        this.mapInstance.on('mousedown', layer.layerOptions.id, (evt) => {
          this.zone.run(() => {
            layer.layerEvents.layerMouseDown.emit(evt);
          });
        });
        this.mapInstance.on('mouseup', layer.layerOptions.id, (evt) => {
          this.zone.run(() => {
            layer.layerEvents.layerMouseUp.emit(evt);
          });
        });
        this.mapInstance.on('mouseenter', layer.layerOptions.id, (evt) => {
          this.zone.run(() => {
            layer.layerEvents.layerMouseEnter.emit(evt);
          });
        });
        this.mapInstance.on('mouseleave', layer.layerOptions.id, (evt) => {
          this.zone.run(() => {
            layer.layerEvents.layerMouseLeave.emit(evt);
          });
        });
        this.mapInstance.on('mousemove', layer.layerOptions.id, (evt) => {
          this.zone.run(() => {
            layer.layerEvents.layerMouseMove.emit(evt);
          });
        });
        this.mapInstance.on('mouseover', layer.layerOptions.id, (evt) => {
          this.zone.run(() => {
            layer.layerEvents.layerMouseOver.emit(evt);
          });
        });
        this.mapInstance.on('mouseout', layer.layerOptions.id, (evt) => {
          this.zone.run(() => {
            layer.layerEvents.layerMouseOut.emit(evt);
          });
        });
        this.mapInstance.on('contextmenu', layer.layerOptions.id, (evt) => {
          this.zone.run(() => {
            layer.layerEvents.layerContextMenu.emit(evt);
          });
        });
        this.mapInstance.on('touchstart', layer.layerOptions.id, (evt) => {
          this.zone.run(() => {
            layer.layerEvents.layerTouchStart.emit(evt);
          });
        });
        this.mapInstance.on('touchend', layer.layerOptions.id, (evt) => {
          this.zone.run(() => {
            layer.layerEvents.layerTouchEnd.emit(evt);
          });
        });
        this.mapInstance.on('touchcancel', layer.layerOptions.id, (evt) => {
          this.zone.run(() => {
            layer.layerEvents.layerTouchCancel.emit(evt);
          });
        });
      }
    });
  }

  removeLayer(layerId: string) {
    this.zone.runOutsideAngular(() => {
      if (this.mapInstance.getLayer(layerId) != null) {
        this.mapInstance.removeLayer(layerId);
      }
    });
  }

  addMarker(marker: SetupMarker) {
    const options: MarkerOptions = {
      offset: marker.markersOptions.offset,
      anchor: marker.markersOptions.anchor,
      color: marker.markersOptions.color,
      draggable: !!marker.markersOptions.draggable,
      rotationAlignment: marker.markersOptions.rotationAlignment,
      rotation: marker.markersOptions.rotation,
      pitchAlignment: marker.markersOptions.pitchAlignment,
      clickTolerance: marker.markersOptions.clickTolerance,
    };
    if (marker.markersOptions.element.childNodes.length > 0) {
      options.element = marker.markersOptions.element;
    }
    const markerInstance = new Marker(options);
    markerInstance.on('dragstart', (event: { target: Marker }) => {
      if (event) {
        const { target } = event;
        this.zone.run(() => {
          marker.markersEvents.markerDragStart.emit(target);
        });
      }
    });
    /*

     */
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
      Object.keys(popup.popupOptions).forEach(
        (key) =>
          (popup.popupOptions as any)[key] === undefined &&
          delete (popup.popupOptions as any)[key]
      );
      const popupInstance = new Popup(popup.popupOptions);
      popupInstance.setDOMContent(element);
      popupInstance.on('close', () => {
        this.zone.run(() => {
          popup.popupEvents.popupClose.emit();
        });
      });
      popupInstance.on('open', () => {
        this.zone.run(() => {
          popup.popupEvents.popupOpen.emit();
        });
      });
      return popupInstance;
    });
  }

  addPopupToMap(popup: Popup, lngLat: LngLatLike, skipOpenEvent = false) {
    return this.zone.runOutsideAngular(() => {
      if (skipOpenEvent && popup._listeners) {
        delete popup._listeners['open'];
      }
      popup.setLngLat(lngLat);
      popup.addTo(this.mapInstance);
    });
  }

  addPopupToMarker(marker: Marker, popup: Popup) {
    return this.zone.runOutsideAngular(() => {
      marker.setPopup(popup);
    });
  }

  removePopupFromMap(popup: Popup, skipCloseEvent = false) {
    if (skipCloseEvent && popup._listeners) {
      delete popup._listeners['close'];
    }
    this.popupsToRemove.update((popups) => [...popups, popup]);
  }

  removePopupFromMarker(marker: Marker) {
    return this.zone.runOutsideAngular(() => {
      marker.setPopup(undefined);
    });
  }

  addControl(
    control: IControl,
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  ) {
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
        this.mapInstance.removeLayer(layer.id)
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

  applyChanges() {
    this.zone.runOutsideAngular(() => {
      this.removeMarkers();
      this.removePopups();
      this.removeImages();
    });
  }

  private createMap(options: MapOptions) {
    NgZone.assertNotInAngularZone();
    Object.keys(options).forEach((key: string) => {
      const tkey = <keyof MapOptions>key;
      if (options[tkey] === undefined) {
        delete options[tkey];
      }
    });
    this.mapInstance = new Map(options);

    const isIEorEdge =
      window && /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
    if (isIEorEdge) {
      this.mapInstance.setStyle(options.style!);
    }

    this.subscription.add(
      this.zone.onMicrotaskEmpty.subscribe(() => this.applyChanges())
    );
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
}
