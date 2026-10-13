import { createSpyObj, type SpyObj } from '../../testing/spy-obj';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PointLike } from 'maplibre-gl';
import { of } from 'rxjs';
import { MapService } from '../map/map.service';
import { MarkerComponent } from './marker.component';

const getMapServiceStub = () =>
  createSpyObj<MapService>(
    [
      'addMarker',
      'removeMarker',
    ],
    {
      mapCreated$: of(true),
    }
  );

@Component({
  template: `
    <mgl-marker
      [offset]="offset"
      [lngLat]="lngLat"
      [className]="className"
      [contentStyle]="contentStyle"
    >
      ...
    </mgl-marker>
  `,
  imports: [MarkerComponent],
})
class MarkerTestComponent {
  offset: PointLike;
  lngLat: [number, number];
  className: string;
  contentStyle: string | Record<string, string | number | null | undefined>;
}

describe('MarkerComponent', () => {
  let mapServiceStub: SpyObj<MapService>;
  let component: MarkerTestComponent;
  let fixture: ComponentFixture<MarkerTestComponent>;

  beforeEach(async () => {
    mapServiceStub = getMapServiceStub();

    await TestBed.configureTestingModule({
      imports: [MarkerTestComponent],
    })
      .overrideComponent(MarkerTestComponent, {
        set: {
          providers: [{ provide: MapService, useValue: mapServiceStub }],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerTestComponent);
    component = fixture.componentInstance;
  });

  describe('Init/Destroy tests', () => {
    it('should init with custom inputs', () => {
      component.lngLat = [-61, -15];
      fixture.detectChanges();
      expect(mapServiceStub.addMarker).toHaveBeenCalled();
    });

    it('should remove marker on destroy', () => {
      fixture.destroy();
      expect(mapServiceStub.removeMarker).toHaveBeenCalled();
    });

    it('should apply classes', () => {
      component.className = 'my-class1 my-class2';
      fixture.detectChanges();
      const classes = (fixture.nativeElement as HTMLElement).querySelector(
        'mgl-marker > div'
      )!.classList;
      expect(classes).toContain('my-class1');
      expect(classes).toContain('my-class2');
    });

    it('should apply content styles to the wrapper element', () => {
      const markerLevelProperty = '--marker-level';
      component.contentStyle = {
        zIndex: 3,
        [markerLevelProperty]: 7,
        color: 'red',
      };
      fixture.detectChanges();
      const wrapper = (fixture.nativeElement as HTMLElement).querySelector(
        'mgl-marker > div'
      ) as HTMLElement;
      expect(wrapper.style.zIndex).toBe('3');
      expect(wrapper.style.getPropertyValue('--marker-level')).toBe('7');
      expect(wrapper.style.color).toBe('red');
    });

    it('should apply content styles given as a css string', () => {
      component.contentStyle =
        '--marker-level: 8; z-index: 4; color: blue;';
      fixture.detectChanges();
      const wrapper = (fixture.nativeElement as HTMLElement).querySelector(
        'mgl-marker > div'
      ) as HTMLElement;
      expect(wrapper.style.getPropertyValue('--marker-level')).toBe('8');
      expect(wrapper.style.zIndex).toBe('4');
      expect(wrapper.style.color).toBe('blue');
    });
  });
});
