import {
  Directive,
  NgZone,
  OnDestroy,
  OnInit,
  inject,
  input,
  output,
} from '@angular/core';
import type { MapMouseEvent } from 'maplibre-gl';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import type { LayerComponent } from '../layer/layer.component';
import { MapService } from '../map/map.service';
import { FeatureComponent } from '../source/geojson/feature.component';

/**
 * `mglDraggable` - a directive for Feature or Marker
 *
 * @category Directives
 *
 * @see [Draggable Marker](https://maplibre.org/ng-maplibre-gl/demo/ngx-drag-a-point)
 */
@Directive({
  selector: '[mglDraggable]',
})
export class DraggableDirective implements OnInit, OnDestroy {
  /** Init injection */
  private readonly mapService = inject(MapService);
  private readonly ngZone = inject(NgZone);
  private readonly featureComponent = inject(FeatureComponent, {
    host: true,
    optional: true,
  });

  // eslint-disable-next-line @angular-eslint/no-input-rename
  readonly layer = input<LayerComponent | null>(null, {
    alias: 'mglDraggable',
  });

  featureDragStart = output<MapMouseEvent>();
  featureDragEnd = output<MapMouseEvent>();
  featureDrag = output<MapMouseEvent>();

  private sub = new Subscription();

  ngOnInit() {
    let enter$;
    let leave$;
    let updateCoords;
    const layer = this.layer();
    if (this.featureComponent && layer) {
      enter$ = outputToObservable(layer.layerMouseEnter);
      leave$ = outputToObservable(layer.layerMouseLeave);
      updateCoords = this.featureComponent.updateCoordinates.bind(
        this.featureComponent
      );
      if (this.featureComponent.geometry().type !== 'Point') {
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
    this.mapService.mapCreated$.subscribe(() => {
      const mouseUp$ = fromEvent<MapMouseEvent>(
        this.mapService.mapInstance,
        'mouseup'
      );
      const dragStart$ = enter$.pipe(
        filter(() => !moving),
        filter((evt) => this.filterFeature(evt)),
        tap(() => {
          inside = true;
          this.mapService.changeCanvasCursor('move');
          this.mapService.updateDragPan(false);
        }),
        switchMap(() =>
          fromEvent<MapMouseEvent>(
            this.mapService.mapInstance,
            'mousedown'
          ).pipe(takeUntil(leave$))
        )
      );
      const dragging$ = dragStart$.pipe(
        switchMap(() =>
          fromEvent<MapMouseEvent>(
            this.mapService.mapInstance,
            'mousemove'
          ).pipe(takeUntil(mouseUp$))
        )
      );
      const dragEnd$ = dragStart$.pipe(switchMap(() => mouseUp$.pipe(take(1))));
      this.sub.add(
        dragStart$.subscribe((evt) => {
          moving = true;
          this.ngZone.run(() => {
            this.featureDragStart.emit(evt);
          });
        })
      );
      this.sub.add(
        dragging$.subscribe((evt) => {
          updateCoords([evt.lngLat.lng, evt.lngLat.lat]);
          this.ngZone.run(() => {
            this.featureDrag.emit(evt);
          });
        })
      );
      this.sub.add(
        dragEnd$.subscribe((evt) => {
          moving = false;
          this.ngZone.run(() => {
            this.featureDragEnd.emit(evt);
          });
          if (!inside) {
            // It's possible to dragEnd outside the target (small input lag)
            this.mapService.changeCanvasCursor('');
            this.mapService.updateDragPan(true);
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
            this.mapService.changeCanvasCursor('');
            this.mapService.updateDragPan(true);
          })
      );
    });
  }

  private filterFeature(evt: MapMouseEvent) {
    const layer = this.layer();
    if (this.featureComponent && layer) {
      const feature: GeoJSON.Feature = this.mapService.queryRenderedFeatures(
        evt.point,
        {
          layers: [layer.id()],
          filter: [
            'all',
            ['==', '$type', 'Point'],
            ['==', '$id', this.featureComponent.id() as number],
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
