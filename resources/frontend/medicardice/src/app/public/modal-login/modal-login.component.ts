// @ts-ignore
import {Component, Output, EventEmitter, Input, signal, Inject, PLATFORM_ID} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {ModalService} from "../../shared/services/modal/modal-service.service";
import {isPlatformBrowser} from "@angular/common";
import {ExpiresAtService} from "../../shared/services/expires-at.service";
import {Router} from "@angular/router";
//import EventEmitter from "events";

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrl: './modal-login.component.css'
})
export class ModalLoginComponent {
  //@Output() close = new EventEmitter<void>();
  //@Input() isOpen = false;
  frmGroupModalLogin!:FormGroup;
  @Input() isModalOpen=signal(false);
  error!:string;
  constructor(
    private fb:FormBuilder,
    public modalService:ModalService,
    private router:Router,
    private authService:AuthService,
    private beheviorService:ExpiresAtService,
    @Inject(PLATFORM_ID) private platformId: Object
  )
  {
    this.frmGroupModalLogin=this.fb.group({
      email:['',Validators.required,Validators.email],
      password:['',[Validators.required]]
    })

  }
  get email(){
    return this.frmGroupModalLogin.get('email');
  }
  get password(){
    return this.frmGroupModalLogin.get('password');
  }

  onSubmit() {
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

          this.beheviorService.updateState(this.authService.isExpired())
          switch (res.role){
            default:
            case 'Admin':
              this.router.navigate(['dashboard/menu'])
              break
            case 'Doctor':
              this.router.navigate(['private/doctor'])
              break;
            case 'Patient':
              this.router.navigate(['private/patient'])
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

  onClose() {
    // @ts-ignore
    //this.close.emit();
  }
  toggleModal() {
    //this.isOpen = !this.isOpen;
  }
  openModal(){
    this.isModalOpen.set(true);
  }
  closeModal() {
    //this.close.emit()
    this.isModalOpen.set(false);
  }
  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('fixed')) {
      this.closeModal();
    }
  }
}
