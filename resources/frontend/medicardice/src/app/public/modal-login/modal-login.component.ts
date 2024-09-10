import {Component, Inject, PLATFORM_ID, signal} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {isPlatformBrowser} from "@angular/common";
import {AuthService} from "../auth.service";
import {PatientIdService} from "../../shared/services/patient-id.service";


@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrl: './modal-login.component.css'
})
export class ModalLoginComponent {
  frmGroupModalLogin!:FormGroup;
  isModalOpen=signal(false)
  constructor(
    private authService:AuthService,
    private fb:FormBuilder,
    private router:Router,
    private patientIdService:PatientIdService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.frmGroupModalLogin=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
  }

  get email(){
    return this.frmGroupModalLogin.get('email');
  }
  get password(){
    return this.frmGroupModalLogin.get('password');
  }
  closeModal() {
    this.router.navigate(['/accueil.fr'])

  }

  onSubmit() {

    this.authService.login(this.frmGroupModalLogin.value)
      .subscribe({
        next:(res)=>{

          localStorage.clear()
          if(isPlatformBrowser(this.platformId) && res.role==='Patient'){

            localStorage.setItem('token',res.token)
            localStorage.setItem('expires_at',res.expires_at)
            localStorage.setItem('role',res.role)
            // @ts-ignore
            localStorage.setItem('authUser',res.user.last_name+' '+res.user.first_name)
            // @ts-ignore
            this.patientIdService.setUserIDObs(res.user.id)

          }
          else{
            this.authService.logout(res.token)
            this.router.navigate(['/accueil/fr'])
          }

          //this.beheviorService.updateState(this.authService.isExpired())
          switch (res.role){

            case 'Patient':
              // @ts-ignore
              this.patientIdService.setUserIDObs(res.user.id)
             // console.log(this.patientIdService.getUserIdObs())
              // @ts-ignore
              //console.log(res)
              // @ts-ignore
              this.patientIdService.setPatientIDObs(res.doctorPatientUser_id)
              //console.log(this.patientIdService.getPatientIdObs())
              this.router.navigate(['private/patient'])
              this.frmGroupModalLogin.reset()
              break;
          }

        },
        error:(err)=>{this.router.navigate(['/accueil/fr'])}
      })
  }
}
