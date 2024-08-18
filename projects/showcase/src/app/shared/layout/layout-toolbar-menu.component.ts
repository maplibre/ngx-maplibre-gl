import { CdkPortal, DomPortalOutlet, PortalModule } from '@angular/cdk/portal';
import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  DestroyRef,
  Injector,
  afterNextRender,
  inject,
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
  standalone: true,
  imports: [PortalModule],
})
export class LayoutToolbarMenuComponent {
  private readonly componentFactoryResolver = inject(ComponentFactoryResolver);
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private readonly appRef = inject(ApplicationRef);

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
        )!,
        this.componentFactoryResolver,
        this.appRef,
        this.injector
      );
      this.portalOutlet.attach(this.portal());
    });

    this.destroyRef.onDestroy(() => this.portalOutlet?.detach());
  }
}
