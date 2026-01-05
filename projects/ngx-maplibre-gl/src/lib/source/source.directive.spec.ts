import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  DestroyRef,
  inject,
  input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of, tap } from 'rxjs';
import { MapService } from '../map/map.service';
import { SourceDirective } from './source.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { VectorSourceSpecification } from 'maplibre-gl';

const getMapServiceStub = () =>
  jasmine.createSpyObj(['removeSource', 'addSource', 'getSource'], {
    mapLoaded$: of(true),
    mapInstance: new EventTarget(),
  });
const destroyRefStub = () => jasmine.createSpyObj(['onDestroy']);

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [{ directive: SourceDirective, inputs: ['id'] }],
})
export class TestSourceComponent implements OnChanges {
  public readonly sourceDirective = inject(SourceDirective);
  readonly testInput = input<string>();

  constructor() {
    this.sourceDirective.loadSource$
      .pipe(
        tap(() => this.sourceDirective.addSource({ type: 'vector' })),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.sourceDirective.sourceId()) {
      return;
    }
    if (changes.testInput && !changes.testInput.isFirstChange()) {
      this.sourceDirective.refresh();
    }
  }
}

describe('SourceDirective', () => {
  let mapServiceStub: jasmine.SpyObj<MapService>;
  let fixture: ComponentFixture<TestSourceComponent>;
  let componentRef: ComponentRef<TestSourceComponent>;
  let directive: SourceDirective;

  beforeEach(waitForAsync(() => {
    mapServiceStub = getMapServiceStub();

    TestBed.configureTestingModule({
      imports: [TestSourceComponent, SourceDirective],
      providers: [
        { provide: MapService, useValue: mapServiceStub },
        { provide: DestroyRef, useValue: destroyRefStub },
        SourceDirective,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestSourceComponent);
    componentRef = fixture.componentRef;
    componentRef.setInput('id', 'test-id-1');
    directive = componentRef.instance.sourceDirective;
  }));

  it('should remove and recreate source on update', () => {
    componentRef.setInput('id', 'test-id-1');
    componentRef.setInput('testInput', 'test value');

    directive.loadSource$.subscribe();

    fixture.detectChanges();

    componentRef.setInput('id', 'test-id-2');
    componentRef.setInput('testInput', 'new value');

    fixture.detectChanges();

    expect(mapServiceStub.removeSource).toHaveBeenCalledOnceWith('test-id-1');
    expect(mapServiceStub.addSource).toHaveBeenCalledTimes(2);
    const  vector: VectorSourceSpecification = { type: 'vector' };
    expect(mapServiceStub.addSource.calls.argsFor(0)).toEqual([
      'test-id-1',
      vector,
    ]);
    expect(mapServiceStub.addSource.calls.argsFor(1)).toEqual([
      'test-id-2',
      vector,
    ]);
  });
});
