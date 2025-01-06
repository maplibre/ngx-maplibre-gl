import { Routes } from '@angular/router';
import { StackblitzEditGuard } from './stackblitz-edit/stackblitz-edit-guard.service';

export const CATEGORIES = {
  styles: 'Styles',
  layers: 'Layers',
  sources: 'Sources',
  unserInteraction: 'User interaction',
  camera: 'Camera',
  constrolsAndOverlays: 'Controls and overlays',
  terrain: '3D Terrain',
  globe: 'Globe'
}

export const DEMO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./demo-index.component').then((m) => m.DemoIndexComponent),
    children: [
      {
        path: 'edit/:demoUrl',
        loadComponent: () =>
          import('./stackblitz-edit/stackblitz-edit.component').then(
            (m) => m.StackblitzEditComponent
          ),
        canActivate: [StackblitzEditGuard],
      },
      {
        path: 'display-map',
        loadComponent: () =>
          import('./examples/display-map.component').then(
            (m) => m.DisplayMapComponent
          ),
        data: { label: 'Display a map', cat: CATEGORIES.styles },
      },
      {
        path: 'custom-style-id',
        loadComponent: () =>
          import('./examples/custom-style-id.component').then(
            (m) => m.CustomStyleIdComponent
          ),
        data: {
          label: 'Display a map with a custom style',
          cat: CATEGORIES.styles,
        },
      },
      {
        path: 'set-style',
        loadComponent: () =>
          import('./examples/set-style.component').then(
            (m) => m.SetStyleComponent
          ),
        data: { label: 'Change a map\'s style', cat: CATEGORIES.styles },
      },
      {
        path: 'satellite-map',
        loadComponent: () =>
          import('./examples/satellite-map.component').then(
            (m) => m.SatelliteMapComponent
          ),
        data: { label: 'Display a satellite map', cat: CATEGORIES.styles },
      },
      {
        path: 'add-image-generated',
        loadComponent: () =>
          import('./examples/add-image-generated.component').then(
            (m) => m.AddImageGeneratedComponent
          ),
        data: {
          label: 'Add a generated icon to the map',
          cat: CATEGORIES.layers,
        },
      },
      {
        path: 'add-image',
        loadComponent: () =>
          import('./examples/add-image.component').then(
            (m) => m.AddImageComponent
          ),
        data: { label: 'Add an icon to the map', cat: CATEGORIES.layers },
      },
      {
        path: 'toggle-layers',
        loadComponent: () =>
          import('./examples/toggle-layers.component').then(
            (m) => m.ToggleLayersComponent
          ),
        data: { label: 'Show and hide layers', cat: CATEGORIES.layers },
      },
      {
        path: '3d-buildings',
        loadComponent: () =>
          import('./examples/3d-buildings.component').then(
            (m) => m.Display3dBuildingsComponent
          ),
        data: { label: 'Display 3d buildings', cat: CATEGORIES.layers },
      },
      {
        path: 'cluster',
        loadComponent: () =>
          import('./examples/cluster.component').then(
            (m) => m.ClusterComponent
          ),
        data: { label: 'Create and style clusters', cat: CATEGORIES.layers },
      },
      {
        path: 'heatmap',
        loadComponent: () =>
          import('./examples/heatmap.component').then(
            (m) => m.HeatMapComponent
          ),
        data: { label: 'Create a heatmap layer', cat: CATEGORIES.layers },
      },
      {
        path: 'geojson-line',
        loadComponent: () =>
          import('./examples/geojson-line.component').then(
            (m) => m.GeoJSONLineComponent
          ),
        data: { label: 'Add a GeoJSON line', cat: CATEGORIES.layers },
      },
      {
        path: 'ngx-geojson-line',
        loadComponent: () =>
          import('./examples/ngx-geojson-line.component').then(
            (m) => m.NgxGeoJSONLineComponent
          ),
        data: { label: '[NGX] Add a GeoJSON line', cat: CATEGORIES.layers },
      },
      {
        path: 'custom-marker-icons',
        loadComponent: () =>
          import('./examples/custom-marker-icons.component').then(
            (m) => m.CustomMarkerIconsComponent
          ),
        data: {
          label: 'Add custom icons with Markers',
          cat: CATEGORIES.constrolsAndOverlays,
        },
      },
      {
        path: 'ngx-custom-marker-icons',
        loadComponent: () =>
          import('./examples/ngx-custom-marker-icons.component').then(
            (m) => m.NgxCustomMarkerIconsComponent
          ),
        data: {
          label: '[NGX] Add custom icons with Markers',
          cat: CATEGORIES.constrolsAndOverlays,
        },
      },
      {
        path: 'ngx-marker-rotate',
        loadComponent: () =>
          import('./examples/ngx-marker-rotate.component').then(
            (m) => m.NgxMarkerRotateComponent
          ),
        data: {
          label: '[NGX] Add marker and rotate it',
          cat: CATEGORIES.constrolsAndOverlays,
        },
      },
      {
        path: 'live-update-feature',
        loadComponent: () =>
          import('./examples/live-update-feature.component').then(
            (m) => m.LiveUpdateFeatureComponent
          ),
        data: { label: 'Update a feature in realtime', cat: CATEGORIES.sources },
      },
      {
        path: 'live-update-image-source',
        loadComponent: () =>
          import('./examples/live-update-image-srource.component').then(
            (m) => m.LiveUpdateImageSourceComponent
          ),
        data: {
          label: 'Update an image source in realtime',
          cat: CATEGORIES.sources,
        },
      },
      {
        path: 'popup',
        loadComponent: () =>
          import('./examples/popup.component').then((m) => m.PopupComponent),
        data: { label: 'Display a popup', cat: CATEGORIES.constrolsAndOverlays },
      },
      {
        path: 'set-popup',
        loadComponent: () =>
          import('./examples/set-popup.component').then(
            (m) => m.SetPopupComponent
          ),
        data: {
          label: 'Attach a popup to a marker instance',
          cat: CATEGORIES.constrolsAndOverlays,
        },
      },
      {
        path: 'fullscreen',
        loadComponent: () =>
          import('./examples/fullscreen.component').then(
            (m) => m.FullscreenComponent
          ),
        data: {
          label: 'View a fullscreen map',
          cat: CATEGORIES.constrolsAndOverlays,
        },
      },
      {
        path: 'navigation',
        loadComponent: () =>
          import('./examples/navigation.component').then(
            (m) => m.NavigationComponent
          ),
        data: {
          label: 'Display map navigation controls',
          cat: CATEGORIES.constrolsAndOverlays,
        },
      },
      {
        path: 'locate-user',
        loadComponent: () =>
          import('./examples/locate-user.component').then(
            (m) => m.LocateUserComponent
          ),
        data: { label: 'Locate the user', cat: CATEGORIES.constrolsAndOverlays },
      },
      {
        path: 'attribution-position',
        loadComponent: () =>
          import('./examples/attribution-position.component').then(
            (m) => m.AttributionPositionComponent
          ),
        data: {
          label: 'Change the default position for attribution',
          cat: CATEGORIES.constrolsAndOverlays,
        },
      },
      {
        path: 'ngx-scale-control',
        loadComponent: () =>
          import('./examples/ngx-scale-control.component').then(
            (m) => m.NgxScaleControlComponent
          ),
        data: {
          label: '[NGX] Show scale information',
          cat: CATEGORIES.constrolsAndOverlays,
        },
      },
      {
        path: 'ngx-custom-control',
        loadComponent: () =>
          import('./examples/ngx-custom-control.component').then(
            (m) => m.NgxCustomControlComponent
          ),
        data: {
          label: '[NGX] Add a custom control',
          cat: CATEGORIES.constrolsAndOverlays,
        },
      },
      {
        path: 'interactive-false',
        loadComponent: () =>
          import('./examples/interactive-false.component').then(
            (m) => m.InteractiveFalseComponent
          ),
        data: {
          label: 'Display a non-interactive map',
          cat: CATEGORIES.unserInteraction,
        },
      },
      {
        path: 'language-switch',
        loadComponent: () =>
          import('./examples/language-switch.component').then(
            (m) => m.LanguageSwitchComponent
          ),
        data: {
          label: 'Change a map\'s language',
          cat: CATEGORIES.unserInteraction,
        },
      },
      {
        path: 'center-on-symbol',
        loadComponent: () =>
          import('./examples/center-on-symbol.component').then(
            (m) => m.CenterOnSymbolComponent
          ),
        data: {
          label: 'Center the map on a clicked symbol',
          cat: CATEGORIES.unserInteraction,
        },
      },
      {
        path: 'ngx-drag-a-point',
        loadComponent: () =>
          import('./examples/ngx-drag-a-point.component').then(
            (m) => m.NgxDragAPointComponent
          ),
        data: {
          label: '[NGX] Create a draggable point',
          cat: CATEGORIES.unserInteraction,
        },
      },
      {
        path: 'drag-a-marker',
        loadComponent: () =>
          import('./examples/drag-a-marker.component').then(
            (m) => m.DragAMarkerComponent
          ),
        data: {
          label: 'Create a draggable marker',
          cat: CATEGORIES.unserInteraction,
        },
      },
      {
        path: 'hover-styles',
        loadComponent: () =>
          import('./examples/hover-styles.component').then(
            (m) => m.HoverStylesComponent
          ),
        data: {
          label: 'Create a hover effect',
          cat: CATEGORIES.unserInteraction,
        },
      },
      {
        path: 'popup-on-click',
        loadComponent: () =>
          import('./examples/popup-on-click.component').then(
            (m) => m.PopupOnClickComponent
          ),
        data: {
          label: 'Display a popup on click',
          cat: CATEGORIES.constrolsAndOverlays,
        },
      },
      {
        path: 'zoomto-linestring',
        loadComponent: () =>
          import('./examples/zoomto-linestring.component').then(
            (m) => m.ZoomtoLinestringComponent
          ),
        data: {
          label: 'Fit to the bounds of a LineString',
          cat: CATEGORIES.unserInteraction,
        },
      },
      {
        path: 'cluster-html',
        loadComponent: () =>
          import('./examples/cluster-html.component').then(
            (m) => m.ClusterHtmlComponent
          ),
        data: {
          label: 'Display HTML clusters with custom properties',
          cat: CATEGORIES.layers,
        },
      },
      {
        path: 'ngx-cluster-html',
        loadComponent: () =>
          import('./examples/ngx-cluster-html.component').then(
            (m) => m.NgxClusterHtmlComponent
          ),
        data: {
          label: '[NGX] Display HTML clusters with custom properties',
          cat: CATEGORIES.layers,
        },
      },
      {
        path: 'polygon-popup-on-click',
        loadComponent: () =>
          import('./examples/polygon-popup-on-click.component').then(
            (m) => m.PolygonPopupOnClickComponent
          ),
        data: {
          label: 'Show polygon information on click',
          cat: CATEGORIES.constrolsAndOverlays,
        },
      },
      {
        path: 'add-image-missing-generated',
        loadComponent: () =>
          import('./examples/add-image-missing-generated.component').then(
            (m) => m.AddImageMissingGeneratedComponent
          ),
        data: {
          label: 'Generate and add a missing icon to the map',
          cat: CATEGORIES.styles,
        },
      },
      {
        path: 'custom-attribution',
        loadComponent: () =>
          import('./examples/custom-attribution.component').then(
            (m) => m.CustomAttributionComponent
          ),
        data: {
          label: 'Add custom attributions',
          cat: CATEGORIES.constrolsAndOverlays,
        },
      },
      {
        path: 'custom-locale',
        loadComponent: () =>
          import('./examples/custom-locale.component').then(
            (m) => m.CustomLocaleComponent
          ),
        data: {
          label: 'Add custom localization for controls',
          cat: CATEGORIES.constrolsAndOverlays,
        },
      },
      {
        path: 'marker-alignment',
        loadComponent: () =>
          import('./examples/marker-alignment.component').then(
            (m) => m.MarkerAlignmentComponent
          ),
        data: { label: 'Marker alignment options', cat: CATEGORIES.camera },
      },
      {
        path: 'terrain-style',
        loadComponent: () =>
          import('./examples/terrain-map-style.component').then(
            (m) => m.TerrainMapStyleComponent
          ),
        data: {
          label: 'Initialize 3D Terrain using style',
          cat: CATEGORIES.terrain,
        },
      },
      {
        path: 'terrain-control',
        loadComponent: () =>
          import('./examples/ngx-terrain-control.component').then(
            (m) => m.NgxTerrainSourceComponent
          ),
        data: {
          label: 'Terrain Control',
          cat: CATEGORIES.terrain,
        },
      },
      {
        path: 'terrain',
        loadComponent: () =>
          import('./examples/terrain-map.component').then(
            (m) => m.TerrainMapComponent
          ),
        data: {
          label: '[NGX] Initialize 3D Terrain declaratively',
          cat: CATEGORIES.terrain,
        },
      },
      {
        path: 'globe',
        loadComponent: () =>
          import('./examples/globe.component').then(
            (m) => m.GlobeComponent
          ),
        data: {
          label: '[NGX] Initialize Globe Projection declaratively',
          cat: CATEGORIES.globe,
        },
      },
      { path: '**', redirectTo: 'display-map' },
    ],
  },
];
