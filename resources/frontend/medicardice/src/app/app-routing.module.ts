import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SecureModule} from "./secure/secure.module";
import {SecureComponent} from "./secure/secure.component";
import {PublicComponent} from "./public/public.component";
import {LoginComponent} from "./public/login/login.component";
import {RegisterComponent} from "./public/register/register.component";
import {ActivateMailComponent} from "./public/activate-mail/activate-mail.component";
import {UserComponent} from "./secure/user/user.component";
import {ProfileComponent} from "./secure/user/profile/profile.component";

const routes: Routes = [
  {
    path:'dashboard',
    component:SecureComponent,
    children:[
      {
        path:'user/add',
        component: UserComponent
      },
      {
        path:'profile',
        component: ProfileComponent
      }

    ],
  },
  {
    path:'',
    component:PublicComponent,
    children:[
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'activation/:name',
        component:ActivateMailComponent
      },
      {
        path:'register',
        component:RegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
