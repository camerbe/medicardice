import { NgModule } from '@angular/core';
import {CommonModule, NgClass} from '@angular/common';
import { PublicComponent } from './public.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ActivateMailComponent } from './activate-mail/activate-mail.component';
import { HomeComponent } from './home/home.component';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import { LayoutComponent } from './layout/layout.component';
import { SiteFooterComponent } from './layout/site-footer/site-footer.component';
import { SiteHeaderComponent } from './layout/site-header/site-header.component';
import { BannerComponent } from './layout/banner/banner.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { WelcomeImageComponent } from './home/welcome-image/welcome-image.component';
import { WelcomeTitleComponent } from './home/welcome-title/welcome-title.component';
import { WelcomeArticleComponent } from './home/welcome-article/welcome-article.component';
import { CallToActionComponent } from './layout/call-to-action/call-to-action.component';
import { ImageComponent } from './layout/components/image/image.component';
import { ArticleComponent } from './layout/components/article/article.component';
import { TitreComponent } from './layout/components/titre/titre.component';
import { FrontEndMedecinComponent } from './home/front-end-medecin/front-end-medecin.component';
import { BienvenuComponent } from './home/welcome/bienvenu/bienvenu.component';
import { FrontEndConsultationComponent } from './examens/front-end-consultation/front-end-consultation.component';
import { LanguageSwitchComponent } from './layout/language-switch/language-switch/language-switch.component';
import { HeaderFrComponent } from './layout/header-fr/header-fr.component';
import { HeaderEnComponent } from './layout/header-en/header-en.component';
import { FrontEndElectrocardiographieComponent } from './examens/front-end-electrocardiographie/front-end-electrocardiographie.component';
import { FrontEndEchocardiographieComponent } from './examens/front-end-echocardiographie/front-end-echocardiographie.component';
import { FrontEndStressComponent } from './examens/front-end-stress/front-end-stress.component';
import { FrontEndHolterComponent } from './examens/front-end-holter/front-end-holter.component';
import { FrontEndMonitoringComponent } from './examens/front-end-monitoring/front-end-monitoring.component';
import { FrontEndCatheterizationComponent } from './examens/front-end-catheterization/front-end-catheterization.component';
import { FrontEndCoronaryangioplastyComponent } from './examens/front-end-coronaryangioplasty/front-end-coronaryangioplasty.component';
import { BreadcrumbComponent } from './layout/components/breadcrumb/breadcrumb.component';
import { FrontEndAngioComponent } from './examens/front-end-angio/front-end-angio.component';
import { FrontEndHypertensionComponent } from './examens/front-end-hypertension/front-end-hypertension.component';
import {FrontEndChestComponent} from "./dossiers/front-end-chest/front-end-chest.component";
import {FrontEndHeartComponent} from "./dossiers/front-end-heart/front-end-heart.component";
import { FrontEndLocationComponent } from './location/front-end-location/front-end-location.component';
import {GoogleMap} from "@angular/google-maps";
import { PrivatePatientComponent } from './secure/private/private-patient/private-patient.component';
import { PrivateDoctorComponent } from './secure/private/private-doctor/private-doctor.component';
import {FullCalendarModule} from "@fullcalendar/angular";



@NgModule({
  declarations: [
    PublicComponent,
    LoginComponent,
    RegisterComponent,
    ActivateMailComponent,
    HomeComponent,
    ModalLoginComponent,
    LayoutComponent,
    SiteFooterComponent,
    SiteHeaderComponent,
    BannerComponent,
    WelcomeComponent,
    WelcomeImageComponent,
    WelcomeTitleComponent,
    WelcomeArticleComponent,
    CallToActionComponent,
    ImageComponent,
    ArticleComponent,
    TitreComponent,
    FrontEndMedecinComponent,
    BienvenuComponent,
    FrontEndConsultationComponent,
    LanguageSwitchComponent,
    HeaderFrComponent,
    HeaderEnComponent,
    FrontEndElectrocardiographieComponent,
    FrontEndEchocardiographieComponent,
    FrontEndStressComponent,
    FrontEndHolterComponent,
    FrontEndMonitoringComponent,
    FrontEndCatheterizationComponent,
    FrontEndCoronaryangioplastyComponent,
    BreadcrumbComponent,
    FrontEndAngioComponent,
    FrontEndHypertensionComponent,
    FrontEndChestComponent,
    FrontEndHeartComponent,
    FrontEndLocationComponent,
    PrivatePatientComponent,
    PrivateDoctorComponent
  ],
    imports: [
        CommonModule,
        RouterOutlet,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterLink,
        SweetAlert2Module,
        RouterLinkActive,
        NgClass,
        GoogleMap,
        FullCalendarModule
    ]
})
export class PublicModule { }
