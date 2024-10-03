import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PublicModule} from "./public/public.module";
import {SecureModule} from "./secure/secure.module";
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import {authInterceptor} from "./shared/interceptors/auth.interceptor";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {FullCalendarModule} from "@fullcalendar/angular";
import {NgxJsonLdModule} from "@ngx-lite/json-ld";





// @ts-ignore
@NgModule({
    declarations: [
        AppComponent

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        PublicModule,
        SecureModule,
        FullCalendarModule,
      SweetAlert2Module.forRoot(),
      // @ts-ignore
      NgxJsonLdModule
    ],
    providers: [
        provideClientHydration(),
        provideHttpClient(),
        provideHttpClient(withInterceptors([
            authInterceptor
        ]), withFetch())
    ],
  exports: [


  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
