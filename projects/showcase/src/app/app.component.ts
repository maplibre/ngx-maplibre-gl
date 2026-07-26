import { Component, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

import github from '../assets/github.svg';
import logo from '../assets/ngx-maplibre-gl.svg';

@Component({
  selector: 'showcase-root',
  template: `<router-outlet />`,
  imports: [RouterOutlet],
})
export class AppComponent {
  private readonly iconRegistry = inject(MatIconRegistry);
  private readonly sanitizer = inject(DomSanitizer);

  constructor() {
    this.iconRegistry.addSvgIconLiteral(
      'ngx-maplibre-gl',
      this.sanitizer.bypassSecurityTrustHtml(logo)
    );
    this.iconRegistry.addSvgIconLiteral(
      'github',
      this.sanitizer.bypassSecurityTrustHtml(github)
    );
  }
}
