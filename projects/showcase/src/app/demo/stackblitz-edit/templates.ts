/**
 * StackBlitz installs with npm, whose strict peer resolution trips over the Angular
 * peer ranges. `legacy-peer-deps` makes the install resolve the same way the workspace does.
 */
export const NPMRC = `legacy-peer-deps=true`;

export const ANGULAR_JSON = `{
	"version": 1,
	"projects": {
		"demo": {
			"projectType": "application",
			"root": "",
			"sourceRoot": "src",
			"architect": {
				"build": {
					"builder": "@angular/build:application",
					"options": {
						"browser": "src/main.ts",
						"index": "src/index.html",
						"tsConfig": "tsconfig.app.json",
						"assets": [
							{
								"glob": "maplibre-gl-worker.mjs",
								"input": "node_modules/maplibre-gl/dist",
								"output": "/"
							},
							{
								"glob": "maplibre-gl-shared.mjs",
								"input": "node_modules/maplibre-gl/dist",
								"output": "/"
							}
						],
						"styles": ["src/styles.css"]
					}
				},
				"serve": {
					"builder": "@angular/build:dev-server",
					"options": { "buildTarget": "demo:build" }
				}
			}
		}
	}
}
`;

export const TSCONFIG = `
{
	"compilerOptions": {
		"target": "ES2022",
		"module": "ES2022",
		"moduleResolution": "bundler",
		"experimentalDecorators": true,
		"strict": true,
		"skipLibCheck": true,
		"esModuleInterop": true,
		"useDefineForClassFields": false
	},
	"angularCompilerOptions": { "strictTemplates": true }
}`;

export const TSCONFIG_APP = `{
	"extends": "./tsconfig.json",
	"compilerOptions": {
		"outDir": "./out-tsc/app"
	},
	"files": ["src/main.ts"],
	"include": ["src/**/*.ts"]
}
`;

export const INDEX_HTML = `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>ngx-maplibre-gl example</title>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
	</head>
	<body>
		<showcase-demo></showcase-demo>
	</body>
</html>
`;

export const MAIN_TS = `import { bootstrapApplication } from '@angular/platform-browser';
import { provideMaplibreWorker } from '@maplibre/ngx-maplibre-gl/config';
import { ### } from './demo';

bootstrapApplication(###, {
	providers: [provideMaplibreWorker('maplibre-gl-worker.mjs')],
}).catch((err) => console.error(err));
`;

/**
 * Build the global stylesheet.
 */
export const STYLES_CSS = `
@import 'maplibre-gl/dist/maplibre-gl.css';

html, body {
  display: flex;
  flex: 1;
  min-height: 100vh;
  margin: 0;
}
`;

export function packageJson(dependencies: Record<string, string>): string {
  const sorted = Object.fromEntries(
    Object.entries(dependencies).sort(([a], [b]) => a.localeCompare(b)),
  );
  return JSON.stringify(
    {
      name: 'demo',
      private: true,
      scripts: {
        ng: 'ng',
        start: 'ng serve',
        build: 'ng build',
      },
      dependencies: sorted,
    },
    null,
    2,
  );
}
