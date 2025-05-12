import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { MapService } from '../map/map.service';
import { MarkerComponent } from '../marker/marker.component';
import { PopupComponent } from './popup.component';

const getMapServiceStub = () =>
  jasmine.createSpyObj(
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
  let mapServiceStub: jasmine.SpyObj<MapService>;
  let component: MarkerPopupTestComponent;
  let fixture: ComponentFixture<MarkerPopupTestComponent>;

  beforeEach(waitForAsync(() => {
    mapServiceStub = getMapServiceStub();
    mapServiceStub.createPopup.and.returnValue({} as any);
    mapServiceStub.addMarker.and.returnValue({} as any);
    TestBed.configureTestingModule({
      imports: [MarkerPopupTestComponent],
    })
      .overrideComponent(MarkerPopupTestComponent, {
        set: {
          providers: [{ provide: MapService, useValue: mapServiceStub }],
        },
      })
      .compileComponents();
  }));

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
