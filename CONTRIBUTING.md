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

## Run the tests

Unit tests run on [Vitest](https://vitest.dev/) in a real Chromium browser (MapLibre
needs a WebGL2 context), driven by Angular's `@angular/build:unit-test` builder:

```bash
npm run test -- ngx-maplibre-gl --watch=false
```

End-to-end tests run on [Playwright](https://playwright.dev/) against the showcase
app, which the Playwright config starts for you:

```bash
npx playwright install chromium   # once
npm run e2e
npm run e2e:ui                    # interactive mode
```

The e2e suite keeps the test implementation separate from the specs, in three
layers under `projects/showcase/e2e/support`:

| File | Responsibility |
| --- | --- |
| `playwright-helper.ts` | All Playwright-specific primitives — `given`/`when`/`get` plus the generic auto-retrying `Assertable`. Knows nothing about the showcase. |
| `maplibre-assertable.ts` | Map-specific assertions on top of `Assertable`, i.e. comparing canvas snapshots. |
| `e2e-driver.ts` | The showcase-specific `E2eDriver`. Spreads the helper's `given`/`when`/`get` and adds domain concepts (visiting a demo, waiting for the map to idle, reading the canvas back). |
| `fixtures.ts` | Binds the current test's `page` for the page-lazy driver and installs the console / uncaught-error spies. |

Specs only talk to the driver, in a given/when/then style:

```ts
describe('Popup', () => {
  const { when, get, then, beforeAndAfter } = new E2eDriver();

  beforeAndAfter();

  test('shows a popup', async () => {
    await when.visitMapPage('/demo/popup');
    await then(get.mglPopup()).shouldExist();
  });
});
```

A spec should never import from `@playwright/test` for page access, and the driver
should never touch `page` directly — reach for the helper instead. `beforeAndAfter()`
registers the check that a demo logged no errors/warnings and threw nothing.

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
3. Diff `MapOptions` against the inputs of [map.component.ts](./projects/ngx-maplibre-gl/src/lib/map/map.component.ts) and expose any new options
4. If there are breaking changes/new options, change the `peerDependencies` of [ngx-maplibre-gl](./projects/ngx-maplibre-gl/package.json)

### Angular

1. Upgrade Angular and Angular Material (follow [Angular Update Guide](https://angular.dev/update-guide))
2. Update `peerDependencies` of [ngx-maplibre-gl](./projects/ngx-maplibre-gl/package.json)
3. Update [Stackblitz Angular version](./projects//showcase/src/app/demo/stackblitz-edit/create-stackblitz-project.ts)