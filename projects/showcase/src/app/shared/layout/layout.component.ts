import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  template: `
    <mat-toolbar color="primary">
      <div>
        <div id="layout-left-custom-items"></div>
        <a mat-icon-button routerLink="/">
          <mat-icon svgIcon="ngx-maplibre-gl"></mat-icon>
        </a>
        <a mat-button routerLink="/" class="library-name"> ngx-maplibre-gl </a>
        <div class="menu-items">
        @for (link of links; track link) {
          @if (link.routerLink) {
            <a mat-button [routerLink]="link.url">{{link.label}}</a>
          } @else {
            <a mat-button [href]="link.url">{{link.label}}</a>
          }
        }
        </div>
      </div>
      <div>
        <div id="layout-right-custom-items"></div>
        <a mat-icon-button href="https://github.com/maplibre/ngx-maplibre-gl">
          <mat-icon svgIcon="github"></mat-icon>
        </a>
        <button
          class="mobile-menu-button"
          mat-icon-button
          type="button"
          aria-label="Mobile menu"
          [matMenuTriggerFor]="mobileMenu"
        >
          <mat-icon>more_vert</mat-icon>
        </button>

        <mat-menu #mobileMenu="matMenu">
        @for (link of links; track link) {
          @if (link.routerLink) {
            <a mat-menu-item [routerLink]="link.url">{{link.label}}</a>
          } @else {
            <a mat-menu-item [href]="link.url">{{link.label}}</a>
          }
        }
        </mat-menu>
      </div>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 100vh;
      }

      mat-toolbar {
        display: flex;
        justify-content: space-between;
        padding: 0 8px 0 0;
      }

      div {
        display: flex;
        height: 100%;
        align-items: center;
      }

      .menu-button {
        height: 100%;
      }

      .menu-items {
        display: none;
      }

      .library-name {
        display: none;
      }

      @media (min-width: 640px) {
        .menu-items {
          display: flex;
        }

        .library-name {
          display: flex;
        }

        .mobile-menu-button {
          display: none;
        }
      }
    `,
  ],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    RouterOutlet,
    MatMenuModule,
  ],
})
export class LayoutComponent {
  links = [{
    url: '/demo',
    routerLink: true,
    label: 'Examples'
  },
  {
    url: 'https://www.maplibre.org/ngx-maplibre-gl/API/',
    routerLink: false,
    label: 'API'
  },
  ]
}
