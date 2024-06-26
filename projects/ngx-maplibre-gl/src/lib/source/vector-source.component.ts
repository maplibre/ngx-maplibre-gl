import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  inject,
  input,
  signal,
} from '@angular/core';
import type { VectorSourceSpecification, VectorTileSource } from 'maplibre-gl';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';

/**
 * `mgl-vector-source` - a vector source component
 * @see [vector](https://maplibre.org/maplibre-style-spec/sources/#vector)
 *
 * @category Source Components
 */
@Component({
  selector: 'mgl-vector-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class VectorSourceComponent implements OnInit, OnDestroy, OnChanges {
  /* Init injection */
  private readonly mapService = inject(MapService);

  /* Init inputs */
  readonly id = input.required<string>();
  readonly url = input<VectorSourceSpecification['url']>();
  readonly tiles = input<VectorSourceSpecification['tiles']>();
  readonly bounds = input<VectorSourceSpecification['bounds']>();
  readonly scheme = input<VectorSourceSpecification['scheme']>();
  readonly minzoom = input<VectorSourceSpecification['minzoom']>();
  readonly maxzoom = input<VectorSourceSpecification['maxzoom']>();
  readonly attribution = input<VectorSourceSpecification['attribution']>();
  readonly promoteId = input<VectorSourceSpecification['promoteId']>();

  readonly type: VectorSourceSpecification['type'] = 'vector';

  private readonly sourceAdded = signal(false);
  private sub = new Subscription();

  ngOnInit() {
    const sub1 = this.mapService.mapLoaded$.subscribe(() => {
      this.init();
      const sub = fromEvent(this.mapService.mapInstance, 'styledata')
        .pipe(filter(() => !this.mapService.mapInstance.getSource(this.id())))
        .subscribe(() => {
          this.init();
        });
      this.sub.add(sub);
    });
    this.sub.add(sub1);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.sourceAdded()) {
      return;
    }

    if (
      (changes.bounds && !changes.bounds.isFirstChange()) ||
      (changes.scheme && !changes.scheme.isFirstChange()) ||
      (changes.minzoom && !changes.minzoom.isFirstChange()) ||
      (changes.maxzoom && !changes.maxzoom.isFirstChange()) ||
      (changes.attribution && !changes.attribution.isFirstChange()) ||
      (changes.promoteId && !changes.promoteId.isFirstChange())
    ) {
      this.ngOnDestroy();
      this.ngOnInit();
    } else if (
      (changes.url && !changes.url.isFirstChange()) ||
      (changes.tiles && !changes.tiles.isFirstChange())
    ) {
      const source = this.mapService.getSource<VectorTileSource>(this.id());
      if (source === undefined) {
        return;
      }
      const url = this.url();
      if (changes.url && url) {
        source.setUrl(url);
      }

      const tiles = this.tiles();
      if (changes.tiles && tiles) {
        source.setTiles(tiles);
      }
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    if (this.sourceAdded()) {
      this.mapService.removeSource(this.id());
      this.sourceAdded.set(false);
    }
  }

  private init() {
    const source: VectorSourceSpecification = {
      type: this.type,
      url: this.url(),
      tiles: this.tiles(),
      bounds: this.bounds(),
      scheme: this.scheme(),
      minzoom: this.minzoom(),
      maxzoom: this.maxzoom(),
      attribution: this.attribution(),
      promoteId: this.promoteId(),
    };
    this.mapService.addSource(this.id(), source);
    this.sourceAdded.set(true);
  }
}
