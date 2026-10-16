import { createSpyObj, type SpyObj } from '../../testing/spy-obj';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NEVER } from 'rxjs';
import { MapService } from '../map/map.service';
import { MarkersForClustersComponent } from './markers-for-clusters.component';

const getMapServiceStub = () =>
  createSpyObj<MapService>([], {
    mapCreated$: NEVER,
    mapLoaded$: NEVER,
  });

describe('MarkersForClustersComponent', () => {
  let mapServiceStub: SpyObj<MapService>;
  let fixture: ComponentFixture<MarkersForClustersComponent>;
  let component: MarkersForClustersComponent;

  const setup = async () => {
    mapServiceStub = getMapServiceStub();

    await TestBed.configureTestingModule({
      imports: [MarkersForClustersComponent],
      providers: [{ provide: MapService, useValue: mapServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(MarkersForClustersComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('source', 'earthquakes');
  };

  it('should keep working without options', async () => {
    await setup();

    expect(component.markerOptions()).toEqual({});
    expect(component.clusterOptions()).toEqual({});
  });

  it('should apply markerOptions to points and clusterMarkerOptions as override', async () => {
    await setup();
    fixture.componentRef.setInput('markerOptions', {
      offset: [1, 2],
      anchor: 'top',
    });
    fixture.componentRef.setInput('clusterMarkerOptions', { anchor: 'bottom' });

    expect(component.markerOptions()).toEqual({ offset: [1, 2], anchor: 'top' });
    expect(component.clusterOptions()).toEqual({
      offset: [1, 2],
      anchor: 'bottom',
    });
  });

  it('should keep markerOptions when only clusterMarkerOptions is set', async () => {
    await setup();
    fixture.componentRef.setInput('markerOptions', { offset: [1, 2] });
    fixture.componentRef.setInput('clusterMarkerOptions', { anchor: 'bottom' });

    expect(component.markerOptions()).toEqual({ offset: [1, 2] });
    expect(component.clusterOptions()).toEqual({
      offset: [1, 2],
      anchor: 'bottom',
    });
  });
});
