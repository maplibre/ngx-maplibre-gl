import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { ImageSourceSpecification, ImageSource } from 'maplibre-gl';
import { Subscription } from 'rxjs';
import { MapService } from '../map/map.service';

/**
 * `mgl-image-source` - an image source component
 * @see [image](https://maplibre.org/maplibre-style-spec/sources/#image)
 *
 * @category Source Components
 */
@Component({
  selector: 'mgl-image-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ImageSourceComponent
  implements OnInit, OnDestroy, OnChanges, ImageSourceSpecification
{
  /** Init injection */
  private readonly mapService = inject(MapService);

  /* Init inputs */
  @Input() id: string;

  /* Dynamic inputs */
  @Input() url: ImageSourceSpecification['url'];
  @Input() coordinates: ImageSourceSpecification['coordinates'];

  type: ImageSourceSpecification['type'] = 'image';

  private sub: Subscription;
  private sourceId?: string;

  ngOnInit() {
    this.sub = this.mapService.mapLoaded$.subscribe(() => this.init());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.sourceId === undefined) {
      return;
    }
    const source = this.mapService.getSource<ImageSource>(this.sourceId);
    if (source === undefined) {
      return;
    }
    source.updateImage({
      url: changes.url === undefined ? (undefined as any) : this.url,
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
