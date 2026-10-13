import { createSpyObj, type SpyObj } from '../../testing/spy-obj';
import { Component, signal } from '@angular/core';
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
      <mgl-popup [marker]="myMarker" [contentStyle]="contentStyle">
        Hello from marker!
      </mgl-popup>
    }
  `,
  imports: [MarkerComponent, PopupComponent],
})
class MarkerPopupTestComponent {
  show = signal(true);
  contentStyle: string | Record<string, string | number | null | undefined>;
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

    it('should apply content styles to the popup content element', () => {
      const popupLevelProperty = '--popup-level';
      component.contentStyle = {
        zIndex: 3,
        [popupLevelProperty]: 7,
        color: 'red',
      };
      fixture.detectChanges();
      const wrapper = (fixture.nativeElement as HTMLElement).querySelector(
        'mgl-popup > div'
      ) as HTMLElement;
      expect(wrapper.style.zIndex).toBe('3');
      expect(wrapper.style.getPropertyValue('--popup-level')).toBe('7');
      expect(wrapper.style.color).toBe('red');
    });

    it('should apply content styles given as a css string', () => {
      component.contentStyle = '--popup-level: 8; z-index: 4; color: blue;';
      fixture.detectChanges();
      const wrapper = (fixture.nativeElement as HTMLElement).querySelector(
        'mgl-popup > div'
      ) as HTMLElement;
      expect(wrapper.style.getPropertyValue('--popup-level')).toBe('8');
      expect(wrapper.style.zIndex).toBe('4');
      expect(wrapper.style.color).toBe('blue');
    });
  });
});
