import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PublicModule} from "./public/public.module";
import {SecureModule} from "./secure/secure.module";
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "./shared/interceptors/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PublicModule,
    SecureModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(),
    provideHttpClient(withInterceptors([
      authInterceptor
    ]),withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
