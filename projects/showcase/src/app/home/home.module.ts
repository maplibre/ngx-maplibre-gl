import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';
import { HomeIndexComponent } from './home-index.component';

@NgModule({
    imports: [NgxMapLibreGLModule, MatIconModule, HomeIndexComponent],
    exports: [HomeIndexComponent],
})
export class HomeModule {}
