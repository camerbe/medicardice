import {Component, Inject, PLATFORM_ID, signal} from '@angular/core';
import {TranslationService} from "../../../shared/services/translation.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {isPlatformBrowser} from "@angular/common";
import {AuthService} from "../../auth.service";
import {ExpiresAtService} from "../../../shared/services/expires-at.service";
import {PatientIdService} from "../../../shared/services/patient-id.service";

@Component({
  selector: 'app-header-fr',
  templateUrl: './header-fr.component.html',
  styleUrl: './header-fr.component.css'
})
export class HeaderFrComponent {
  currentLang!:string;
  error!:string;
  frmGroupModalLogin!:FormGroup;
  isModalOpen=signal(false)
  isResetPasswordModalOpen=signal(false)
  isMenuOpen: boolean=false;
  selectedSubAnchor: string | null = null;
  constructor(
    private translateService:TranslationService,
    private fb:FormBuilder,
    private authService:AuthService,
    private beheviorService:ExpiresAtService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private patientIdService:PatientIdService,
    private router:Router
  ) {
      this.currentLang=this.translateService.getCurrentLang()
      this.frmGroupModalLogin=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
  }
  isMenuActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }
  isParentMenuActive():boolean{
    return  this.router.url.startsWith(<string>this.selectedSubAnchor);
  }
  setActiveSubAnchor(anchor: string) {
    this.selectedSubAnchor = anchor;
  }
  get email(){
    return this.frmGroupModalLogin.get('email');
  }
  get password(){
    return this.frmGroupModalLogin.get('password');
  }

  onSubmit() {
    this.closeModal();
    this.authService.login(this.frmGroupModalLogin.value)
      .subscribe({
        next:(res)=>{

          if(isPlatformBrowser(this.platformId)){
            localStorage.setItem('token',res.token)
            localStorage.setItem('expires_at',res.expires_at)
            localStorage.setItem('role',res.role)
            // @ts-ignore
            localStorage.setItem('authUser',res.user.last_name+' '+res.user.first_name)

          }

          //this.beheviorService.updateState(this.authService.isExpired())
          switch (res.role){

            case 'Patient':
              // @ts-ignore
              this.patientIdService.setUserIDObs(res.user.id)
              //localStorage.setItem('id',res.user.id)
              this.router.navigate(['private/patient'])
              this.frmGroupModalLogin.reset()
              break;
          }

        },
        error:err=>{
          /*console.log(err.error.message)*/
          const usr=err.error['user']
          //console.log(`id ${usr.id} usr ${usr}`)
          const msg=(err.error.message).toString()
          switch  (msg){
            case  'verify_mail' :
              const fullName=usr.last_name+' '+usr.first_name;
              this.router.navigate(['activation',`${fullName}`]);
              break;
            case  'change_password' :
              this.router.navigate(['changepassword',usr.id]);
              break;
            default:
              this.error=err.error.message;
          }

        }
      })
  }
  openModal(){
    this.isModalOpen.set(true);
  }
  openResetPasswordModal(){
    this.isResetPasswordModalOpen.set(true);
  }
  closeModal(){
    this.isModalOpen.set(false)
  }
  closeResetPasswordModal(){
    this.isResetPasswordModalOpen.set(false)
  }
  closeModalOnOutsideClick(event:MouseEvent){
    const targetElement=event.target as HTMLElement;
    if(targetElement.classList.contains('fixed')){
      this.closeModal();
    }
  }

  resetPassword() {
    this.openModal()
    this.openResetPasswordModal()
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
