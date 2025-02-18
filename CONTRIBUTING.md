# Dev guide for ngx-maplibre-gl

## Install project dependencies (package.json)

```
npm ci
```

## Run ngx-maplibre-gl showcase

```
npm run start
```

Then, you can make your changes to the lib and experiment with the showcase app directly.

## Generate the API docs

API documentation are using [typedoc](https://typedoc.org/). The docs are generated in to the API folder under `dist/showcase` and are served using an `iframe` in maplibre.org/ngx-maplibre-gl.
In order to generate the docs run

```
npm run docs
```


## Commit format

https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit

## Release a new version

IMPORTANT: ngx-maplibre-gl does not follow semver - It uses the main version of angular as the major and usualy the maplibre-gl version as the minor.

Run the create-bump-version-PR workflow to update the version and changelog.

Manually edit `CHANGELOG.md` to add the new version name and release data, also edit the version content if needed.

Once merged to main, a new version should be created automatically.

## Upgrade Guide

Follow the steps to upgrade `maplibre-gl` and/or Angular.

After the upgrade, test the map using the showcase app:

```bash
npm run start
```

### maplibre-gl

1. Update `maplibre-gl` dependency [package.json](./package.json)
2. Update code in ngx-maplibre-gl/showcase to support any breaking changes from `maplibre-gl`  
2. If there are breaking changes/new options, change the `peerDependencies` of [ngx-maplibre-gl](./projects/ngx-maplibre-gl/package.json)

### Angular

1. Upgrade Angular and Angular Material (follow [Angular Update Guide](https://angular.dev/update-guide))
2. Update `peerDependencies` of [ngx-maplibre-gl](./projects/ngx-maplibre-gl/package.json)
3. Update [Stackblitz Angular version](./projects//showcase/src/app/demo/stackblitz-edit/create-stackblitz-project.ts)