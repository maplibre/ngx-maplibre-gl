import { Component, OnInit, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'showcase-root',
  template: `<router-outlet></router-outlet>`,
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
  private iconRegistry = inject(MatIconRegistry);
  private sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    this.iconRegistry.addSvgIcon(
      'ngx-maplibre-gl',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'assets/ngx-maplibre-gl.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'ngx-maplibre-gl-red',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'assets/ngx-maplibre-gl-red.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'github',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/github.svg')
    );
  }
}
