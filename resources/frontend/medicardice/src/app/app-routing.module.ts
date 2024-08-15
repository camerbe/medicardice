import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SecureComponent} from "./secure/secure.component";
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
import {ElectrocardiographieComponent} from "./secure/examens/electrocardiographie/electrocardiographie.component";
import {
  ElectrocardiographieListComponent
} from "./secure/examens/electrocardiographie/electrocardiographie-list/electrocardiographie-list.component";
import {
  FrontEndElectrocardiographieComponent
} from "./public/examens/front-end-electrocardiographie/front-end-electrocardiographie.component";
import {EchocardiographieComponent} from "./secure/examens/echocardiographie/echocardiographie.component";
import {
  EchocardiographieListComponent
} from "./secure/examens/echocardiographie/echocardiographie-list/echocardiographie-list.component";
import {
  FrontEndEchocardiographieComponent
} from "./public/examens/front-end-echocardiographie/front-end-echocardiographie.component";
import {StressComponent} from "./secure/examens/stress/stress/stress.component";
import {StressListComponent} from "./secure/examens/stress/stress/stress-list/stress-list.component";
import {FrontEndStressComponent} from "./public/examens/front-end-stress/front-end-stress.component";
import {HolterComponent} from "./secure/examens/holter/holter/holter.component";
import {HolterListComponent} from "./secure/examens/holter/holter-list/holter-list.component";
import {FrontEndHolterComponent} from "./public/examens/front-end-holter/front-end-holter.component";
import {MonitoringComponent} from "./secure/examens/monitoring/monitoring/monitoring.component";
import {MonitoringListComponent} from "./secure/examens/monitoring/monitoring-list/monitoring-list.component";
import {FrontEndMonitoringComponent} from "./public/examens/front-end-monitoring/front-end-monitoring.component";
import {CatheterizationComponent} from "./secure/examens/catheterization/catheterization/catheterization.component";
import {
  CatheterizationListComponent
} from "./secure/examens/catheterization/catheterization-list/catheterization-list.component";
import {
  FrontEndCatheterizationComponent
} from "./public/examens/front-end-catheterization/front-end-catheterization.component";
import {
  CoronaryangioplastyComponent
} from "./secure/examens/coronaryangioplasty/coronaryangioplasty/coronaryangioplasty.component";
import {
  CoronaryangioplastyListComponent
} from "./secure/examens/coronaryangioplasty/coronaryangioplasty-list/coronaryangioplasty-list.component";
import {
  FrontEndCoronaryangioplastyComponent
} from "./public/examens/front-end-coronaryangioplasty/front-end-coronaryangioplasty.component";

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
        component: ElectrocardiographieComponent
      },
      {
        path:'electrocardiographie/list',
        canActivate:[authGuard],
        title: 'Liste des electrocardiographies',
        component: ElectrocardiographieListComponent
      },
      {
        path:'electrocardiographie/delete/:id',
        canActivate:[authGuard],
        title: 'Suppression de electrocardiographie',
        component: ElectrocardiographieListComponent
      },
      {
        path:'electrocardiographie/edit/:id',
        canActivate:[authGuard],
        title: 'Editer une electrocardiographie',
        component: ElectrocardiographieComponent
      },
      {
        path:'echocardiographie/add',
        canActivate:[authGuard],
        title: "Ajout d'une echocardiographie",
        component: EchocardiographieComponent
      },
      {
        path:'echocardiographie/list',
        canActivate:[authGuard],
        title: 'Liste des echocardiographies',
        component: EchocardiographieListComponent
      },
      {
        path:'echocardiographie/delete/:id',
        canActivate:[authGuard],
        title: 'Suppression de echocardiographie',
        component: EchocardiographieListComponent
      },
      {
        path:'echocardiographie/edit/:id',
        canActivate:[authGuard],
        title: 'Editer une echocardiographie',
        component: EchocardiographieComponent
      },
      {
        path:'stress/add',
        canActivate:[authGuard],
        title: "Ajout d'un stress",
        component: StressComponent
      },
      {
        path:'stress/list',
        canActivate:[authGuard],
        title: 'Liste des stress',
        component: StressListComponent
      },
      {
        path:'stress/delete/:id',
        canActivate:[authGuard],
        title: 'Suppression de stress',
        component: StressListComponent
      },
      {
        path:'stress/edit/:id',
        canActivate:[authGuard],
        title: 'Editer une stress',
        component: StressComponent
      },
      {
        path:'holter/add',
        canActivate:[authGuard],
        title: "Ajout d'un holter",
        component: HolterComponent
      },
      {
        path:'holter/list',
        canActivate:[authGuard],
        title: 'Liste des holters',
        component: HolterListComponent
      },
      {
        path:'stress/holter/:id',
        canActivate:[authGuard],
        title: 'Suppression de holter',
        component: HolterListComponent
      },
      {
        path:'holter/edit/:id',
        canActivate:[authGuard],
        title: 'Editer une holter',
        component: HolterComponent
      },
      {
        path:'monitoring/add',
        canActivate:[authGuard],
        title: "Ajout d'un monitoring",
        component: MonitoringComponent
      },
      {
        path:'monitoring/list',
        canActivate:[authGuard],
        title: 'Liste des monitorings',
        component: MonitoringListComponent
      },
      {
        path:'stress/monitoring/:id',
        canActivate:[authGuard],
        title: 'Suppression de monitoring',
        component: MonitoringListComponent
      },
      {
        path:'monitoring/edit/:id',
        canActivate:[authGuard],
        title: 'Editer une monitoring',
        component: MonitoringComponent
      },
      {
        path:'catheterization/add',
        canActivate:[authGuard],
        title: "Ajout d'une catheterization",
        component: CatheterizationComponent
      },
      {
        path:'catheterization/list',
        canActivate:[authGuard],
        title: 'Liste des catheterizations',
        component: CatheterizationListComponent
      },
      {
        path:'stress/catheterization/:id',
        canActivate:[authGuard],
        title: 'Suppression de catheterization',
        component: CatheterizationListComponent
      },
      {
        path:'catheterization/edit/:id',
        canActivate:[authGuard],
        title: 'Editer une catheterization',
        component: CatheterizationComponent
      },
      {
        path:'coronaryangioplastie/add',
        canActivate:[authGuard],
        title: "Ajout d'une coronaryangioplastie",
        component: CoronaryangioplastyComponent
      },
      {
        path:'coronaryangioplastie/list',
        canActivate:[authGuard],
        title: 'Liste des coronaryangioplasties',
        component: CoronaryangioplastyListComponent
      },
      {
        path:'stress/coronaryangioplastie/:id',
        canActivate:[authGuard],
        title: 'Suppression de coronaryangioplastie',
        component: CoronaryangioplastyListComponent
      },
      {
        path:'coronaryangioplastie/edit/:id',
        canActivate:[authGuard],
        title: 'Editer une coronaryangioplastie',
        component: CoronaryangioplastyComponent
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
        path: 'accueil/:locale',
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
        path: 'doctor/:locale',
        component: FrontEndMedecinComponent

      },
      {
        path: 'consultation/:locale',
        component: FrontEndConsultationComponent

      },
      {
        path: 'general-consultation/:locale',
        component: FrontEndConsultationComponent

      },
      {
        path: 'electrocardiography/:locale',
        component: FrontEndElectrocardiographieComponent

      },
      {
        path: 'electrocardiographie/:locale',
        component: FrontEndElectrocardiographieComponent

      },
      {
        path: 'echocardiography/:locale',
        component: FrontEndEchocardiographieComponent

      },
      {
        path: 'echocardiographie/:locale',
        component: FrontEndEchocardiographieComponent

      },
      {
        path: 'stress-test/:locale',
        component: FrontEndStressComponent

      },
      {
        path: 'stress/:locale',
        component: FrontEndStressComponent

      },
      {
        path: 'holter/:locale',
        component: FrontEndHolterComponent

      },
      {
        path: 'holter-ecg/:locale',
        component: FrontEndHolterComponent

      },
      {
        path: 'monitoring/:locale',
        component: FrontEndMonitoringComponent

      },
      {
        path: 'catheterization/:locale',
        component: FrontEndCatheterizationComponent

      },
      {
        path: 'right-heart-catheterization/:locale',
        component: FrontEndCatheterizationComponent

      },
      {
        path: 'coronaryangioplastie/:locale',
        component: FrontEndCoronaryangioplastyComponent

      },
      {
        path: 'coronary-angiography/:locale',
        component: FrontEndCoronaryangioplastyComponent

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
