import { Routes } from '@angular/router';
import { StackblitzEditGuard } from './stackblitz-edit/stackblitz-edit-guard.service';

export enum Category {
  STYLES = 'Styles',
  LAYERS = 'Layers',
  SOURCES = 'Sources',
  USER_INTERACTION = 'User interaction',
  CAMERA = 'Camera',
  CONTROLS_AND_OVERLAYS = 'Controls and overlays',
  TERRAIN = '3D Terrain',
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
        data: { label: 'Display a map', cat: Category.STYLES },
      },
      {
        path: 'custom-style-id',
        loadComponent: () =>
          import('./examples/custom-style-id.component').then(
            (m) => m.CustomStyleIdComponent
          ),
        data: {
          label: 'Display a map with a custom style',
          cat: Category.STYLES,
        },
      },
      {
        path: 'set-style',
        loadComponent: () =>
          import('./examples/set-style.component').then(
            (m) => m.SetStyleComponent
          ),
        data: { label: "Change a map's style", cat: Category.STYLES },
      },
      {
        path: 'satellite-map',
        loadComponent: () =>
          import('./examples/satellite-map.component').then(
            (m) => m.SatelliteMapComponent
          ),
        data: { label: 'Display a satellite map', cat: Category.STYLES },
      },
      {
        path: 'add-image-generated',
        loadComponent: () =>
          import('./examples/add-image-generated.component').then(
            (m) => m.AddImageGeneratedComponent
          ),
        data: {
          label: 'Add a generated icon to the map',
          cat: Category.LAYERS,
        },
      },
      {
        path: 'add-image',
        loadComponent: () =>
          import('./examples/add-image.component').then(
            (m) => m.AddImageComponent
          ),
        data: { label: 'Add an icon to the map', cat: Category.LAYERS },
      },
      {
        path: 'toggle-layers',
        loadComponent: () =>
          import('./examples/toggle-layers.component').then(
            (m) => m.ToggleLayersComponent
          ),
        data: { label: 'Show and hide layers', cat: Category.LAYERS },
      },
      {
        path: '3d-buildings',
        loadComponent: () =>
          import('./examples/3d-buildings.component').then(
            (m) => m.Display3dBuildingsComponent
          ),
        data: { label: 'Display 3d buildings', cat: Category.LAYERS },
      },
      {
        path: 'cluster',
        loadComponent: () =>
          import('./examples/cluster.component').then(
            (m) => m.ClusterComponent
          ),
        data: { label: 'Create and style clusters', cat: Category.LAYERS },
      },
      {
        path: 'heatmap',
        loadComponent: () =>
          import('./examples/heatmap.component').then(
            (m) => m.HeatMapComponent
          ),
        data: { label: 'Create a heatmap layer', cat: Category.LAYERS },
      },
      {
        path: 'geojson-line',
        loadComponent: () =>
          import('./examples/geojson-line.component').then(
            (m) => m.GeoJSONLineComponent
          ),
        data: { label: 'Add a GeoJSON line', cat: Category.LAYERS },
      },
      {
        path: 'ngx-geojson-line',
        loadComponent: () =>
          import('./examples/ngx-geojson-line.component').then(
            (m) => m.NgxGeoJSONLineComponent
          ),
        data: { label: '[NGX] Add a GeoJSON line', cat: Category.LAYERS },
      },
      {
        path: 'custom-marker-icons',
        loadComponent: () =>
          import('./examples/custom-marker-icons.component').then(
            (m) => m.CustomMarkerIconsComponent
          ),
        data: {
          label: 'Add custom icons with Markers',
          cat: Category.CONTROLS_AND_OVERLAYS,
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
          cat: Category.CONTROLS_AND_OVERLAYS,
        },
      },
      {
        path: 'live-update-feature',
        loadComponent: () =>
          import('./examples/live-update-feature.component').then(
            (m) => m.LiveUpdateFeatureComponent
          ),
        data: { label: 'Update a feature in realtime', cat: Category.SOURCES },
      },
      {
        path: 'live-update-image-source',
        loadComponent: () =>
          import('./examples/live-update-image-srource.component').then(
            (m) => m.LiveUpdateImageSourceComponent
          ),
        data: {
          label: 'Update an image source in realtime',
          cat: Category.SOURCES,
        },
      },
      {
        path: 'popup',
        loadComponent: () =>
          import('./examples/popup.component').then((m) => m.PopupComponent),
        data: { label: 'Display a popup', cat: Category.CONTROLS_AND_OVERLAYS },
      },
      {
        path: 'set-popup',
        loadComponent: () =>
          import('./examples/set-popup.component').then(
            (m) => m.SetPopupComponent
          ),
        data: {
          label: 'Attach a popup to a marker instance',
          cat: Category.CONTROLS_AND_OVERLAYS,
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
          cat: Category.CONTROLS_AND_OVERLAYS,
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
          cat: Category.CONTROLS_AND_OVERLAYS,
        },
      },
      {
        path: 'locate-user',
        loadComponent: () =>
          import('./examples/locate-user.component').then(
            (m) => m.LocateUserComponent
          ),
        data: { label: 'Locate the user', cat: Category.CONTROLS_AND_OVERLAYS },
      },
      {
        path: 'attribution-position',
        loadComponent: () =>
          import('./examples/attribution-position.component').then(
            (m) => m.AttributionPositionComponent
          ),
        data: {
          label: 'Change the default position for attribution',
          cat: Category.CONTROLS_AND_OVERLAYS,
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
          cat: Category.CONTROLS_AND_OVERLAYS,
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
          cat: Category.CONTROLS_AND_OVERLAYS,
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
          cat: Category.USER_INTERACTION,
        },
      },
      {
        path: 'language-switch',
        loadComponent: () =>
          import('./examples/language-switch.component').then(
            (m) => m.LanguageSwitchComponent
          ),
        data: {
          label: "Change a map's language",
          cat: Category.USER_INTERACTION,
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
          cat: Category.USER_INTERACTION,
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
          cat: Category.USER_INTERACTION,
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
          cat: Category.USER_INTERACTION,
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
          cat: Category.USER_INTERACTION,
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
          cat: Category.CONTROLS_AND_OVERLAYS,
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
          cat: Category.USER_INTERACTION,
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
          cat: Category.LAYERS,
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
          cat: Category.LAYERS,
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
          cat: Category.CONTROLS_AND_OVERLAYS,
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
          cat: Category.STYLES,
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
          cat: Category.CONTROLS_AND_OVERLAYS,
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
          cat: Category.CONTROLS_AND_OVERLAYS,
        },
      },
      {
        path: 'marker-alignment',
        loadComponent: () =>
          import('./examples/marker-alignment.component').then(
            (m) => m.MarkerAlignmentComponent
          ),
        data: { label: 'Marker alignment options', cat: Category.CAMERA },
      },
      {
        path: 'terrain-style',
        loadComponent: () =>
          import('./examples/terrain-map-style.component').then(
            (m) => m.TerrainMapStyleComponent
          ),
        data: {
          label: 'Initialize 3D Terrain using style',
          cat: Category.TERRAIN,
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
          cat: Category.TERRAIN,
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
          cat: Category.TERRAIN,
        },
      },
      { path: '**', redirectTo: 'display-map' },
    ],
  },
];
