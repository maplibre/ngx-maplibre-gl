import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PointLike } from "maplibre-gl";
import { of } from "rxjs";
import { MapService } from "../map/map.service";
import { MarkerComponent } from "./marker.component";

export const getMapServiceStub = () => ({
  addMarker: vi.fn(),
  removeMarker: vi.fn(),

  mapCreated$: of(true),
});

@Component({
  template: `
    <mgl-marker [offset]="offset" [lngLat]="lngLat" [className]="className">
      ...
    </mgl-marker>
  `,
  imports: [MarkerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class MarkerTestComponent {
  offset: PointLike;
  lngLat: [number, number];
  className: string;
}

describe("MarkerComponent", () => {
  let mapServiceStub: ReturnType<typeof getMapServiceStub>;
  let component: MarkerTestComponent;
  let fixture: ComponentFixture<MarkerTestComponent>;

  beforeEach(async () => {
    mapServiceStub = getMapServiceStub();

    await TestBed.configureTestingModule({
      imports: [MarkerTestComponent],
    }).overrideComponent(MarkerTestComponent, {
      set: {
        providers: [{ provide: MapService, useValue: mapServiceStub }],
      },
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerTestComponent);
    component = fixture.componentInstance;
  });

  describe("Init/Destroy tests", () => {
    it("should init with custom inputs", () => {
      component.lngLat = [-61, -15];
      fixture.detectChanges();
      expect(mapServiceStub.addMarker).toHaveBeenCalled();
    });

    it("should remove marker on destroy", () => {
      fixture.destroy();
      expect(mapServiceStub.removeMarker).toHaveBeenCalled();
    });

    it("should apply classes", () => {
      component.className = "my-class1 my-class2";
      fixture.detectChanges();
      const classes = (fixture.nativeElement as HTMLElement).querySelector(
        "mgl-marker > div"
      )!.classList;
      expect(classes).toContain("my-class1");
      expect(classes).toContain("my-class2");
    });
  });
});
