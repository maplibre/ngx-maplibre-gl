/// <reference types="cypress" />
import { PNG } from 'pngjs';

export class E2eDriver {
  width: number;
  height: number;
  images: Buffer[] = [];

  public toImageBitmapBuffer(canvas: HTMLCanvasElement) {
    const base64 = canvas.toDataURL('image/png').replace(/data:.*;base64,/, '');
    const buff = Cypress.Buffer.from(base64, 'base64');
    const png = PNG.sync.read(buff as any);
    return png.data;
  }

  public getImageBitmapBuffer() {
    return this.images[this.images.length - 1];
  }

  public addImage() {
    return cy
      .get('canvas')
      .then((c) => {
        this.images.push(this.toImageBitmapBuffer(c[0]));
        return this.getImageBitmapBuffer();
      })
      .should('not.be.null');
  }

  public storeCanvasWidth() {
    return cy
      .get('canvas')
      .then((c) => {
        this.width = c[0].width;
        return this.width;
      })
      .should('be.greaterThan', 0);
  }

  public storeCanvasHeight() {
    return cy
      .get('canvas')
      .then((c) => {
        this.height = c[0].height;
        return this.height;
      })
      .should('be.greaterThan', 0);
  }
}
