import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ControlComponent, MapComponent } from '@maplibre/ngx-maplibre-gl';
import { Map } from 'maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[2.9]"
      [center]="[16.05, 48]"
      (mapLoad)="mapLoaded($event)"
      [canvasContextAttributes]="{preserveDrawingBuffer: true}"
    >
      <mgl-control>
        <button
          mat-raised-button
          class="lang-button"
          data-cy="lang-button-fr"
          (click)="changeLangTo('fr')"
        >
          French
        </button>
        <button
          mat-raised-button
          class="lang-button"
          data-cy="lang-button-ru"
          (click)="changeLangTo('ru')"
        >
          Russian
        </button>
        <button
          mat-raised-button
          class="lang-button"
          data-cy="lang-button-de"
          (click)="changeLangTo('de')"
        >
          German
        </button>
        <button
          mat-raised-button
          class="lang-button"
          data-cy="lang-button-es"
          (click)="changeLangTo('es')"
        >
          Spanish
        </button>
      </mgl-control>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  preserveWhitespaces: false,
  imports: [MapComponent, ControlComponent, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitchComponent {
  readonly map = signal<Map | null>(null);

  public mapLoaded(map: Map) {
    this.map.set(map);
  }

  changeLangTo(language: string) {
    const map = this.map();
    if (!map) return;
    map.setLayoutProperty(
      'country_1',
      'text-field',
      '{name:' + language + '}',
    );
    map.setLayoutProperty(
      'country_2',
      'text-field',
      '{name:' + language + '}',
    );
    map.setLayoutProperty(
      'country_3',
      'text-field',
      '{name:' + language + '}',
    );
  }
}
