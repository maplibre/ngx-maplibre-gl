import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  inject,
  output,
} from '@angular/core';
import {
  LayerSpecification,
  FilterSpecification,
  MapLayerMouseEvent,
  MapLayerTouchEvent,
} from 'maplibre-gl';
import { fromEvent, Subscription } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { MapService, SetupLayer } from '../map/map.service';
import { EventData, LayerEvents } from '../map/map.types';

/**
 * `mgl-layer` - a layer component
 * @see [layers](https://maplibre.org/maplibre-style-spec/layers/)
 *
 * @category Layer Component
 *
 * @example
 * ```html
 * ...
 * <mgl-map ...>
 *   <mgl-layer
 *     id="state-borders"
 *     type="line"
 *     [source]="states"
 *     [paint]="{
 *       'line-color': '#627BC1',
 *       'line-width': 2
 *     }"
 *   ></mgl-layer>
 * </mgl-map>
 * ```
 */
@Component({
  selector: 'mgl-layer',
  template: '',
  standalone: true,
})
export class LayerComponent
  implements OnInit, OnDestroy, OnChanges, LayerEvents
{
  /** Init injection */
  private readonly mapService = inject(MapService);

  /** Init input */
  @Input() id: LayerSpecification['id'];
  /** Init input */
  @Input() source?: string;
  /** Init input */
  @Input() type: LayerSpecification['type'];
  /** Init input */
  @Input() metadata?: LayerSpecification['metadata'];
  /** Init input */
  @Input() sourceLayer?: string;
  /**
   * A flag to enable removeSource clean up functionality
   *
   * Init input
   */
  @Input() removeSource?: boolean;

  /** Dynamic input */
  @Input() filter?: FilterSpecification;
  /** Dynamic input */
  @Input() layout?: LayerSpecification['layout'];
  /** Dynamic input */
  @Input() paint?: LayerSpecification['paint'];
  /** Dynamic input */
  @Input() before?: string;
  /** Dynamic input */
  @Input() minzoom?: LayerSpecification['minzoom'];
  /** Dynamic input */
  @Input() maxzoom?: LayerSpecification['maxzoom'];

  readonly layerClick = output<MapLayerMouseEvent & EventData>();
  readonly layerDblClick = output<MapLayerMouseEvent & EventData>();
  readonly layerMouseDown = output<MapLayerMouseEvent & EventData>();
  readonly layerMouseUp = output<MapLayerMouseEvent & EventData>();
  readonly layerMouseEnter = output<MapLayerMouseEvent & EventData>();
  readonly layerMouseLeave = output<MapLayerMouseEvent & EventData>();
  readonly layerMouseMove = output<MapLayerMouseEvent & EventData>();
  readonly layerMouseOver = output<MapLayerMouseEvent & EventData>();
  readonly layerMouseOut = output<MapLayerMouseEvent & EventData>();
  readonly layerContextMenu = output<MapLayerMouseEvent & EventData>();
  readonly layerTouchStart = output<MapLayerTouchEvent & EventData>();
  readonly layerTouchEnd = output<MapLayerTouchEvent & EventData>();
  readonly layerTouchCancel = output<MapLayerTouchEvent & EventData>();

  private layerAdded = false;
  private sub: Subscription;
  private sourceIdAdded?: string;

  ngOnInit() {
    this.sub = this.mapService.mapLoaded$
      .pipe(
        switchMap(() =>
          fromEvent(this.mapService.mapInstance, 'styledata').pipe(
            map(() => false),
            filter(() => !this.mapService.mapInstance.getLayer(this.id)),
            startWith(true)
          )
        )
      )
      .subscribe((bindEvents: boolean) => this.init(bindEvents));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.layerAdded) {
      return;
    }
    if (changes.paint && !changes.paint.isFirstChange()) {
      this.mapService.setAllLayerPaintProperty(
        this.id,
        changes.paint.currentValue!
      );
    }
    if (changes.layout && !changes.layout.isFirstChange()) {
      this.mapService.setAllLayerLayoutProperty(
        this.id,
        changes.layout.currentValue!
      );
    }
    if (changes.filter && !changes.filter.isFirstChange()) {
      this.mapService.setLayerFilter(this.id, changes.filter.currentValue!);
    }
    if (changes.before && !changes.before.isFirstChange()) {
      this.mapService.setLayerBefore(this.id, changes.before.currentValue!);
    }
    if (
      (changes.minzoom && !changes.minzoom.isFirstChange()) ||
      (changes.maxzoom && !changes.maxzoom.isFirstChange())
    ) {
      this.mapService.setLayerZoomRange(this.id, this.minzoom, this.maxzoom);
    }
  }

  ngOnDestroy() {
    if (this.layerAdded) {
      this.mapService.removeLayer(this.id);
      if (undefined !== this.sourceIdAdded) {
        // Clean up any automatically created source for this layer
        if (this.mapService.getSource(this.sourceIdAdded)) {
          this.mapService.removeSource(this.sourceIdAdded);
        }
      }
    }
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private init(bindEvents: boolean) {
    const layer: SetupLayer = {
      layerOptions: {
        id: this.id,
        type: this.type,
        source: this.source as string,
        metadata: this.metadata,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'source-layer': this.sourceLayer,
        minzoom: this.minzoom,
        maxzoom: this.maxzoom,
        filter: this.filter,
        layout: this.layout,
        paint: this.paint,
      } as LayerSpecification,
      layerEvents: {
        layerClick: this.layerClick,
        layerDblClick: this.layerDblClick,
        layerMouseDown: this.layerMouseDown,
        layerMouseUp: this.layerMouseUp,
        layerMouseEnter: this.layerMouseEnter,
        layerMouseLeave: this.layerMouseLeave,
        layerMouseMove: this.layerMouseMove,
        layerMouseOver: this.layerMouseOver,
        layerMouseOut: this.layerMouseOut,
        layerContextMenu: this.layerContextMenu,
        layerTouchStart: this.layerTouchStart,
        layerTouchEnd: this.layerTouchEnd,
        layerTouchCancel: this.layerTouchCancel,
      },
    };
    if (this.removeSource && typeof this.source !== 'string') {
      // There is no id of an existing source bound to this layer
      if (undefined === this.mapService.getSource(this.id)) {
        // A source with this layer id doesn't exist so it will be created automatically in the addLayer call below
        this.sourceIdAdded = this.id;
      }
    }
    this.mapService.addLayer(layer, bindEvents, this.before);
    if (undefined !== this.sourceIdAdded) {
      if (undefined === this.mapService.getSource(this.sourceIdAdded)) {
        // If it wasn't created for some reason then we don't want to clean it up
        this.sourceIdAdded = undefined;
      }
    }
    this.layerAdded = true;
  }
}
