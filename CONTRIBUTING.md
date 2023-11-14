# Dev guide for ngx-maplibre-gl

## Install project dependencies (package.json)

```
npm install
```

## Run ngx-maplibre-gl showcase

```
npm run start
```

Then, you can make your changes to the lib and experiment with the showcase app directly.

## Commit format

https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit

## Release a new version

IMPORTANT: ngx-maplibre-gl does not follow - It uses the main version of angular as the major and usualy the maplibre-gl version as the minor.

Check if tests are OK (`npm run test` and `npm run e2e` or take a look at ci if your changes are pushed).

Change the version in both package.json files - the version should match the supported angular version

Manually edit `CHANGELOG.md` if necessary.

If everything is OK, push the changes

Run the create-bump-version-PR workflow to update the version

Once merged to main, a new version should be created automatically.