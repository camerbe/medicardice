import {Component, signal} from '@angular/core';
import {TranslationService} from "../../../shared/services/translation.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-header-fr',
  templateUrl: './header-fr.component.html',
  styleUrl: './header-fr.component.css'
})
export class HeaderFrComponent {
  currentLang!:string;
  frmGroupModalLogin!:FormGroup;
  isModalOpen=signal(false)
  constructor(
    private translateService:TranslationService,
    private fb:FormBuilder,
    private router:Router
  ) {
      this.currentLang=this.translateService.getCurrentLang()
      this.frmGroupModalLogin=this.fb.group({
      email:['',Validators.required,Validators.email],
      password:['',[Validators.required]]
    })
  }
  isMenuActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }
  get email(){
    return this.frmGroupModalLogin.get('email');
  }
  get password(){
    return this.frmGroupModalLogin.get('password');
  }

  onSubmit() {

  }
  openModal(){
    this.isModalOpen.set(true);
  }
  closeModal(){
    this.isModalOpen.set(false)
  }
  closeModalOnOutsideClick(event:MouseEvent){
    const targetElement=event.target as HTMLElement;
    if(targetElement.classList.contains('fixed')){
      this.closeModal();
    }
  }
}
