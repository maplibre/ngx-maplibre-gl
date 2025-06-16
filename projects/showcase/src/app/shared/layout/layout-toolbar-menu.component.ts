import { CdkPortal, DomPortalOutlet, PortalModule } from '@angular/cdk/portal';
import {
  Component,
  OnDestroy,
  afterNextRender,
  input,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'showcase-layout-toolbar-menu',
  template: `
    <ng-template cdk-portal>
      <ng-content></ng-content>
    </ng-template>
  `,
  imports: [PortalModule],
})
export class LayoutToolbarMenuComponent implements OnDestroy {

  readonly position = input<'left' | 'right'>();

  private portalOutlet: DomPortalOutlet;
  readonly portal = viewChild.required(CdkPortal);

  constructor() {
    afterNextRender(() => {
      this.portalOutlet = new DomPortalOutlet(
        document.querySelector(
          this.position() === 'left'
            ? '#layout-left-custom-items'
            : '#layout-right-custom-items'
        )!
      );
      this.portalOutlet.attach(this.portal());
    });
  }

  ngOnDestroy(): void {
    this.portalOutlet?.detach()
  }
}
