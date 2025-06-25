import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import StackBlitzSDK, { VM } from '@stackblitz/sdk';
import { Subscription, forkJoin, from, of } from 'rxjs';
import { finalize, shareReplay, switchMap, tap } from 'rxjs/operators';
import { createStackblitzProject } from './create-stackblitz-project';
import { DemoFileLoaderService } from './demo-file-loader.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  template: `
    <div #container></div>
    @if (loading) {
      <div class="loader">
        <mat-spinner></mat-spinner>
        <div></div>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: flex;
        flex: 1;
        position: relative;
      }
      :host ::ng-deep iframe {
        height: 100%;
        width: 100%;
        border: 0;
      }
      .loader {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatProgressSpinnerModule],
})
export class StackblitzEditComponent implements AfterViewInit, OnDestroy {
  stackblitzContainer = viewChild.required<ElementRef<HTMLDivElement>>('container');

  loading = true;

  private sub: Subscription;
  private vm: VM;
  private projectbase$ = forkJoin([
    this.http.get('assets/stackblitz/main.notts', {
      responseType: 'text',
    }),
    this.http.get('assets/stackblitz/angular.json', {
      responseType: 'text',
    }),
  ]).pipe(shareReplay(1));

  private zone = inject(NgZone);
  private activatedRoute = inject(ActivatedRoute);
  private demoFileLoaderService = inject(DemoFileLoaderService);
  private http = inject(HttpClient);
  private changeDetectorRef = inject(ChangeDetectorRef);

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.sub = this.activatedRoute.params
      .pipe(
        tap(() => {
          this.loading = true;
          this.changeDetectorRef.markForCheck();
        }),
        switchMap((params) =>
          forkJoin([
            this.projectbase$,
            this.demoFileLoaderService.getDemoFiles(params.demoUrl),
            of(params.demoUrl as string),
          ])
        ),
        switchMap(([projectbase, demoFiles, exampleName]) =>
          from(this.openExample(projectbase, demoFiles, exampleName)).pipe(
            finalize(() => {
              this.loading = false;
              this.changeDetectorRef.markForCheck();
            })
          )
        )
      )
      .subscribe();
  }

  private async openExample(
    projectbase: string[],
    demoFiles: Record<string, string>,
    exampleName: string
  ) {
    if (this.vm) {
      await this.vm.applyFsDiff({
        create: demoFiles,
        destroy: [],
      });
      return;
    }
    const project = createStackblitzProject(
      projectbase,
      demoFiles,
      exampleName
    );
    await this.zone.runOutsideAngular(async () => {
      this.vm = await StackBlitzSDK.embedProject(
        this.stackblitzContainer().nativeElement,
        project,
        {
          hideExplorer: true,
          hideNavigation: true,
          forceEmbedLayout: true,
          openFile: 'src/demo.ts',
        }
      );
    });
  }
}
