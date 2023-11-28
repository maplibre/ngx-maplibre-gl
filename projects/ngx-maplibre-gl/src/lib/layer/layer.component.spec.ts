import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { MapService, SetupLayer } from '../map/map.service';
import { LayerComponent } from './layer.component';

describe('LayerComponent', () => {
  class MapServiceSpy {
    addLayer = jasmine.createSpy('addLayer');
    removeLayer = jasmine.createSpy('removeLayer');
    removeSource = jasmine.createSpy('removeSource');
    getSource = jasmine.createSpy('getSource');
    setAllLayerPaintProperty = jasmine.createSpy('setAllPaintProperty');
    mapLoaded$ = of(undefined);
    mapInstance = new (class {
      on() {}
      off() {}
      getLayer() {}
    })();
  }

  let msSpy: MapServiceSpy;
  let component: LayerComponent;
  let fixture: ComponentFixture<LayerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LayerComponent],
    })
      .overrideComponent(LayerComponent, {
        set: {
          providers: [{ provide: MapService, useClass: MapServiceSpy }],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerComponent);
    component = fixture.componentInstance;
    msSpy = fixture.debugElement.injector.get<MapService>(MapService) as any;
    component.id = 'layerId';
  });

  describe('Init/Destroy tests', () => {
    it('should init with custom inputs', (done: DoneFn) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      component.paint = { 'background-color': 'green' };
      component.type = 'background';
      msSpy.addLayer.and.callFake((options: SetupLayer) => {
        expect(options.layerOptions.id).toEqual(component.id);
        expect((options.layerOptions as any).paint['background-color']).toEqual(
          'green'
        );
        done();
      });
      fixture.detectChanges();
    });

    it('should remove layer on destroy', () => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      component.paint = { 'background-color': 'green' };
      fixture.detectChanges();
      component.ngOnDestroy();
      expect(msSpy.removeLayer).toHaveBeenCalledWith(component.id);
    });

    it('should remove layer and source on destroy', () => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      component.paint = { 'background-color': 'green' };
      component.removeSource = true;
      msSpy.getSource.and.returnValues(undefined, component.id, {});
      fixture.detectChanges();
      component.ngOnDestroy();
      expect(msSpy.removeLayer).toHaveBeenCalledWith(component.id);
      expect(msSpy.removeSource).toHaveBeenCalledWith(component.id);
    });

    it('should not remove layer on destroy if not added', () => {
      component.ngOnDestroy();
      expect(msSpy.removeLayer).not.toHaveBeenCalled();
    });
  });

  describe('Change tests', () => {
    it('should update paint', () => {
      component.id = 'layerId';
      component.paint = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'background-color': 'green',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'background-opacity': 0.5,
      };
      fixture.detectChanges();
      component.ngOnChanges({
        paint: new SimpleChange(null, component.paint, false),
      });
      expect(msSpy.setAllLayerPaintProperty).toHaveBeenCalledWith(
        component.id,
        component.paint
      );
    });
  });
});
