import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {ObservableService} from "../../shared/services/observable.service";
import {UserLogin} from "../../shared/models/user.response.login";
import {ExpiresAtService} from "../../shared/services/expires-at.service";
import {isPlatformBrowser} from "@angular/common";

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
          this.router.navigate(['dashboard/menu'])
        },
        error:err=>{
          /*console.log(err.error.message)
          console.log(err.error)*/
          const msg=(err.error.message).toString()
          switch  (msg){
            case  'verify_mail' :
              const fullName=err.error.user[0].last_name+' '+err.error.user[0].first_name;
              this.router.navigate(['activation',`${fullName}`]);
              break;
            case  'change_password' :
              this.router.navigate(['changepassword',err.error.user[0].id]);
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
