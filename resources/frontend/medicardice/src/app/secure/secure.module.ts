import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureComponent } from './secure.component';
import { NavComponent } from './nav/nav.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './user/profile/profile.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UserListComponent } from './user/user-list/user-list.component';
import { ChangePasswordComponent } from '../public/change-password/change-password.component';
import { MenuComponent } from './user/menu/menu.component';
import { DoctorComponent } from './user/doctor/doctor.component';
import {FormHeaderComponent} from "./components/form-header/form-header.component";
import {AppModule} from "../app.module";
import {FormMenuComponent} from "./components/form-menu/form-menu.component";
import { ButtonComponent } from './components/button/button.component';
import { DoctorListComponent } from './user/doctor/doctor-list/doctor-list.component';
import { AddButtonComponent } from './components/add-button/add-button.component';
import { HeaderListTitleComponent } from './components/header-list-title/header-list-title.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {EditorModule, TINYMCE_SCRIPT_SRC} from "@tinymce/tinymce-angular";
import { WelcomeListComponent } from './welcome/welcome-list/welcome-list.component';
import { MedecinComponent } from './medecin/medecin.component';
import { MedecinListComponent } from './medecin/medecin-list/medecin-list.component';
import { ConsultationComponent } from './examens/consultation/consultation.component';
import { ConsultationListComponent } from './examens/consultation/consultation-list/consultation-list.component';
import { ElectrocardiographieComponent } from './examens/electrocardiographie/electrocardiographie.component';
import { ElectrocardiographieListComponent } from './examens/electrocardiographie/electrocardiographie-list/electrocardiographie-list.component';




@NgModule({
    declarations: [
        SecureComponent,
        NavComponent,
        UserComponent,
        ProfileComponent,
        UserListComponent,
        ChangePasswordComponent,
        MenuComponent,
        DoctorComponent,
        FormHeaderComponent,
        FormMenuComponent,
        ButtonComponent,
        DoctorListComponent,
        AddButtonComponent,
        HeaderListTitleComponent,
        ItemListComponent,
        WelcomeComponent,
        WelcomeListComponent,
        MedecinComponent,
        MedecinListComponent,
        ConsultationComponent,
        ConsultationListComponent,
        ElectrocardiographieComponent,
        ElectrocardiographieListComponent


    ],
    imports: [
        CommonModule,
        RouterLink,
        RouterOutlet,
        ReactiveFormsModule,
        RouterLinkActive,
        FormsModule,
        EditorModule
    ],
    exports: [
        WelcomeComponent
    ],
    providers: [
        {provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js'}
    ]
})
export class SecureModule { }
