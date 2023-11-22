import { NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './routes';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    MatIconModule,

    RouterModule.forRoot(APP_ROUTES, {}),
  ],
  exports: [],
  providers: [],
})
export class CoreModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'ngx-maplibre-gl',
      sanitizer.bypassSecurityTrustResourceUrl('assets/ngx-maplibre-gl.svg')
    );
    iconRegistry.addSvgIcon(
      'ngx-maplibre-gl-red',
      sanitizer.bypassSecurityTrustResourceUrl('assets/ngx-maplibre-gl-red.svg')
    );
    iconRegistry.addSvgIcon(
      'github',
      sanitizer.bypassSecurityTrustResourceUrl('assets/github.svg')
    );
  }
}
