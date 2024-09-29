import { Component, signal } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { of } from "rxjs";
import { MapService } from "../../map/map.service";
import { GeoJSONSourceComponent } from "./geojson-source.component";

const getMapServiceStub = () =>
    jasmine.createSpyObj(
      [
        'addSource',
        'removeSource'
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

@Component({
    template: `
        @if (show()) {
            <mgl-geojson-source id="123"></mgl-geojson-source>
        }
    `,
    standalone: true,
    imports: [GeoJSONSourceComponent]
})
class GeoJSONSourceTestComponent {
    private show = signal<boolean>(true);

    public toggle() {
        this.show.set(!this.show());
    }
}

describe('GeoJSONSourceComponent', () => {
  let mapServiceStub: jasmine.SpyObj<MapService>;
  let component: GeoJSONSourceTestComponent;
  let fixture: ComponentFixture<GeoJSONSourceTestComponent>;

  beforeEach(waitForAsync(() => {
    mapServiceStub = getMapServiceStub();

    TestBed.configureTestingModule({
      imports: [GeoJSONSourceTestComponent],
      providers: [{ provide: MapService, useValue: mapServiceStub }],
    })
      .overrideComponent(GeoJSONSourceTestComponent, {
        set: {
          providers: [{ provide: MapService, useValue: mapServiceStub }],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoJSONSourceTestComponent);
    component = fixture.componentInstance;
  });

  describe('Init/Destroy tests', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should call add source when init', () => {
        expect(mapServiceStub.addSource).toHaveBeenCalled();
    });

    it('should remove source on destroy', () => {
        component.toggle();
        fixture.detectChanges();
        expect(mapServiceStub.removeSource).toHaveBeenCalled();
      });
  });
});