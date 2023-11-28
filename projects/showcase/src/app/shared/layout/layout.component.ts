import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  template: `
    <mat-toolbar color="primary">
      <div>
        <div id="layout-left-custom-items"></div>
        <a mat-icon-button routerLink="/">
          <mat-icon svgIcon="ngx-maplibre-gl"></mat-icon>
        </a>
        <a mat-button routerLink="/"> ngx-maplibre-gl </a>
        <a mat-button routerLink="/demo"> Demo </a>
        <a mat-button routerLink="/doc"> Documentation </a>
      </div>
      <div>
        <div id="layout-right-custom-items"></div>
        <a mat-button href="https://github.com/maplibre/ngx-maplibre-gl">
          Github
        </a>
        <a mat-icon-button href="https://github.com/maplibre/ngx-maplibre-gl">
          <mat-icon svgIcon="github"></mat-icon>
        </a>
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
        padding: 0 16px 0 0;
      }

      div {
        display: flex;
        height: 100%;
        align-items: center;
      }

      .menu-button {
        height: 100%;
      }
    `,
  ],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    RouterOutlet,
  ],
})
export class LayoutComponent {}
