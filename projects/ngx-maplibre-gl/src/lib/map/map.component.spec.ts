import { createSpyObj, type SpyObj } from '../../testing/spy-obj';
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
  TestBed,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { MapComponent } from './map.component';
import { MapService } from './map.service';

const getMapServiceStub = () =>
  createSpyObj<MapService>(
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
  let mapServiceStub: SpyObj<MapService>;
  let component: MapComponent;
  let componentRef: ComponentRef<MapComponent>;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    mapServiceStub = getMapServiceStub();

    await TestBed.configureTestingModule({
      imports: [MapComponent],
      providers: [provideZonelessChangeDetection()],
    })
      .overrideComponent(MapComponent, {
        set: {
          providers: [{ provide: MapService, useValue: mapServiceStub }],
        },
      })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(MapComponent);
    componentRef = fixture.componentRef;
    componentRef.setInput('mapStyle', 'mapStyle');
    component = fixture.debugElement.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  describe('Init tests', () => {
    it('should init with custom inputs', () => {
      const callCount = mapServiceStub.setup.mock.calls.length;

      // Since we don't want to trigger afterNextRender, we need to create the component in a different way
      const componentRef = createComponent(MapComponent, {
        environmentInjector: TestBed.inject(EnvironmentInjector),
      });
      componentRef.setInput('mapStyle', 'mapStyle');
      TestBed.inject(ApplicationRef).attachView(componentRef.hostView);
      expect(mapServiceStub.setup.mock.calls.length).toBe(callCount);
      TestBed.inject(ApplicationRef).tick();
      expect(mapServiceStub.setup.mock.calls.length).toBe(callCount+1);
      expect(
        mapServiceStub.setup.mock.calls[0][0].mapOptions.style
      ).toEqual('mapStyle');
    });
  });

  describe('Change tests', () => {
    it('should update minzoom', async () => {
      componentRef.setInput('minZoom', 6);

      fixture.detectChanges();

      await component.ngOnChanges({
        minZoom: new SimpleChange(null, component.minZoom(), false),
      });
      expect(mapServiceStub.updateMinZoom).toHaveBeenCalledWith(6);
    });

    it('should update minpitch', async () => {
      componentRef.setInput('minPitch', 15);
      fixture.detectChanges();

      await component.ngOnChanges({
        minPitch: new SimpleChange(null, component.minPitch(), false),
      });
      expect(mapServiceStub.updateMinPitch).toHaveBeenCalledWith(15);
    });

    it('should update maxpitch', async () => {
      componentRef.setInput('maxPitch', 25);
      fixture.detectChanges();

      await component.ngOnChanges({
        maxPitch: new SimpleChange(null, component.maxPitch(), false),
      });
      expect(mapServiceStub.updateMaxPitch).toHaveBeenCalledWith(25);
    });
  });
});
