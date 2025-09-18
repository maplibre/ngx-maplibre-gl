import {
  DestroyRef,
  Directive,
  OnDestroy,
  OnInit,
  inject,
  input,
  signal,
} from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { Source, SourceSpecification } from 'maplibre-gl';

/**
 * @internal
 * A composition object for the source components
 */
@Directive({})
export class SourceDirective implements OnInit, OnDestroy {
  /** Init injection */
  private readonly mapService = inject(MapService);
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

  ngOnDestroy(): void {
    this.removeSource();
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
