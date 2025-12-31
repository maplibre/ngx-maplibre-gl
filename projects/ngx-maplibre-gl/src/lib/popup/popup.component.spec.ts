import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { MapService } from "../map/map.service";
import { MarkerComponent } from "../marker/marker.component";
import { PopupComponent } from "./popup.component";

export const getMapServiceStub = () => ({
  addMarker: vi.fn(),
  removeMarker: vi.fn(),
  removePopupFromMap: vi.fn(),
  createPopup: vi.fn(),
  addPopupToMarker: vi.fn(),

  mapCreated$: of(true),
});

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

describe("PopupComponent", () => {
  let mapServiceStub: ReturnType<typeof getMapServiceStub>;
  let component: MarkerPopupTestComponent;
  let fixture: ComponentFixture<MarkerPopupTestComponent>;

  beforeEach(async () => {
    mapServiceStub = getMapServiceStub();
    mapServiceStub.createPopup.mockReturnValue({});
    mapServiceStub.addMarker.mockReturnValue({});
    await TestBed.configureTestingModule({
      imports: [MarkerPopupTestComponent],
    }).overrideComponent(MarkerPopupTestComponent, {
      set: {
        providers: [{ provide: MapService, useValue: mapServiceStub }],
      },
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerPopupTestComponent);
    component = fixture.componentInstance;
  });

  describe("Init/Destroy tests", () => {
    it("should remove the popup when marker is removed", () => {
      fixture.detectChanges();
      component.show.set(false);
      fixture.detectChanges();
      expect(mapServiceStub.removePopupFromMap).toHaveBeenCalled();
    });
  });
});
