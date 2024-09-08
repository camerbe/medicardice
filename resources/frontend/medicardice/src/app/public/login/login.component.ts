import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {ObservableService} from "../../shared/services/observable.service";
import {UserLogin} from "../../shared/models/user.response.login";
import {ExpiresAtService} from "../../shared/services/expires-at.service";
import {isPlatformBrowser} from "@angular/common";
import {PatientIdService} from "../../shared/services/patient-id.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  frmGroupLogin!:FormGroup;
  error!:string;
  currentUser!:UserLogin;
  constructor(
    private fb:FormBuilder,
    private router:Router,
    private authService:AuthService,
    private observableService :ObservableService,
    private beheviorService:ExpiresAtService,
    private patientIdService:PatientIdService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.frmGroupLogin=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })

  }
  get email(){
    return this.frmGroupLogin.get('email');
  }
  get password(){
    return this.frmGroupLogin.get('password');
  }
  onSubmit() {

    this.authService.login(this.frmGroupLogin.value)
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
              // @ts-ignore
              localStorage.setItem('id',res.user.id)
              this.router.navigate(['private/doctor'])
              break;
            /*case 'Patient':
              // @ts-ignore
              localStorage.setItem('id',res.user.id)
              // @ts-ignore
              this.router.navigate(['private/patient'])
              break;*/
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

  /*ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }*/




}
