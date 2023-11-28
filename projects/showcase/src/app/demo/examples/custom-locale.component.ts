import { Component } from '@angular/core';
import {
  MapComponent,
  ControlComponent,
  FullscreenControlDirective,
  GeolocateControlDirective,
  NavigationControlDirective,
  ScaleControlDirective,
} from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [center]="[36.235656, 50.00387]"
      [zoom]="[11.15]"
      [locale]="locale"
      [preserveDrawingBuffer]="true"
    >
      <mgl-control mglFullscreen position="top-left"></mgl-control>
      <mgl-control mglGeolocate position="top-left"></mgl-control>
      <mgl-control mglNavigation position="top-left"></mgl-control>
      <mgl-control mglScale></mgl-control>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  standalone: true,
  imports: [
    MapComponent,
    ControlComponent,
    FullscreenControlDirective,
    GeolocateControlDirective,
    NavigationControlDirective,
    ScaleControlDirective,
  ],
})
export class CustomLocaleComponent {
  readonly locale = {
    'FullscreenControl.Enter': 'Перейти в повноекранний режим',
    'FullscreenControl.Exit': 'Вийти з повноекранного режиму',
    'GeolocateControl.FindMyLocation': 'Знайти моє місцеположення',
    'GeolocateControl.LocationNotAvailable': 'Місцеположення недоступне',
    'LogoControl.Title': 'Лого Mapbox',
    'NavigationControl.ResetBearing': 'Cкинути компас',
    'NavigationControl.ZoomIn': 'Наблизити',
    'NavigationControl.ZoomOut': 'Віддалити',
    'ScaleControl.Feet': 'ф',
    'ScaleControl.Meters': 'м',
    'ScaleControl.Kilometers': 'км',
    'ScaleControl.Miles': 'ми',
    'ScaleControl.NauticalMiles': 'нм',
  };
}
