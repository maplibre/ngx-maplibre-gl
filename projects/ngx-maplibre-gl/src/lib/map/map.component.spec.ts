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
      'move',
      'panTo',
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

    /**
     * `move` is only handed the axes that actually changed, so updating one axis
     * cannot drag the others back to their bound values - see ngx-mapbox-gl#2,
     * "Dynamically changing this.center [...] resets the zoom to initial value".
     */
    describe('camera inputs', () => {
      /** `move(movingMethod, movingOptions, zoom, center, bearing, pitch, roll)` */
      const movedWith = () => mapServiceStub.move.mock.calls.at(-1)!;

      it('should not reset zoom when only center changes', async () => {
        componentRef.setInput('zoom', 9);
        componentRef.setInput('center', [1, 2]);
        fixture.detectChanges();

        await component.ngOnChanges({
          center: new SimpleChange([0, 0], component.center(), false),
        });

        expect(mapServiceStub.move).toHaveBeenCalled();
        const [, , zoom, center] = movedWith();
        expect(center).toEqual([1, 2]);
        expect(zoom).toBeUndefined();
      });

      it('should not reset center when only zoom changes', async () => {
        componentRef.setInput('zoom', 9);
        componentRef.setInput('center', [1, 2]);
        fixture.detectChanges();

        await component.ngOnChanges({
          zoom: new SimpleChange(4, component.zoom(), false),
        });

        const [, , zoom, center] = movedWith();
        expect(zoom).toBe(9);
        expect(center).toBeUndefined();
      });

      it('should pass the zoom through as a plain number', async () => {
        componentRef.setInput('zoom', 9);
        fixture.detectChanges();

        await component.ngOnChanges({
          zoom: new SimpleChange(4, component.zoom(), false),
        });

        expect(movedWith()[2]).toBe(9);
      });

      it('should let a two-way binding follow the map, so a previous position can be restored', () => {
        // What the tuple used to buy us: after the user has moved the map, the
        // model holds the map's position rather than the last bound one, so
        // assigning the earlier value is a real change and does move the map.
        componentRef.setInput('zoom', 9);
        fixture.detectChanges();

        component.zoom.set(12);

        expect(component.zoom()).toBe(12);
      });

      it('should pan instead of move when only center changes and centerWithPanTo is set', async () => {
        componentRef.setInput('centerWithPanTo', true);
        componentRef.setInput('center', [1, 2]);
        fixture.detectChanges();

        await component.ngOnChanges({
          center: new SimpleChange([0, 0], component.center(), false),
        });

        expect(mapServiceStub.panTo).toHaveBeenCalled();
        expect(mapServiceStub.move).not.toHaveBeenCalled();
      });
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
