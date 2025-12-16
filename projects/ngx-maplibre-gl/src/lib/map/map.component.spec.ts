import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  SimpleChange,
  createComponent,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { MapComponent } from './map.component';
import { MapService } from './map.service';

const getMapServiceStub = () =>
  jasmine.createSpyObj(
    [
      'setup',
      'updateMinZoom',
      'updateMaxPitch',
      'updateMinPitch',
      'destroyMap',
      'clearMapElements',
    ],
    {
      mapCreated$: of(true),
    }
  );

describe('MapComponent', () => {
  let mapServiceStub: jasmine.SpyObj<MapService>;
  let component: MapComponent;
  let componentRef: ComponentRef<MapComponent>;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(waitForAsync(() => {
    mapServiceStub = getMapServiceStub();

    TestBed.configureTestingModule({
      imports: [MapComponent],
      providers: [provideZonelessChangeDetection()],
    })
      .overrideComponent(MapComponent, {
        set: {
          providers: [{ provide: MapService, useValue: mapServiceStub }],
        },
      })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.debugElement.componentInstance;
    await fixture.whenStable();
    componentRef = fixture.componentRef;
    componentRef.setInput('mapStyle', 'mapStyle');
    fixture.detectChanges();
  });

  describe('Init tests', () => {
    it('should init with custom inputs', () => {
      // Since we don't want to trigger afterNextRender, we need to create the component in a different way
      const componentRef = createComponent(MapComponent, {
        environmentInjector: TestBed.inject(EnvironmentInjector),
      });
      componentRef.setInput('mapStyle', 'mapStyle');
      TestBed.inject(ApplicationRef).attachView(componentRef.hostView);
      expect(mapServiceStub.setup.calls.count()).toBe(0);
      TestBed.inject(ApplicationRef).tick();
      expect(mapServiceStub.setup.calls.count()).toBe(1);
      expect(
        mapServiceStub.setup.calls.first().args[0].mapOptions.style
      ).toEqual('mapStyle');
    });
  });

  describe('Change tests', () => {
    it('should update minzoom', fakeAsync(() => {
      componentRef.setInput('minZoom', 6);

      fixture.detectChanges();

      component.ngOnChanges({
        minZoom: new SimpleChange(null, component.minZoom(), false),
      });
      flushMicrotasks();
      expect(mapServiceStub.updateMinZoom).toHaveBeenCalledWith(6);
    }));

    it('should update minpitch', fakeAsync(() => {
      componentRef.setInput('minPitch', 15);
      fixture.detectChanges();

      component.ngOnChanges({
        minPitch: new SimpleChange(null, component.minPitch(), false),
      });
      flushMicrotasks();
      expect(mapServiceStub.updateMinPitch).toHaveBeenCalledWith(15);
    }));

    it('should update maxpitch', fakeAsync(() => {
      componentRef.setInput('maxPitch', 25);
      fixture.detectChanges();

      component.ngOnChanges({
        maxPitch: new SimpleChange(null, component.maxPitch(), false),
      });
      flushMicrotasks();
      expect(mapServiceStub.updateMaxPitch).toHaveBeenCalledWith(25);
    }));
  });
});
