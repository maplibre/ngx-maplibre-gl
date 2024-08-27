import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChildren,
} from "@angular/core";
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from "@angular/material/slide-toggle";
import {
  ActivatedRoute,
  Router,
  Routes,
  RouterLinkActive,
  RouterLink,
  RouterOutlet,
} from "@angular/router";
import { cloneDeep, groupBy } from "lodash-es";
import scrollIntoView from "scroll-into-view-if-needed";
import { Category, DEMO_ROUTES } from "./routes";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSidenavModule } from "@angular/material/sidenav";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { LayoutToolbarMenuComponent } from "../shared/layout/layout-toolbar-menu.component";

type RoutesByCategory = { [P in Category]: Routes };

const ORIGINAL_ROUTES = <RoutesByCategory>(
  groupBy(DEMO_ROUTES[0].children, (route) =>
    route.data ? route.data.cat : null
  )
);

@Component({
  templateUrl: "./demo-index.component.html",
  styleUrls: ["./demo-index.component.scss"],
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoIndexComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly routes = signal(ORIGINAL_ROUTES);

  readonly categories = [
    Category.STYLES,
    Category.LAYERS,
    Category.SOURCES,
    Category.USER_INTERACTION,
    Category.CAMERA,
    Category.CONTROLS_AND_OVERLAYS,
    Category.TERRAIN,
  ];
  readonly searchTerm = signal("");
  readonly sidenavIsOpen = signal(true);
  readonly isEditMode =
    !!this.activatedRoute.snapshot.firstChild!.params.demoUrl;

  readonly exampleLinks = viewChildren<string, ElementRef>("exampleLink", {
    read: ElementRef,
  });

  constructor() {
    afterNextRender(() => {
      this.scrollInToActiveExampleLink();
    });
  }

  toggleSidenav() {
    this.sidenavIsOpen.update((sidenavIsOpen) => !sidenavIsOpen);
  }

  toggleEdit(change: MatSlideToggleChange) {
    const snapshot = this.activatedRoute.snapshot.firstChild!;
    if (change.checked) {
      this.router.navigate(["demo", "edit", snapshot.url[0].path]);
    } else {
      this.router.navigate(["demo", snapshot.params.demoUrl]);
    }
  }

  // Quick and dirty
  searchRoutes(routes: RoutesByCategory, term: string) {
    const clonnedRoutes = cloneDeep(routes);
    Object.values(clonnedRoutes).forEach((category) => {
      category.forEach((route, index) => {
        if (
          route.data &&
          !(<string>route.data.label).toLowerCase().includes(term.toLowerCase())
        ) {
          delete category[index];
        }
      });
    });

    return clonnedRoutes;
  }

  search() {
    this.routes.set(this.searchRoutes(ORIGINAL_ROUTES, this.searchTerm()));
  }

  clearSearch() {
    this.searchTerm.set("");
    this.routes.set(ORIGINAL_ROUTES);
  }

  private scrollInToActiveExampleLink() {
    const activeLink = this.exampleLinks().find((elm) =>
      (<HTMLElement>elm.nativeElement).classList.contains("active")
    );
    if (activeLink) {
      scrollIntoView(<HTMLElement>activeLink.nativeElement, {
        block: "center",
        scrollMode: "if-needed",
      });
    }
  }
}
