import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { MapService } from "../../map/map.service";
import { GeoJSONSourceComponent } from "./geojson-source.component";

export const getMapServiceStub = () => ({
  addSource: vi.fn(),
  removeSource: vi.fn(),

  mapLoaded$: of(true),
  mapInstance: {
    on: vi.fn(),
    off: vi.fn(),
    getLayer: vi.fn(),
  },
});

@Component({
  template: `
    @if (show()) {
    <mgl-geojson-source id="123"></mgl-geojson-source>
    }
  `,
  imports: [GeoJSONSourceComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class GeoJSONSourceTestComponent {
  readonly show = signal<boolean>(true);

  public toggle() {
    this.show.set(!this.show());
  }
}

describe("GeoJSONSourceComponent", () => {
  let mapServiceStub: ReturnType<typeof getMapServiceStub>;
  let component: GeoJSONSourceTestComponent;
  let fixture: ComponentFixture<GeoJSONSourceTestComponent>;

  beforeEach(() => {
    mapServiceStub = getMapServiceStub();

    TestBed.configureTestingModule({
      imports: [GeoJSONSourceTestComponent],
      providers: [{ provide: MapService, useValue: mapServiceStub }],
    }).overrideComponent(GeoJSONSourceTestComponent, {
      set: {
        providers: [{ provide: MapService, useValue: mapServiceStub }],
      },
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoJSONSourceTestComponent);
    component = fixture.componentInstance;
  });

  describe("Init/Destroy tests", () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it("should call add source when init", () => {
      expect(mapServiceStub.addSource).toHaveBeenCalled();
    });

    it("should remove source on destroy", () => {
      component.toggle();
      fixture.detectChanges();
      expect(mapServiceStub.removeSource).toHaveBeenCalled();
    });
  });
});
