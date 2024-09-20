import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ExpiresAtService} from "../../shared/services/expires-at.service";
import {UserService} from "../../shared/services/user/user.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit{
  isExpired!:boolean;
  frmGroupPassword!:FormGroup;
  userID!:number;
  message!:string;
  constructor(
    private authService:AuthService,
    private fb:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private userService:UserService
  ) {
    this.frmGroupPassword=this.fb.group({
      password:['',[Validators.required,Validators.minLength(6)]],
      password_confirm:['',[Validators.required]],
      id:[this.userID],
    })
  }
  get password(){
    return this.frmGroupPassword.get('password')
  }
  get password_confirm(){
    return this.frmGroupPassword.get('password_confirm')
  }
  get id(){
    return this.frmGroupPassword.get('id')
  }
  onSubmit() {
    this.userService.changePassword(this.frmGroupPassword.value,this.userID)
      .subscribe({
        next:res=>{
          if (res.success) this.router.navigate(['login'])
        },
        error:err => {
          this.message=err.statusText
        }
      })
  }

  ngOnInit(): void {
    this.userID=this.route.snapshot.params['userID']!;
  }
}
