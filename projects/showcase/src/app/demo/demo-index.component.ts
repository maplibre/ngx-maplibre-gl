import {
  Component,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  model,
  signal,
  viewChildren,
} from '@angular/core';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import {
  ActivatedRoute,
  Router,
  Routes,
  RouterLinkActive,
  RouterLink,
  RouterOutlet,
  Data,
} from '@angular/router';
import scrollIntoView from 'scroll-into-view-if-needed';
import { CATEGORIES, DEMO_ROUTES } from './routes';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutToolbarMenuComponent } from '../shared/layout/layout-toolbar-menu.component';

type RoutesByCategory = Record<string, Routes>;

@Component({
  templateUrl: './demo-index.component.html',
  styleUrls: ['./demo-index.component.scss'],
  imports: [
    LayoutToolbarMenuComponent,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    FormsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    RouterLinkActive,
    RouterLink,
    MatDividerModule,
    RouterOutlet,
  ],
})
export class DemoIndexComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly originalRoutes = <RoutesByCategory>(
    (
      Object.groupBy(DEMO_ROUTES[0].children ?? [], ({ data }) =>
        data ? data.cat : null
      )
    )
  );

  readonly searchedRoutes = computed(() => {
    const routesByCategory: RoutesByCategory = {};
    const searchTerm = this.searchTerm().toLocaleLowerCase();

    Object.values(this.originalRoutes).forEach((category) => {
      category.forEach((route) => {
        const label = this.getLabelFromData(route.data);
        const category = route.data?.cat ?? ''
        if (label.toLocaleLowerCase().includes(searchTerm)) {
          if (!routesByCategory[category]) { routesByCategory[category] = []; }
          routesByCategory[category].push(route);
        };

      });
    });
    return routesByCategory;
  });

  readonly categories = Object.values(CATEGORIES);
  readonly searchTerm = model('');
  readonly sidenavIsOpen = signal(true);
  readonly isEditMode = model(!!this.activatedRoute.snapshot.firstChild!.params.demoUrl);

  readonly exampleLinks = viewChildren<string, ElementRef>('exampleLink', {
    read: ElementRef,
  });

  constructor() {
    afterNextRender(() => {
      // workaround: active class is not applied by the router directly
      setTimeout(() => {
        this.scrollInToActiveExampleLink();
      }, 0);
    });
  }


  getLabelFromData(data: Data | undefined): string {
    if (data && typeof data.label === 'string') {
      return data.label;
    }
    return '';
  }

  toggleSidenav() {
    this.sidenavIsOpen.update((v) => !v);
  }

  toggleEdit(change: MatSlideToggleChange) {
    const snapshot = this.activatedRoute.snapshot.firstChild!;
    if (change.checked) {
      this.router.navigate(['demo', 'edit', snapshot.url[0].path]);
    } else {
      this.router.navigate(['demo', snapshot.params.demoUrl]);
    }
  }


  clearSearch() {
    this.searchTerm.set('');
  }

  private scrollInToActiveExampleLink() {
    const activeLink = this.exampleLinks().find((elm) =>
      (<HTMLElement>elm.nativeElement).classList.contains('active')
    );
    if (activeLink) {
      scrollIntoView(<HTMLElement>activeLink.nativeElement, {
        block: 'center',
        scrollMode: 'if-needed',
      });
    }
  }
}
