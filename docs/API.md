## mgl-map [MapLibre GL API](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Map/)

### Example

```typescript
...
@Component({
  template: `
  <mgl-map
    [style]="'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'"
    [zoom]="[9]"
    [center]="[-74.50, 40]"
    (mapLoad)="map = $event"
  ></mgl-map>
  `,
...
})
export class DisplayMapComponent {
  map: Map; // MapLibre GL Map object (MapLibre is ran outside angular zone, keep that in mind when binding events from this object)
...
}
```

### Inputs

Init only:

- **hash**: `boolean`
- **refreshExpiredTiles**: `boolean`
- **failIfMajorPerformanceCaveat**: `boolean`
- **classes**: `string[]`
- **bearingSnap**: `number`
- **interactive**: `boolean`
- **pitchWithRotate**: `boolean`
- **attributionControl**: `boolean`
- **logoPosition**: `'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'`
- **maxTileCacheSize**: `number`
- **localIdeographFontFamily**: `string`
- **preserveDrawingBuffer**: `boolean`
- **renderWorldCopies**: `boolean`
- **trackResize**: `boolean`
- **transformRequest**: `Function`
- **bounds**: [`LngLatBoundsLike`](https://maplibre.org/maplibre-gl-js/docs/API/types/maplibregl.LngLatLike/) Use **fitBounds** if you want the dynamic version. Use **fitBoundsOptions** to specify bounds options.
- [ngx] **customMapboxApiUrl**: `string` Change url of `mapbox://` (set config.API_URL)

Dynamic:

- **minZoom**: `number`
- **maxZoom**: `number`
- **scrollZoom**: `boolean`
- **dragRotate**: `boolean`
- **touchZoomRotate**: `boolean`
- **doubleClickZoom**: `boolean`
- **keyboard**: `boolean`
- **dragPan**: `boolean`
- **boxZoom**: `boolean`
- **style**: `Style | string`
- **center**: [`LngLatLike`](https://maplibre.org/maplibre-gl-js/docs/API/types/maplibregl.LngLatLike/)
- **maxBounds**: [`LngLatBoundsLike`](https://maplibre.org/maplibre-gl-js/docs/API/types/maplibregl.LngLatBoundsLike/)
- **zoom**: `[number]` The initial zoom level of the map. If zoom is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to 0. [ngx] It's an array in order to be able to force changes (by changing the array ref) because this input can be desync after user manipulation on map.
- **bearing**: `[number]` The initial bearing (rotation) of the map, measured in degrees counter-clockwise from north. If bearing is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to 0. [ngx] It's an array in order to be able to force changes (by changing the array ref) because this input can be desync after user manipulation on map.
- **pitch**: `[number]` The initial pitch (tilt) of the map, measured in degrees away from the plane of the screen (0-60). If pitch is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to 0. [ngx] It's an array in order to be able to force changes (by changing the array ref) because this input can be desync after user manipulation on map.
- **fitBoundsOptions** https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Map/#fitbounds
- [ngx] **fitBounds**: [`LngLatBoundsLike`](https://maplibre.org/maplibre-gl-js/docs/API/types/maplibregl.LngLatBoundsLike/) If set, the map will center on the given coordinates. Dynamic version of **bounds**.
- [ngx] **fitScreenCoordinates**: `[PointLike, PointLike]` https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Map/#fitscreencoordinates (use movingOptions as options)
- [ngx] **movingMethod**: `'jumpTo' | 'easeTo' | 'flyTo'` _(Default: `'flyTo'`)_ Define the method used when changing the center or zoom position.
- [ngx] **movingOptions** Options passed to the moving method (https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Map/#flyto, https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Map/#easeto)
- [ngx] **panToOptions** Options passed to panTo (https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Map/#panto)
- [ngx] **centerWithPanTo**: `boolean` If set to true, then [panTo](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Map/#panto) is used instead of the specified method in **movingMethod** (if only **center** is changed, see live-update-feature example)
- [ngx] **cursorStyle**: `string` change the cursor of the map canvas (`canvas.style.cursor`).
- [ngx] **terrain**: `TerrainSpecification` (requires a raster DEM source, defined either via the `style` or a `mgl-raster-dem-source`).

### Outputs

- **mapResize**: `void`
- **mapRemove**: `void`
- **mapMouseDown**: [`MapMouseEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapMouseEvent/)
- **mapMouseUp**: [`MapMouseEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapMouseEvent/)
- **mapMouseMove**: [`MapMouseEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapMouseEvent/)
- **mapClick**: [`MapMouseEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapMouseEvent/)
- **mapDblClick**: [`MapMouseEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapMouseEvent/)
- **mapMouseEnter**: [`MapMouseEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapMouseEvent/)
- **mapMouseLeave**: [`MapMouseEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapMouseEvent/)
- **mapMouseOver**: [`MapMouseEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapMouseEvent/)
- **mapMouseOut**: [`MapMouseEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapMouseEvent/)
- **mapContextMenu**: [`MapMouseEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapMouseEvent/)
- **mapTouchStart**: [`MapTouchEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapTouchEvent/)
- **mapTouchEnd**: [`MapTouchEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapTouchEvent/)
- **mapTouchMove**: [`MapTouchEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapTouchEvent/)
- **mapTouchCancel**: [`MapTouchEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapTouchEvent/)
- **mapWheel**: [`MapWheelEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapWheelEvent/)
- **moveStart**: [`DragEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent)
- **move**: [`MapTouchEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapTouchEvent/) `|` [`MapMouseEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapMouseEvent/)
- **moveEnd**: [`DragEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent)
- **mapDragStart**: [`DragEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent)
- **mapDrag**: [`MapTouchEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapTouchEvent/) `|` [`MapMouseEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapMouseEvent/)
- **mapDragEnd**: [`DragEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent)
- **zoomStart**: [`MapTouchEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapTouchEvent/) `|` [`MapMouseEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapMouseEvent/)
- **zoomEvt**: [`MapTouchEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapTouchEvent/) `|` [`MapMouseEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapMouseEvent/)
- **zoomEnd**: [`MapTouchEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapTouchEvent/) `|` [`MapMouseEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapMouseEvent/)
- **rotateStart**: [`MapTouchEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapTouchEvent/) `|` [`MapMouseEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapMouseEvent/)
- **rotate**: [`MapTouchEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapTouchEvent/) `|` [`MapMouseEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapMouseEvent/)
- **rotateEnd**: [`MapTouchEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapTouchEvent/) `|` [`MapMouseEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapMouseEvent/)
- **pitchStart**
- **pitchEvt**
- **pitchEnd**
- **boxZoomStart**: [`MapLibreZoomEvent`](https://maplibre.org/maplibre-gl-js/docs/API/types/maplibregl.MapLibreZoomEvent/)
- **boxZoomEnd**: [`MapLibreZoomEvent`](https://maplibre.org/maplibre-gl-js/docs/API/types/maplibregl.MapLibreZoomEvent/)
- **boxZoomCancel**: [`MapLibreZoomEvent`](https://maplibre.org/maplibre-gl-js/docs/API/types/maplibregl.MapLibreZoomEvent/)
- **webGlContextLost**: `void`
- **webGlContextRestored**: `void`
- **mapLoad**: [`Map`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Map/)
- **render**: `void`
- **mapError**
- **data**
- **styleData**
- **sourceData**
- **dataLoading**
- **styleDataLoading**
- **sourceDataLoading**

## mgl-layer [MapLibre GL style spec](https://maplibre.org/maplibre-style-spec/layers/)

### Example

```html
...
<mgl-map ...>
  <mgl-layer
    id="state-borders"
    type="line"
    [source]="states"
    [paint]="{
      'line-color': '#627BC1',
      'line-width': 2
    }"
  ></mgl-layer>
</mgl-map>
```

### Inputs

Init only:

- **id**: `string` _(Required)_
- **source**: `string |`[`Source`](https://maplibre.org/maplibre-style-spec/sources/)
- **type**: `'symbol' | 'fill' | 'line' | 'circle' | 'fill-extrusion' | 'raster' | 'background' | 'heatmap'` _(Required)_
- **metadata**: `any`
- **sourceLayer**: `string`

Dynamic:

- **filter**: `any[]`
- **layout**: [`Layout`](https://maplibre.org/maplibre-style-spec/layers/#layout)
- **paint**: [`Paint`](https://maplibre.org/maplibre-style-spec/layers/#paint)
- **minzoom**: `number`
- **maxzoom**: `number`
- [ngx] **before**: `string` The ID of an existing layer to insert the new layer before. If this argument is omitted, the layer will be appended to the end of the layers array. https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Map/#addlayer

### Outputs

- **layerClick**: [`MapLayerMouseEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapMouseEvent/)
- **layerDblClick**: [`MapLayerMouseEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapMouseEvent/)
- **layerMouseDown**: [`MapLayerMouseEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapMouseEvent/)
- **layerMouseUp**: [`MapLayerMouseEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapMouseEvent/)
- **layerMouseEnter**: [`MapLayerMouseEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapMouseEvent/)
- **layerMouseLeave**: [`MapLayerMouseEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapMouseEvent/)
- **layerMouseMove**: [`MapLayerMouseEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapMouseEvent/)
- **layerMouseOver**: [`MapLayerMouseEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapMouseEvent/)
- **layerMouseOut**: [`MapLayerMouseEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapMouseEvent/)
- **layerContextMenu**: [`MapLayerMouseEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapMouseEvent/)
- **layerTouchStart**: [`MapLayerTouchEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapTouchEvent/)
- **layerTouchEnd**: [`MapLayerTouchEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapTouchEvent/)
- **layerTouchCancel**: [`MapLayerTouchEvent`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.MapTouchEvent/)

## mgl-geojson-source [MapLibre GL style spec](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.GeoJSONSource/)

### Example

```html
...
<mgl-map ...>
  <mgl-geojson-source id="symbols-source">
    <mgl-feature
      *ngFor="let geometry of geometries"
      [geometry]="geometry"
    ></mgl-feature>
  </mgl-geojson-source>
  ...
  <mgl-geojson-source
    id="earthquakes"
    [data]="earthquakes"
    [cluster]="true"
    [clusterMaxZoom]="14"
    [clusterRadius]="50"
  ></mgl-geojson-source>
</mgl-map>
```

### Inputs

Init only:

- **id**: `string` _(Required)_

Dynamic:

- [**data**](https://maplibre.org/maplibre-style-spec/sources/#geojson-data): `GeoJSON.Feature | GeoJSON.FeatureCollection | string` A URL to a GeoJSON file (fastest, because maplibre-gl will download and parse the geojson in a web worker), or inline GeoJSON.
- [**maxzoom**](https://maplibre.org/maplibre-style-spec/sources/#geojson-maxzoom): `number`
- [**buffer**](https://maplibre.org/maplibre-style-spec/sources/#geojson-buffer): `number`
- [**tolerance**](https://maplibre.org/maplibre-style-spec/sources/#geojson-tolerance): `number`
- [**generateId**](https://maplibre.org/maplibre-style-spec/sources/#geojson-generateId): `boolean`
- [**cluster**](https://maplibre.org/maplibre-style-spec/sources/#geojson-cluster): `boolean`
- [**clusterRadius**](https://maplibre.org/maplibre-style-spec/sources/#geojson-clusterRadius): `number`
- [**clusterMaxZoom**](https://maplibre.org/maplibre-style-spec/sources/#geojson-clusterMaxZoom): `number`

## [ngx] mgl-feature (inside mgl-geojson-source only)

Init only:

- **id**: `number`
- **geometry**: `GeoJSON.GeometryObject` _(Required)_
- **properties**: `any`

## mgl-canvas-source [MapLibre GL style spec](https://maplibre.org/maplibre-style-spec/sources/#canvas)

### Inputs

Init only:

- **id**: `string` _(Required)_

Dynamic:

- [**coordinates**](https://maplibre.org/maplibre-style-spec/sources/#canvas-coordinates): `number[][]`
- [**canvas**](https://maplibre.org/maplibre-style-spec/sources/#canvas-canvas): `string`
- [**animate**](https://maplibre.org/maplibre-style-spec/sources/#canvas-animate): `boolean`

## mgl-image-source [MapLibre GL style spec](https://maplibre.org/maplibre-style-spec/sources/#image)

### Inputs

Init only:

- **id**: `string` _(Required)_

Dynamic:

- [**url**](https://maplibre.org/maplibre-style-spec/sources/#image-url): `string`
- [**coordinates**](https://maplibre.org/maplibre-style-spec/sources/#image-coordinates): `number[][]`

## mgl-raster-source [MapLibre GL style spec](https://maplibre.org/maplibre-style-spec/sources/#raster)

### Inputs

Init only:

- **id**: `string` _(Required)_

Dynamic:

- [**url**](https://maplibre.org/maplibre-style-spec/sources/#raster-url): `string`
- [**tiles**](https://maplibre.org/maplibre-style-spec/sources/#raster-tiles): `string[]`
- [**bounds**](https://maplibre.org/maplibre-style-spec/sources/#raster-bounds): `number[]`
- [**minzoom**](https://maplibre.org/maplibre-style-spec/sources/#raster-minzoom): `number`
- [**maxzoom**](https://maplibre.org/maplibre-style-spec/sources/#raster-maxzoom): `number`
- [**tileSize**](https://maplibre.org/maplibre-style-spec/sources/#raster-tileSize): `number`

## mgl-raster-dem-source [MapLibre GL style spec](https://maplibre.org/maplibre-style-spec/sources/#raster-dem)

### Inputs

Init only:

- **id**: `string` _(Required)_

Dynamic:

- [**url**](https://maplibre.org/maplibre-style-spec/sources/#raster-dem-url): `string`
- [**tiles**](https://maplibre.org/maplibre-style-spec/sources/#raster-dem-tiles): `string[]`
- [**bounds**](https://maplibre.org/maplibre-style-spec/sources/#raster-dem-bounds): `number[]`
- [**minzoom**](https://maplibre.org/maplibre-style-spec/sources/#raster-dem-minzoom): `number`
- [**maxzoom**](https://maplibre.org/maplibre-style-spec/sources/#raster-dem-maxzoom): `number`
- [**tileSize**](https://maplibre.org/maplibre-style-spec/sources/#raster-dem-tileSize): `number`
- [**attribution**](https://maplibre.org/maplibre-style-spec/sources/#raster-dem-attribution): `string`
- [**encoding**](https://maplibre.org/maplibre-style-spec/sources/#raster-dem-encoding): `'mapbox' | 'terrarium'` _(Default: `'mapbox'`)_

## mgl-vector-source [MapLibre GL style spec](https://maplibre.org/maplibre-style-spec/sources/#vector)

### Inputs

Init only:

- **id**: `string` _(Required)_

Dynamic:

- [**url**](https://maplibre.org/maplibre-style-spec/sources/#vector-url): `string`
- [**tiles**](https://maplibre.org/maplibre-style-spec/sources/#vector-tiles): `string[][]`
- [**bounds**](https://maplibre.org/maplibre-style-spec/sources/#vector-bounds): `number[]`
- [**minzoom**](https://maplibre.org/maplibre-style-spec/sources/#vector-minzoom): `number`
- [**maxzoom**](https://maplibre.org/maplibre-style-spec/sources/#vector-maxzoom): `number`

## mgl-video-source [MapLibre GL style spec](https://maplibre.org/maplibre-style-spec/sources/#video)

### Inputs

Init only:

- **id**: `string` _(Required)_

Dynamic:

- [**urls**](https://maplibre.org/maplibre-style-spec/sources/#video-urls): `string[]`
- [**coordinates**](https://maplibre.org/maplibre-style-spec/sources/#video-coordinates): `number[][]`

## mgl-image [MapLibre GL API](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Map/#addimage)

### Example

```html
...
<mgl-map
  ...
>
   <mgl-image
     id="image"
     url="https://..."
     (imageLoaded)="imageLoaded = true"
   >
   ...
   <mgl-image
     id="image2"
     [data]="{
       width: 64,
       height: 64,
       data: imageData
     }"
   >
</mgl-map>
...
imageData: Uint8Array;
```

### Inputs

Init only:

- **id**: `string` _(Required)_

Dynamic:

- **data**: `HTMLImageElement | ImageData | { width: number, height: number, data: Uint8Array | Uint8ClampedArray }`
- **options**: `{ pixelRatio: number; sdf: boolean; }`
- [ngx] **url**: `string` If set, will call [loadImage](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Map/#loadimage) and then add the image directly. Don't forget to listen to `loaded`.

### Outputs

- [ngx] **imageLoaded**: `void` Only when using `url` input. You should use this to delay the display of a layer.
- [ngx] **imageError**: `{ status: number }` Only when using `url` input

## mgl-control

### Example

```html
...
<mgl-map ...>
  <mgl-control> Hello </mgl-control>
  ...
  <mgl-control mglNavigation></mgl-control>
  ...
  <mgl-control mglScale unit="imperial" position="top-right"></mgl-control>
  ...
  <mgl-control
    mglTerrain
    source="rasterDemSource"
    exaggeration="3.1"
  ></mgl-control>
</mgl-map>
```

### Inputs

Init only:

- **position**: `'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'`
- [**mglAttribution**](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.AttributionControl/)
  - **compact**: `boolean`
- [**mglFullscreen**](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.FullScreenControl/)
- [**mglGeolocate**](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.GeolocateControl/)
  - **positionOptions**: [`PositionOptions`](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions)
  - **fitBoundsOptions**: [`FitBoundsOptions`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Map/#fitbounds)
  - **trackUserLocation**: `boolean`
  - **showUserLocation**: `boolean`
- [**mglNavigation**](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.NavigationControl/)
  - **showCompass**: `boolean`
  - **showZoom**: `boolean`
  - **visualizePitch**: `boolean`
- [**mglScale**](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.ScaleControl/)
  - **maxWidth**: `number`
  - **unit**: `'imperial' | 'metric' | 'nautical'` (dynamic input)
- **mglTerrain**
  - **source**: `string |`[`Source`](https://maplibre.org/maplibre-gl-js/docs/API/interfaces/maplibregl.Source/) _(Note: a raster DEM Source)_
  - **exaggeration**: `number` (1-100)

## mgl-marker [MapLibre GL API](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Marker/)

### Example

```html
...
<mgl-map ...>
  <mgl-marker [lngLat]="[-66.324462890625, -16.024695711685304]">
    <div (click)="alert('Foo')" class="marker">Hello</div>
  </mgl-marker>
</mgl-map>
```

Note: Only use this if you **really** need to use HTML/Angular component to render your symbol. These markers are slow compared to a `Layer` of symbol because they're not rendered using WebGL.

### Inputs

Init only:

- **offset**: [`PointLike`](https://maplibre.org/maplibre-gl-js/docs/API/types/maplibregl.PointLike/)
- **color**: `string`
- **anchor**: `'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'`
- **pitchAlignment**: `map` | `viewport` | `auto`
- **rotationAlignment**: `map` | `viewport` | `auto`

Dynamic:

- **lngLat**: [`LngLatLike`](https://maplibre.org/maplibre-gl-js/docs/API/types/maplibregl.LngLatLike/)
- **rotation**: `number`
- **draggable**: `boolean`
- [ngx] **feature**: `GeoJSON.Feature<GeoJSON.Point>` Mutually exclusive with lngLat
- [ngx] **className** `string` Class name to aply to the container
- [ngx] **popupShown**: `boolean` Shows if the marker's popup is visible at the moment

### Outputs

- **markerDragStart**: [`Marker`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Marker/)
- **markerDrag**: [`Marker`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Marker/)
- **markerDragEnd**: [`Marker`](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Marker/)

## mgl-popup [MapLibre GL API](https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Popup/)

### Example

```html
...
<mgl-map ...>
  <mgl-popup [lngLat]="[-96, 37.8]" [closeOnClick]="false">
    <h1>Hello world !</h1>
  </mgl-popup>
  ...
  <mgl-marker #myMarker ...> ... </mgl-marker>
  <mgl-popup [marker]="myMarker"> Hello from marker ! </mgl-popup>
</mgl-map>
```

### Inputs

Init only:

- **closeButton**: `boolean`
- **closeOnClick**: `boolean`
- **anchor**: `'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left'`
- **offset**: [`number |`[`PointLike`](https://maplibre.org/maplibre-gl-js/docs/API/types/maplibregl.PointLike/)`| { [anchor: string]: [number, number] };`

Dynamic:

- **lngLat**: [`LngLatLike`](https://maplibre.org/maplibre-gl-js/docs/API/types/maplibregl.LngLatLike/)
- [ngx] **marker**: `MarkerComponent` The targeted marker (will use https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Marker/#setpopup)
- [ngx] **feature**: `GeoJSON.Feature<GeoJSON.Point>` Mutually exclusive with lngLat

### Outputs

- **popupClose**: `void`
- **popupOpen**: `void`

## [ngx] mgl-markers-for-clusters

Requires a geojson source that is clustered - see above.

### Example

```html
...
<mgl-map ...>
  <mgl-markers-for-cluster [source]="myGeoJsonclusteredSource">
    <ng-template mglPoint let-feature> Marker! </ng-template>
    <ng-template mglClusterPoint let-feature>
      ClusterId: {{feature.properties?.cluster_id}}, Points:
      {{feature.properties?.point_count}}
    </ng-template>
  </mgl-markers-for-cluster>
</mgl-map>
```

Note: Only use this if you **really** need to use HTML/Angular component to render your symbols. This is **slower** than rendering symbols in WebGL.

### Inputs

Init only:

- **source**: `string | Source`
