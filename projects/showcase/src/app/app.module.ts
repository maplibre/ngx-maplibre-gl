import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DemoModule } from './demo/demo.module';

@NgModule({
  declarations: [AppComponent],
  imports: [RouterModule, CoreModule, DemoModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
