import { Platform } from '@angular/cdk/platform';
import { CdkPortal, DomPortalOutlet, PortalModule } from '@angular/cdk/portal';
import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  Injector,
  Input,
  OnDestroy,
  ViewChild,
  afterNextRender,
  inject,
} from '@angular/core';

@Component({
  selector: 'showcase-layout-toolbar-menu',
  template: `
    <ng-template cdk-portal>
      <ng-content></ng-content>
    </ng-template>
  `,
  standalone: true,
  imports: [PortalModule],
})
export class LayoutToolbarMenuComponent implements OnDestroy {
  @Input() position: 'left' | 'right';

  private portalOutlet: DomPortalOutlet;
  @ViewChild(CdkPortal) portal: CdkPortal;

  private _isBrowser = inject(Platform).isBrowser;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {
    afterNextRender(() => {
      this.portalOutlet = new DomPortalOutlet(
        document.querySelector(
          this.position === 'left'
            ? '#layout-left-custom-items'
            : '#layout-right-custom-items'
        )!,
        this.componentFactoryResolver,
        this.appRef,
        this.injector
      );
      this.portalOutlet.attach(this.portal);
    });
  }

  ngOnDestroy() {
    if (this._isBrowser) {
      this.portalOutlet.detach();
    }
  }
}
