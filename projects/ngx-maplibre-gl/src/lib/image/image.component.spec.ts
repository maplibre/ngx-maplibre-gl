import { ComponentRef, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { MapService } from '../map/map.service';
import { ImageComponent } from './image.component';

describe('ImageComponent', () => {
  let mapServiceStub: jasmine.SpyObj<MapService>;
  let component: ImageComponent;
  let componentRef: ComponentRef<ImageComponent>;
  let fixture: ComponentFixture<ImageComponent>;

  beforeEach(waitForAsync(() => {
    mapServiceStub = jasmine.createSpyObj(['addImage', 'removeImage'], {
      mapLoaded$: of(true),
      mapInstance: new (class {
        on() {}
        off() {}
        hasImage() {}
      })(),
    });

    TestBed.configureTestingModule({
      imports: [ImageComponent],
    })
      .overrideComponent(ImageComponent, {
        set: {
          providers: [{ provide: MapService, useValue: mapServiceStub }],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('id', 'imageId');
  });

  describe('Init/Destroy tests', () => {
    beforeEach(() => {
      componentRef.setInput('id', 'imageId');
      componentRef.setInput('data', {
        width: 500,
        height: 500,
        data: new Uint8Array([5, 5]),
      });

      fixture.detectChanges();
    });

    it('should init with custom inputs', () => {
      expect(mapServiceStub.addImage).toHaveBeenCalled();
    });

    it('should remove image on destroy', () => {
      component.removeImage();
      expect(mapServiceStub.removeImage).toHaveBeenCalledWith('imageId');
    });
  });

  it('should not remove image on destroy if not added', () => {
    component.removeImage();
    expect(mapServiceStub.removeImage).not.toHaveBeenCalled();
  });

  describe('Change tests', () => {
    beforeEach(() => {
      componentRef.setInput('id', 'layerId');
      componentRef.setInput('data', {
        width: 500,
        height: 500,
        data: new Uint8Array([5, 5]),
      });

      fixture.detectChanges();
    });

    it('should update image', () => {
      component.ngOnChanges({
        data: new SimpleChange(null, component.data(), false),
      });
      expect(mapServiceStub.removeImage).toHaveBeenCalledWith(component.id());
      expect(mapServiceStub.addImage).toHaveBeenCalled();
    });
  });
});
