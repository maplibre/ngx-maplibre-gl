import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  createComponent,
  inputBinding,
  provideZonelessChangeDetection,
} from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { MapComponent } from "./map.component";
import { MapService } from "./map.service";

export const getMapServiceStub = () => ({
  setup: vi.fn(),
  updateMinZoom: vi.fn(),
  updateMaxPitch: vi.fn(),
  updateMinPitch: vi.fn(),
  destroyMap: vi.fn(),
  clearMapElements: vi.fn(),

  mapCreated$: of(true),
});

describe("MapComponent", () => {
  let mapServiceStub: ReturnType<typeof getMapServiceStub>;
  let component: MapComponent;
  let componentRef: ComponentRef<MapComponent>;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    mapServiceStub = getMapServiceStub();

    await TestBed.configureTestingModule({
      imports: [MapComponent],
      providers: [provideZonelessChangeDetection()],
    }).overrideComponent(MapComponent, {
      set: {
        providers: [{ provide: MapService, useValue: mapServiceStub }],
      },
    });
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.debugElement.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput("mapStyle", "mapStyle");

    await fixture.whenStable();
    fixture.detectChanges();
  });

  describe("Init tests", () => {
    it("should init with custom inputs", () => {
      // Since we don't want to trigger afterNextRender, we need to create the component in a different way
      const ref = createComponent(MapComponent, {
        environmentInjector: TestBed.inject(EnvironmentInjector),
        bindings: [inputBinding("mapStyle", () => "mapStyle")],
      });
      mapServiceStub.setup.mockClear();
      fixture.detectChanges();

      TestBed.inject(ApplicationRef).attachView(ref.hostView);
      expect(mapServiceStub.setup).toHaveBeenCalledTimes(0);

      TestBed.inject(ApplicationRef).tick();

      expect(mapServiceStub.setup).toHaveBeenCalledTimes(1);

      expect(mapServiceStub.setup.mock.calls[0][0].mapOptions.style).toEqual(
        "mapStyle"
      );
    });
  });

  describe("Change tests", () => {
    it("should update minzoom", async () => {
      componentRef.setInput("minZoom", 6);

      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(mapServiceStub.updateMinZoom).toHaveBeenCalledWith(6);
    });

    it("should update minpitch", async () => {
      componentRef.setInput("minPitch", 15);
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(mapServiceStub.updateMinPitch).toHaveBeenCalledWith(15);
    });

    it("should update maxpitch", async () => {
      componentRef.setInput("maxPitch", 25);
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(mapServiceStub.updateMaxPitch).toHaveBeenCalledWith(25);
    });
  });
});
