import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { MatOptionModule } from '@angular/material/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LayoutToolbarMenuComponent } from '../shared/layout/layout-toolbar-menu.component';
import 'prismjs/components/prism-typescript.min.js';

export const VERSIONS = ['main'];

@Component({
  template: `
    <showcase-layout-toolbar-menu position="right">
      <mat-form-field>
        <mat-select
          [(ngModel)]="currentVersion"
          (ngModelChange)="updateDocUrl()"
        >
          <mat-option *ngFor="let version of VERSIONS" [value]="version">
            {{ version }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </showcase-layout-toolbar-menu>
    <markdown [src]="docUrl"></markdown>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex: 1;
        overflow: auto;
        justify-content: center;
      }

      markdown {
        margin: 8px;
        width: 60%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    LayoutToolbarMenuComponent,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    NgFor,
    MatOptionModule,
    MarkdownComponent,
  ],
})
export class DocComponent implements OnInit {
  VERSIONS = VERSIONS;
  currentVersion = 'main';
  docUrl: string;

  ngOnInit() {
    this.updateDocUrl();
  }

  updateDocUrl() {
    this.docUrl = `https://raw.githubusercontent.com/maplibre/ngx-maplibre-gl/${this.currentVersion}/docs/API.md`;
  }
}
