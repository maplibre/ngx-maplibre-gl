import {
  DestroyRef,
  Directive,
  OnInit,
  inject,
  input,
  signal,
} from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Source, SourceSpecification } from 'maplibre-gl';

/**
 *
 * @category Source Components
 */
@Directive({
  standalone: true,
})
export class SourceDirective implements OnInit {
  /** Init injection */
  readonly mapService = inject(MapService);
  private readonly destroyRef = inject(DestroyRef);

  /**  Init input */
  public readonly id = input.required<string>();

  /** 
   * @internal
   * Used to store the current source id and make sure removeSource is only called once.
   */
  readonly sourceId = signal<string | null>(null);
  private readonly loadSourceSubject = new Subject<void>();
  readonly loadSource$ = this.loadSourceSubject.asObservable();

  constructor() {
    this.destroyRef.onDestroy(() => this.removeSource());
  }

  ngOnInit() {
    this.mapService.mapLoaded$
      .pipe(
        tap(() => this.loadSourceSubject.next()),
        switchMap(() =>
          fromEvent(this.mapService.mapInstance, 'styledata').pipe(
            filter(() => !this.mapService.mapInstance.getSource(this.id())),
            tap(() => this.loadSourceSubject.next())
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  refresh() {
    this.removeSource();
    this.loadSourceSubject.next();
  }

  removeSource() {
    const currentId = this.sourceId();
    if (currentId) {
      this.mapService.removeSource(currentId);
      this.sourceId.set(null);
    }
  }

  addSource(source: SourceSpecification) {
    this.mapService.addSource(this.id(), source);
    this.sourceId.set(this.id());
  }

  getSource<T extends Source>(): T | undefined {
    return this.mapService.getSource<T>(this.id());
  }
}
