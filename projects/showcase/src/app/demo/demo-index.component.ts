import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  afterNextRender, viewChildren } from '@angular/core';
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
} from '@angular/router';
import { cloneDeep, groupBy } from 'lodash-es';
import { first } from 'rxjs/operators';
import scrollIntoView from 'scroll-into-view-if-needed';
import { Category, DEMO_ROUTES } from './routes';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutToolbarMenuComponent } from '../shared/layout/layout-toolbar-menu.component';

type RoutesByCategory = { [P in Category]: Routes };

@Component({
  templateUrl: './demo-index.component.html',
  styleUrls: ['./demo-index.component.scss'],
  standalone: true,
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
export class DemoIndexComponent implements OnInit {
  routes: RoutesByCategory;
  originalRoutes: RoutesByCategory;
  categories: Category[];
  searchTerm: string;
  sidenavIsOpen = true;
  isEditMode = !!this.activatedRoute.snapshot.firstChild!.params.demoUrl;

  exampleLinks = viewChildren<ElementRef>('exampleLink');

  constructor(
    private zone: NgZone,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.originalRoutes = <RoutesByCategory>(
      (<any>(
        groupBy(DEMO_ROUTES[0].children, (route) =>
          route.data ? route.data.cat : null
        )
      ))
    );
    this.categories = [
      Category.STYLES,
      Category.LAYERS,
      Category.SOURCES,
      Category.USER_INTERACTION,
      Category.CAMERA,
      Category.CONTROLS_AND_OVERLAYS,
      Category.TERRAIN,
    ];

    afterNextRender(() => {
      this.scrollInToActiveExampleLink();
    });
  }

  ngOnInit() {
    this.routes = this.originalRoutes;
  }

  toggleSidenav() {
    this.sidenavIsOpen = !this.sidenavIsOpen;
  }

  toggleEdit(change: MatSlideToggleChange) {
    const snapshot = this.activatedRoute.snapshot.firstChild!;
    if (change.checked) {
      this.router.navigate(['demo', 'edit', snapshot.url[0].path]);
    } else {
      this.router.navigate(['demo', snapshot.params.demoUrl]);
    }
  }

  onSidenavChange() {}

  search() {
    // Quick and dirty
    this.routes = cloneDeep(this.originalRoutes);
    Object.values(this.routes).forEach((category) => {
      category.forEach((route, index) => {
        if (
          route.data &&
          !(<string>route.data.label)
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
        ) {
          delete category[index];
        }
      });
    });
  }

  clearSearch() {
    this.searchTerm = '';
    this.routes = this.originalRoutes;
  }

  private scrollInToActiveExampleLink() {
    this.zone.onStable.pipe(first()).subscribe(() => {
      const activeLink = this.exampleLinks().find((elm) =>
        (<HTMLElement>elm.nativeElement).classList.contains('active')
      );
      if (activeLink) {
        scrollIntoView(<HTMLElement>activeLink.nativeElement, {
          block: 'center',
          scrollMode: 'if-needed',
        });
      }
    });
  }
}
