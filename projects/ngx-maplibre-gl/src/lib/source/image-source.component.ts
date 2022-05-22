import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ImageSourceSpecification, Source } from 'maplibre-gl';
import { Subscription } from 'rxjs';
import { MapService } from '../map/map.service';

@Component({
  selector: 'mgl-image-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageSourceComponent
  implements OnInit, OnDestroy, OnChanges, ImageSourceSpecification {
  /* Init inputs */
  @Input() id: string;

  /* Dynamic inputs */
  @Input() url: ImageSourceSpecification['url'];
  @Input() coordinates: ImageSourceSpecification['coordinates'];

  type: ImageSourceSpecification['type'] = 'image';

  private sub: Subscription;
  private sourceId?: string;

  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.sub = this.mapService.mapLoaded$.subscribe(() => this.init());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.sourceId === undefined) {
      return;
    }
    // HM TODO: expose image source implementation?
    const source = this.mapService.getSource<
      Source & { updateImage: Function }
    >(this.sourceId);
    if (source === undefined) {
      return;
    }
    source.updateImage({
      url: changes.url === undefined ? undefined : this.url,
      coordinates:
        changes.coordinates === undefined ? undefined : this.coordinates,
    });
  }

  ngOnDestroy() {
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }

    if (this.sourceId !== undefined) {
      this.mapService.removeSource(this.sourceId);
      this.sourceId = undefined;
    }
  }

  private init() {
    const imageSource: ImageSourceSpecification = {
      type: 'image',
      url: this.url,
      coordinates: this.coordinates,
    };
    this.mapService.addSource(this.id, imageSource);
    this.sourceId = this.id;
  }
}
