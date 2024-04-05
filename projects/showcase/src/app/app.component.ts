import { Component, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

import github from '../assets/github.svg';
import logo from '../assets/ngx-maplibre-gl.svg';
import logoRed from '../assets/ngx-maplibre-gl-red.svg';

@Component({
  selector: 'showcase-root',
  template: `<router-outlet></router-outlet>`,
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {
  private iconRegistry = inject(MatIconRegistry);
  private sanitizer = inject(DomSanitizer);

  constructor() {
    this.iconRegistry.addSvgIconLiteral(
      'ngx-maplibre-gl',
      this.sanitizer.bypassSecurityTrustHtml(logo)
    );
    this.iconRegistry.addSvgIconLiteral(
      'ngx-maplibre-gl-red',
      this.sanitizer.bypassSecurityTrustHtml(logoRed)
    );
    this.iconRegistry.addSvgIconLiteral(
      'github',
      this.sanitizer.bypassSecurityTrustHtml(github)
    );
  }
}
