import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { APP_ROUTES } from './app.routes';

// Modulos
import { PagesModule } from './pages/pages.module';
import { PublicoModule } from './publico/publico.module';


import { AppComponent } from './app.component';
import { LoginComponent } from './shared/login/login.component';

// Servicios

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ServiceModule } from './services/service.module';
import { RouterModule } from '@angular/router';
// import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    PublicoModule,
    // NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
