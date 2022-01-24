import {
  Directive,
  EventEmitter,
  Host,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { MapMouseEvent } from 'maplibre-gl';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { LayerComponent } from '../layer/layer.component';
import { MapService } from '../map/map.service';
import { FeatureComponent } from '../source/geojson/feature.component';

@Directive({
  selector: '[mglDraggable]',
})
export class DraggableDirective implements OnInit, OnDestroy {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('mglDraggable') layer?: LayerComponent;

  @Output() featureDragStart = new EventEmitter<MapMouseEvent>();
  @Output() featureDragEnd = new EventEmitter<MapMouseEvent>();
  @Output() featureDrag = new EventEmitter<MapMouseEvent>();

  private sub = new Subscription();

  constructor(
    private MapService: MapService,
    private NgZone: NgZone,
    @Optional() @Host() private FeatureComponent?: FeatureComponent
  ) {}

  ngOnInit() {
    let enter$;
    let leave$;
    let updateCoords;
    if (this.FeatureComponent && this.layer) {
      enter$ = this.layer.layerMouseEnter;
      leave$ = this.layer.layerMouseLeave;
      updateCoords = this.FeatureComponent.updateCoordinates.bind(
        this.FeatureComponent
      );
      if (this.FeatureComponent.geometry.type !== 'Point') {
        throw new Error('mglDraggable only support point feature');
      }
    } else {
      throw new Error(
        'mglDraggable can only be used on Feature (with a layer as input) or Marker'
      );
    }

    this.handleDraggable(enter$, leave$, updateCoords);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private handleDraggable(
    enter$: Observable<MapMouseEvent>,
    leave$: Observable<MapMouseEvent>,
    updateCoords: (coord: number[]) => void
  ) {
    let moving = false;
    let inside = false;
    this.MapService.mapCreated$.subscribe(() => {
      const mouseUp$ = fromEvent<MapMouseEvent>(
        <any>this.MapService.mapInstance,
        'mouseup'
      );
      const dragStart$ = enter$.pipe(
        filter(() => !moving),
        filter((evt) => this.filterFeature(evt)),
        tap(() => {
          inside = true;
          this.MapService.changeCanvasCursor('move');
          this.MapService.updateDragPan(false);
        }),
        switchMap(() =>
          fromEvent<MapMouseEvent>(
            <any>this.MapService.mapInstance,
            'mousedown'
          ).pipe(takeUntil(leave$))
        )
      );
      const dragging$ = dragStart$.pipe(
        switchMap(() =>
          fromEvent<MapMouseEvent>(
            <any>this.MapService.mapInstance,
            'mousemove'
          ).pipe(takeUntil(mouseUp$))
        )
      );
      const dragEnd$ = dragStart$.pipe(switchMap(() => mouseUp$.pipe(take(1))));
      this.sub.add(
        dragStart$.subscribe((evt) => {
          moving = true;
          if (this.featureDragStart.observers.length) {
            this.NgZone.run(() => {
              this.featureDragStart.emit(evt);
            });
          }
        })
      );
      this.sub.add(
        dragging$.subscribe((evt) => {
          updateCoords([evt.lngLat.lng, evt.lngLat.lat]);
          if (this.featureDrag.observers.length) {
            this.NgZone.run(() => {
              this.featureDrag.emit(evt);
            });
          }
        })
      );
      this.sub.add(
        dragEnd$.subscribe((evt) => {
          moving = false;
          if (this.featureDragEnd.observers.length) {
            this.NgZone.run(() => {
              this.featureDragEnd.emit(evt);
            });
          }
          if (!inside) {
            // It's possible to dragEnd outside the target (small input lag)
            this.MapService.changeCanvasCursor('');
            this.MapService.updateDragPan(true);
          }
        })
      );
      this.sub.add(
        leave$
          .pipe(
            tap(() => (inside = false)),
            filter(() => !moving)
          )
          .subscribe(() => {
            this.MapService.changeCanvasCursor('');
            this.MapService.updateDragPan(true);
          })
      );
    });
  }

  private filterFeature(evt: MapMouseEvent) {
    if (this.FeatureComponent && this.layer) {
      const feature: GeoJSON.Feature<any> = this.MapService.queryRenderedFeatures(
        evt.point,
        {
          layers: [this.layer.id],
          filter: [
            'all',
            ['==', '$type', 'Point'],
            ['==', '$id', this.FeatureComponent.id],
          ],
        }
      )[0];
      if (!feature) {
        return false;
      }
    }
    return true;
  }
}
