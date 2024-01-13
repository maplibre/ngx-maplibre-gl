import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import { MapImageData, MapImageOptions } from '../map/map.types';

@Component({
  selector: 'mgl-image',
  template: '',
  standalone: true,
})
export class ImageComponent implements OnInit, OnDestroy, OnChanges {
  /* Init inputs */
  @Input() id: string;

  /* Dynamic inputs */
  @Input() data?: MapImageData;
  @Input() options?: MapImageOptions;
  @Input() url?: string;

  @Output() imageError = new EventEmitter<{ status: number }>();
  @Output() imageLoaded = new EventEmitter<void>();

  private isAdded = false;
  private isAdding = false;
  private sub: Subscription;

  constructor(private mapService: MapService, private zone: NgZone) {}

  ngOnInit() {
    this.sub = this.mapService.mapLoaded$
      .pipe(
        switchMap(() =>
          fromEvent(this.mapService.mapInstance, 'styledata').pipe(
            startWith(undefined),
            filter(
              () =>
                !this.isAdding && !this.mapService.mapInstance.hasImage(this.id)
            )
          )
        )
      )
      .subscribe(() => this.init());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      (changes.data && !changes.data.isFirstChange()) ||
      (changes.options && !changes.options.isFirstChange()) ||
      (changes.url && !changes.url.isFirstChange())
    ) {
      this.ngOnDestroy();
      this.ngOnInit();
    }
  }

  ngOnDestroy() {
    if (this.isAdded) {
      this.mapService.removeImage(this.id);
    }
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private async init() {
    this.isAdding = true;
    if (this.data) {
      this.mapService.addImage(this.id, this.data, this.options);
      this.isAdded = true;
      this.isAdding = false;
    } else if (this.url) {
      try {
        await this.mapService.loadAndAddImage(this.id, this.url, this.options);
        this.isAdded = true;
        this.isAdding = false;
        this.zone.run(() => {
          this.imageLoaded.emit();
        });
      } catch (error) {
        this.zone.run(() => {
          this.imageError.emit(error as any);
        });
      }
    }
  }
}
