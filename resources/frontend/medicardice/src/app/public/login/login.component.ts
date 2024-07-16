import {afterNextRender, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {ObservableService} from "../../shared/services/observable.service";
import {UserLogin} from "../../shared/models/user.response.login";
import {Subscription} from "rxjs";
import {ProfileObservableService} from "../../shared/services/profile-observable.service";
import {ExpiresAtService} from "../../shared/services/expires-at.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  frmGroupLogin!:FormGroup;

  currentUser!:UserLogin;
  constructor(
    private fb:FormBuilder,
    private router:Router,
    private authService:AuthService,
    private observableService :ObservableService,
    private beheviorService:ExpiresAtService
  ) {
    this.frmGroupLogin=this.fb.group({
      email:['',[Validators.email]],
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
    const date=new Date();
    this.authService.login(this.frmGroupLogin.value)
      .subscribe({
        next:(res)=>{
          //console.log(res)
          localStorage.setItem('token',res.token)
          localStorage.setItem('expires_at',res.expires_at)
          this.beheviorService.updateState(this.authService.isExpired())
          this.observableService.setExpiredToken();
          this.router.navigate(['dashboard'])
        },
        error:err=>{
          if(err.error.message==='verify_mail'){
            const fullName=err.error.user[0].last_name+' '+err.error.user[0].first_name
            this.router.navigate(
              ['activation',`${fullName}`]
            )
          }
        }
      })
  }

  /*ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }*/




}
