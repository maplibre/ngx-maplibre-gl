import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

const FILES_PATH = 'app/demo/examples/';

@Injectable({ providedIn: 'root' })
export class DemoFileLoaderService {
  private readonly http = inject(HttpClient);
  private fileCache = new Map<string, Observable<Record<string, string>>>();

  constructor() {
    // Preload this file since it's used in every demos
    this.loadFile('example.css');
  }

  getDemoFiles(exampleName: string) {
    let req$ = this.fileCache.get(exampleName);
    if (req$) {
      return req$;
    }
    req$ = this.http
      .get(`${FILES_PATH}${exampleName}.component.ts`, {
        responseType: 'text',
      })
      .pipe(
        switchMap((fileContent) =>
          this.loadAdditionnalFilesIfNecessary(fileContent)
        ),
        shareReplay(1)
      );
    this.fileCache.set(exampleName, req$);
    return req$;
  }

  private loadAdditionnalFilesIfNecessary(fileContent: string) {
    const r = /'\.\/([\w-.]+\.\w+)'/g;
    let match;
    const files = [];
    const result = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'src/demo.ts': fileContent,
    };
    while ((match = r.exec(fileContent))) {
      files.push(this.loadFile(match[1]));
    }
    if (files.length) {
      return forkJoin(files).pipe(
        map((files) => {
          return {
            ...Object.assign({}, ...files),
            ...result,
          };
        })
      );
    }
    return of(result);
  }

  private loadFile(fileName: string) {
    let req$ = this.fileCache.get(fileName);
    if (req$) {
      return req$;
    }
    req$ = this.http
      .get(`${FILES_PATH}${fileName}`, {
        responseType: 'text',
      })
      .pipe(
        map((fileContent) => ({
          [`src/${fileName}`]: fileContent,
        })),
        shareReplay(1)
      );
    this.fileCache.set(fileName, req$);
    return req$;
  }
}
