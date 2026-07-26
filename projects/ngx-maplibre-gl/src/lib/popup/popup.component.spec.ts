import { createSpyObj, type SpyObj } from '../../testing/spy-obj';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MapService } from '../map/map.service';
import { MarkerComponent } from '../marker/marker.component';
import { PopupComponent } from './popup.component';

const getMapServiceStub = () =>
  createSpyObj<MapService>(
    [
      'addMarker',
      'removeMarker',
      'removePopupFromMap',
      'createPopup',
      'addPopupToMarker',
    ],
    {
      mapCreated$: of(true),
    }
  );

@Component({
  template: `
    @if (show()) {
      <mgl-marker [lngLat]="[0, 0]" #myMarker> ... </mgl-marker>
      <mgl-popup [marker]="myMarker"> Hello from marker! </mgl-popup>
    }
  `,
  imports: [MarkerComponent, PopupComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class MarkerPopupTestComponent {
  show = signal(true);
}

describe('PopupComponent', () => {
  let mapServiceStub: SpyObj<MapService>;
  let component: MarkerPopupTestComponent;
  let fixture: ComponentFixture<MarkerPopupTestComponent>;

  beforeEach(async () => {
    mapServiceStub = getMapServiceStub();
    mapServiceStub.createPopup.mockReturnValue({} as any);
    mapServiceStub.addMarker.mockReturnValue({} as any);
    await TestBed.configureTestingModule({
      imports: [MarkerPopupTestComponent],
    })
      .overrideComponent(MarkerPopupTestComponent, {
        set: {
          providers: [{ provide: MapService, useValue: mapServiceStub }],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerPopupTestComponent);
    component = fixture.componentInstance;
  });

  describe('Init/Destroy tests', () => {
    it('should remove the popup when marker is removed', () => {
      fixture.detectChanges();
      component.show.set(false)
      fixture.detectChanges();
      expect(mapServiceStub.removePopupFromMap).toHaveBeenCalled();
    });
  });
});
