import { vi } from "vitest";

class Emitter {
  private listeners = new Map<string, Set<(...args: any[]) => void>>();

  on(type: string, cb: (...args: any[]) => void) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type)!.add(cb);
    return this;
  }

  off(type: string, cb: (...args: any[]) => void) {
    this.listeners.get(type)?.delete(cb);
    return this;
  }

  fire(type: string, payload: any = {}) {
    this.listeners.get(type)?.forEach((cb) => cb(payload));
    return this;
  }
}

vi.mock("maplibre-gl", () => {
  class Map extends Emitter {
    private minZoom = 0;
    private minPitch = 0;
    private maxPitch = 60;

    getCanvas() {
      return document.createElement("canvas");
    }

    setMinZoom(v: number) {
      this.minZoom = v;
      return this;
    }
    getMinZoom() {
      return this.minZoom;
    }

    setMinPitch(v: number) {
      this.minPitch = v;
      return this;
    }
    getMinPitch() {
      return this.minPitch;
    }

    setMaxPitch(v: number) {
      this.maxPitch = v;
      return this;
    }
    getMaxPitch() {
      return this.maxPitch;
    }

    queryRenderedFeatures = vi.fn().mockReturnValue([]);

    addLayer = vi.fn();
    removeLayer = vi.fn();
    addSource = vi.fn();
    removeSource = vi.fn();
    getSource = vi.fn();
    getLayer = vi.fn();
    remove = vi.fn();
  }

  class Popup extends Emitter {
    addTo = vi.fn().mockReturnValue(this);
    remove = vi.fn().mockReturnValue(this);
    setLngLat = vi.fn().mockReturnValue(this);
    setDOMContent = vi.fn().mockReturnValue(this);
  }

  return { Map, Popup };
});
