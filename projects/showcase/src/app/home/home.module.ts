import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';
import { HomeIndexComponent } from './home-index.component';

@NgModule({
  declarations: [HomeIndexComponent],
  imports: [NgxMapLibreGLModule, MatIconModule],
  exports: [HomeIndexComponent],
})
export class HomeModule {}
