import { createSpyObj, type SpyObj } from '../../testing/spy-obj';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MapService } from '../map/map.service';
import { PopupComponent } from './popup.component';
import { injectMglPopupConfig, provideMglPopupConfig } from './popup.config';

const getMapServiceStub = () =>
  createSpyObj<MapService>(['createPopup', 'addPopupToMap', 'removePopupFromMap'], {
    mapCreated$: of(true),
  });

describe('PopupComponent with MglPopupConfig', () => {
  let mapServiceStub: SpyObj<MapService>;
  let fixture: ComponentFixture<PopupComponent>;
  let component: PopupComponent;

  beforeEach(async () => {
    mapServiceStub = getMapServiceStub();
    mapServiceStub.createPopup.mockReturnValue({} as any);

    await TestBed.configureTestingModule({
      imports: [PopupComponent],
      providers: [
        { provide: MapService, useValue: mapServiceStub },
        provideMglPopupConfig({
          closeButton: false,
          closeOnClick: false,
          anchor: 'top',
          maxWidth: '320px',
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('lngLat', [0, 0]);
  });

  it('should apply config defaults to the popup', () => {
    expect(component.closeButton()).toBe(false);
    expect(component.closeOnClick()).toBe(false);
    expect(component.anchor()).toBe('top');
    expect(component.maxWidth()).toBe('320px');

    fixture.detectChanges();

    expect(mapServiceStub.createPopup).toHaveBeenCalledWith(
      expect.objectContaining({
        popupOptions: expect.objectContaining({
          closeButton: false,
          closeOnClick: false,
          anchor: 'top',
          maxWidth: '320px',
        }),
      }),
      expect.anything(),
    );
  });

  it('should let explicit inputs override config defaults', () => {
    fixture.componentRef.setInput('closeButton', true);
    fixture.componentRef.setInput('maxWidth', '500px');

    expect(component.closeButton()).toBe(true);
    expect(component.maxWidth()).toBe('500px');
  });
});

describe('injectMglPopupConfig', () => {
  it('should fall back to an empty config when none is provided', () => {
    TestBed.configureTestingModule({});

    const config = TestBed.runInInjectionContext(() => injectMglPopupConfig());

    expect(config).toEqual({});
  });
});
