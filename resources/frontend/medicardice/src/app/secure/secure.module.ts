import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureComponent } from './secure.component';
import { NavComponent } from './nav/nav.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {authInterceptor} from "../shared/interceptors/auth.interceptor";
import {RouterLink, RouterOutlet} from "@angular/router";
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './user/profile/profile.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    SecureComponent,
    NavComponent,
    UserComponent,
    ProfileComponent
  ],
    imports: [
        CommonModule,
        RouterLink,
        RouterOutlet,
        ReactiveFormsModule
    ]
})
export class SecureModule { }
