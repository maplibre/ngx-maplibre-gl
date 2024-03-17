import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatOptionModule } from '@angular/material/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LayoutToolbarMenuComponent } from '../shared/layout/layout-toolbar-menu.component';

@Component({
  template: `
    <iframe src="https://www.maplibre.org/ngx-maplibre-gl/API/modules.html"></iframe>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex: 1;
        overflow: auto;
        justify-content: center;
      }

      iframe {
        width: 60%;
        border: none;
      }
      @media (max-width: 640px) {
        iframe {
          width: 100%;
        }
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
  ],
})
export class DocComponent {
}
