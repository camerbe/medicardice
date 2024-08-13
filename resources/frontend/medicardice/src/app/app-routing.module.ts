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
import {HomeComponent} from "./public/home/home.component";
import {LayoutComponent} from "./public/layout/layout.component";
import {ModalLoginComponent} from "./public/modal-login/modal-login.component";
import {WelcomeComponent} from "./secure/welcome/welcome.component";
import {WelcomeListComponent} from "./secure/welcome/welcome-list/welcome-list.component";
import {MedecinComponent} from "./secure/medecin/medecin.component";
import {MedecinListComponent} from "./secure/medecin/medecin-list/medecin-list.component";
import {FrontEndMedecinComponent} from "./public/home/front-end-medecin/front-end-medecin.component";
import {ConsultationComponent} from "./secure/examens/consultation/consultation.component";
import {ConsultationListComponent} from "./secure/examens/consultation/consultation-list/consultation-list.component";
import {FrontEndConsultationComponent} from "./public/examens/front-end-consultation/front-end-consultation.component";

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
        canActivate:[authGuard],
        title: 'Suppression des Administrateurs',
        component: UserListComponent
      },

      {
        path:'profile',
        canActivate:[authGuard],
        component: ProfileComponent
      },
      {
        path:'welcome/add',
        canActivate:[authGuard],
        component: WelcomeComponent
      },
      {
        path:'welcome/list',
        canActivate:[authGuard],
        component: WelcomeListComponent
      },
      {
        path:'welcome/delete/:id',
        canActivate:[authGuard],
        title: 'Suppression des welcomes',
        component: WelcomeListComponent
      },
      {
        path:'welcome/edit/:id',
        canActivate:[authGuard],
        title: 'Editer des welcomes',
        component: WelcomeComponent
      },
      {
        path:'medecin/add',
        canActivate:[authGuard],
        title: 'Ajout de médecin',
        component: MedecinComponent
      },
      {
        path:'medecin/list',
        canActivate:[authGuard],
        title: 'Lise de médecins',
        component: MedecinListComponent
      },
      {
        path:'medecin/delete/:id',
        canActivate:[authGuard],
        title: 'Suppression de médecin',
        component: MedecinListComponent
      },
      {
        path:'medecin/edit/:id',
        canActivate:[authGuard],
        title: 'Editer un médecin',
        component: MedecinComponent
      },
      {
        path:'consultation/add',
        canActivate:[authGuard],
        title: "Ajout d'une consultation",
        component: ConsultationComponent
      },
      {
        path:'consultation/list',
        canActivate:[authGuard],
        title: 'Liste des consultations',
        component: ConsultationListComponent
      }
      ,
      {
        path:'consultation/delete/:id',
        canActivate:[authGuard],
        title: 'Suppression de consultation',
        component: ConsultationListComponent
      },
      {
        path:'consultation/edit/:id',
        canActivate:[authGuard],
        title: 'Editer une consultation',
        component: ConsultationComponent
      },
      {
        path:'electrocardiographie/add',
        canActivate:[authGuard],
        title: "Ajout d'une electrocardiographie",
        component: ConsultationComponent
      },
      {
        path:'electrocardiographie/list',
        canActivate:[authGuard],
        title: 'Liste des electrocardiographies',
        component: ConsultationListComponent
      },
      {
        path:'electrocardiographie/delete/:id',
        canActivate:[authGuard],
        title: 'Suppression de electrocardiographie',
        component: ConsultationListComponent
      },
      {
        path:'electrocardiographie/edit/:id',
        canActivate:[authGuard],
        title: 'Editer une electrocardiographie',
        component: ConsultationComponent
      }
    ],
  },

  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path:'',
        redirectTo:'home',
        pathMatch:"full"
      },
      {
        path: 'home/:locale',
        component: HomeComponent
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'modal/login',
        component:ModalLoginComponent
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
      {
        path: 'medecin/:locale',
        component: FrontEndMedecinComponent

      },
      {
        path: 'consultation/:locale',
        component: FrontEndConsultationComponent

      }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
