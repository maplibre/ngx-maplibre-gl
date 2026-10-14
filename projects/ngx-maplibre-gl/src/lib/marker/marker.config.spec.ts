import { createSpyObj, type SpyObj } from '../../testing/spy-obj';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MapService } from '../map/map.service';
import { MarkerComponent } from './marker.component';
import { injectMglMarkerConfig, provideMglMarkerConfig } from './marker.config';

const getMapServiceStub = () =>
  createSpyObj<MapService>(
    ['addMarker', 'removeMarker'],
    {
      mapCreated$: of(true),
    }
  );

const markerLevelProperty = '--marker-level';

describe('MarkerComponent with MglMarkerConfig', () => {
  let mapServiceStub: SpyObj<MapService>;
  let fixture: ComponentFixture<MarkerComponent>;
  let component: MarkerComponent;

  beforeEach(async () => {
    mapServiceStub = getMapServiceStub();

    await TestBed.configureTestingModule({
      imports: [MarkerComponent],
      providers: [
        { provide: MapService, useValue: mapServiceStub },
        provideMglMarkerConfig({
          offset: [10, 20],
          anchor: 'top',
          draggable: true,
          className: 'from-config',
          contentStyle: { [markerLevelProperty]: 5 },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MarkerComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('lngLat', [0, 0]);
  });

  it('should apply config defaults to the marker', () => {
    expect(component.offset()).toEqual([10, 20]);
    expect(component.anchor()).toBe('top');
    expect(component.draggable()).toBe(true);
    expect(component.className()).toBe('from-config');
    expect(component.contentStyle()).toEqual({ [markerLevelProperty]: 5 });

    fixture.detectChanges();

    expect(mapServiceStub.addMarker).toHaveBeenCalledWith(
      expect.objectContaining({
        markersOptions: expect.objectContaining({
          offset: [10, 20],
          anchor: 'top',
          draggable: true,
        }),
      })
    );
  });

  it('should let explicit inputs override config defaults', () => {
    fixture.componentRef.setInput('offset', [1, 2]);
    fixture.componentRef.setInput('anchor', 'bottom');
    fixture.componentRef.setInput('className', 'explicit');

    expect(component.offset()).toEqual([1, 2]);
    expect(component.anchor()).toBe('bottom');
    expect(component.className()).toBe('explicit');

    fixture.detectChanges();

    expect(mapServiceStub.addMarker).toHaveBeenCalledWith(
      expect.objectContaining({
        markersOptions: expect.objectContaining({
          offset: [1, 2],
          anchor: 'bottom',
        }),
      })
    );
  });
});

describe('injectMglMarkerConfig', () => {
  it('should fall back to an empty config when none is provided', () => {
    TestBed.configureTestingModule({});

    const config = TestBed.runInInjectionContext(() => injectMglMarkerConfig());

    expect(config).toEqual({});
  });
});
