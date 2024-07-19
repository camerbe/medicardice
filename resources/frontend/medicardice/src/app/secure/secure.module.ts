import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureComponent } from './secure.component';
import { NavComponent } from './nav/nav.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './user/profile/profile.component';
import {ReactiveFormsModule} from "@angular/forms";
import { UserListComponent } from './user/user-list/user-list.component';



@NgModule({
  declarations: [
    SecureComponent,
    NavComponent,
    UserComponent,
    ProfileComponent,
    UserListComponent
  ],
    imports: [
        CommonModule,
        RouterLink,
        RouterOutlet,
        ReactiveFormsModule
    ]
})
export class SecureModule { }
