import { ApplicationRef, createComponent, EnvironmentInjector, SimpleChange } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { MapComponent } from './map.component';
import { MapService } from './map.service';

describe('MapComponent', () => {
  class MapServiceSpy {
    setup = jasmine.createSpy('setup');
    updateMinZoom = jasmine.createSpy('updateMinZoom');
    updateMaxPitch = jasmine.createSpy('updateMaxPitch');
    updateMinPitch = jasmine.createSpy('updateMinPitch');
    destroyMap = jasmine.createSpy('destroyMap');
    mapCreated$ = new ReplaySubject(1);
  }

  let msSpy: MapServiceSpy;
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MapComponent],
    })
      .overrideComponent(MapComponent, {
        set: {
          providers: [{ provide: MapService, useClass: MapServiceSpy }],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.debugElement.componentInstance;
    msSpy = fixture.debugElement.injector.get<MapService>(MapService) as any;
  });

  describe('Init tests', () => {
    it('should init', () => {
      fixture.detectChanges();
      expect(msSpy.setup.calls.count()).toBe(1);
    });

    it('should init with custom inputs', () => {
      // Since we don't want to trigger afterNextRender, we need to create the component in a different way
      let componentRef = createComponent(MapComponent, {
        environmentInjector: TestBed.inject(EnvironmentInjector),
      });
      msSpy = componentRef.injector.get<MapService>(MapService) as any;
      componentRef.instance.style = 'style';
      TestBed.inject(ApplicationRef).attachView(componentRef.hostView);
      expect(msSpy.setup.calls.count()).toBe(0);
      TestBed.inject(ApplicationRef).tick();
      expect(msSpy.setup.calls.count()).toBe(1);
      expect(msSpy.setup.calls.first().args[0].mapOptions.style).toEqual('style');
    });
  });

  describe('Change tests', () => {
    it('should update minzoom', fakeAsync(() => {
      msSpy.mapCreated$.next(undefined);
      msSpy.mapCreated$.complete();
      component.minZoom = 6;
      component.ngOnChanges({
        minZoom: new SimpleChange(null, component.minZoom, false),
      });
      flushMicrotasks();
      expect(msSpy.updateMinZoom).toHaveBeenCalledWith(6);
    }));

    it('should update minpitch', fakeAsync(() => {
      msSpy.mapCreated$.next(undefined);
      msSpy.mapCreated$.complete();
      component.minPitch = 15;
      component.ngOnChanges({
        minPitch: new SimpleChange(null, component.minPitch, false),
      });
      flushMicrotasks();
      expect(msSpy.updateMinPitch).toHaveBeenCalledWith(15);
    }));

    it('should update maxpitch', fakeAsync(() => {
      msSpy.mapCreated$.next(undefined);
      msSpy.mapCreated$.complete();
      component.maxPitch = 25;
      component.ngOnChanges({
        maxPitch: new SimpleChange(null, component.maxPitch, false),
      });
      flushMicrotasks();
      expect(msSpy.updateMaxPitch).toHaveBeenCalledWith(25);
    }));
  });
});
