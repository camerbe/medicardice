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
import {ChangePasswordComponent} from "./public/change-password/change-password.component";
import {MenuComponent} from "./secure/user/menu/menu.component";
import {DoctorComponent} from "./secure/user/doctor/doctor.component";
import {DoctorListComponent} from "./secure/user/doctor/doctor-list/doctor-list.component";

const routes: Routes = [
  {
    path:'dashboard',
    component:SecureComponent,
    //canActivate:[authGuard],
    children:[
      {
        path:'user/add',
        canActivate:[authGuard],
        component: UserComponent
      },
      {
        path:'menu',
        canActivate:[authGuard],
        title: 'Editer des Administrateurs',
        component: MenuComponent
      },
      {
        path:'doctor/add',
        canActivate:[authGuard],
        title: 'créer un médecin',
        component: DoctorComponent
      },
      {
        path:'doctor/edit/:id',
        canActivate:[authGuard],
        title: 'Editer des médecins',
        component: DoctorComponent
      },
      {
        path:'doctor/list',
        canActivate:[authGuard],
        title: 'Liste des médecins',
        component: DoctorListComponent
      },
      {
        path:'user/edit/:id',
        canActivate:[authGuard],
        title: 'Editer des Administrateurs',
        component: UserComponent
      },
      {
        path:'user/list',
        title: 'Liste des Administrateurs',
        canActivate:[authGuard],
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
      },
      {
        path:'changepassword/:userID',
        title: 'Modification du mot de passe',
        component: ChangePasswordComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
