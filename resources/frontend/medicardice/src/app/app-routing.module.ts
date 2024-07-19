import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SecureComponent} from "./secure/secure.component";
import {PublicComponent} from "./public/public.component";
import {LoginComponent} from "./public/login/login.component";
import {RegisterComponent} from "./public/register/register.component";
import {ActivateMailComponent} from "./public/activate-mail/activate-mail.component";
import {UserComponent} from "./secure/user/user.component";
import {ProfileComponent} from "./secure/user/profile/profile.component";
import {UserListComponent} from "./secure/user/user-list/user-list.component";
import {authGuard} from "./shared/services/guards/auth-guard.guard";

const routes: Routes = [
  {
    path:'dashboard',
    component:SecureComponent,
    children:[
      {
        path:'user/add',
        canActivate:[authGuard],
        component: UserComponent
      },
      {
        path:'user/edit/:id',
        title: 'Editer des Administrateurs',
        component: UserComponent
      },
      {
        path:'user/list',
        title: 'Liste des Administrateurs',
        component: UserListComponent
      },
      {
        path:'user/delete/:id',
        title: 'Suppression des Administrateurs',
        component: UserListComponent
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
