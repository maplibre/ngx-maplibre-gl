import { ComponentRef, SimpleChange } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  waitForAsync,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { MapService } from '../map/map.service';
import { LayerComponent } from './layer.component';

const getMapServiceStub = () =>
  jasmine.createSpyObj(
    [
      'addLayer',
      'removeLayer',
      'removeSource',
      'getSource',
      'setLayerZoomRange',
    ],
    {
      mapLoaded$: of(true),
      mapInstance: new (class {
        on() {}
        off() {}
        getLayer() {}
      })(),
    }
  );

describe('LayerComponent', () => {
  let mapServiceStub: jasmine.SpyObj<MapService>;
  let component: LayerComponent;
  let componentRef: ComponentRef<LayerComponent>;
  let fixture: ComponentFixture<LayerComponent>;

  beforeEach(waitForAsync(() => {
    mapServiceStub = getMapServiceStub();

    TestBed.configureTestingModule({
      imports: [LayerComponent],
      providers: [{ provide: MapService, useValue: mapServiceStub }],
    })
      .overrideComponent(LayerComponent, {
        set: {
          providers: [{ provide: MapService, useValue: mapServiceStub }],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('id', 'layerId');
    componentRef.setInput('type', 'background');
  });

  describe('Init/Destroy tests without Source', () => {
    beforeEach(() => {
      componentRef.setInput('id', 'layerId');
      componentRef.setInput('type', 'background');
      // eslint-disable-next-line @typescript-eslint/naming-convention
      componentRef.setInput('paint', { 'background-color': 'green' });
      fixture.detectChanges();
    });

    it('should init with custom inputs', () => {
      fixture.detectChanges();

      expect(mapServiceStub.addLayer).toHaveBeenCalledWith(
        jasmine.objectContaining({
          layerOptions: {
            type: 'background',
            id: 'layerId',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            paint: { 'background-color': 'green' },
            source: undefined,
            metadata: undefined,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'source-layer': undefined,
            minzoom: undefined,
            maxzoom: undefined,
            filter: undefined,
            layout: undefined,
          },
          layerEvents: jasmine.anything(),
        }),
        true,
        undefined
      );
    });

    it('should remove layer on destroy', () => {
      component.ngOnDestroy();
      expect(mapServiceStub.removeLayer).toHaveBeenCalledWith(component.id());
    });
  });

  describe('Destroy tests with source', () => {
    beforeEach(() => {
      componentRef.setInput('id', 'layerId');
      componentRef.setInput('type', 'background');
      // eslint-disable-next-line @typescript-eslint/naming-convention
      componentRef.setInput('paint', { 'background-color': 'green' });
      componentRef.setInput('removeSource', true);
      mapServiceStub.getSource.and.returnValues(
        undefined as any,
        component.id() as any,
        {} as any
      );
      fixture.detectChanges();
    });

    it('should remove layer and source on destroy', fakeAsync(() => {
      fixture.detectChanges();
      component.ngOnDestroy();
      expect(mapServiceStub.removeLayer).toHaveBeenCalledWith(component.id());
      expect(mapServiceStub.removeSource).toHaveBeenCalled();
    }));
  });

  it('should not remove layer on destroy if not added', () => {
    component.ngOnDestroy();
    expect(mapServiceStub.removeLayer).not.toHaveBeenCalled();
  });

  describe('Change tests', () => {
    beforeEach(() => {
      componentRef.setInput('id', 'layerId');
      componentRef.setInput('type', 'background');
      componentRef.setInput('minzoom', 10);
      fixture.detectChanges();
    });

    it('should update minzoom', () => {
      component.ngOnChanges({
        minzoom: new SimpleChange(null, component.minzoom(), false),
      });
      expect(mapServiceStub.setLayerZoomRange).toHaveBeenCalledWith(
        component.id(),
        component.minzoom(),
        undefined
      );
    });
  });
});
