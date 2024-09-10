import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordResetService} from "../../shared/services/password-reset.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})
export class ResetComponent implements OnInit{
  frmGroupModalReset!:FormGroup;
  token!:string;


  constructor(
    private passwordResetService:PasswordResetService,
    private route:ActivatedRoute,
    private fb:FormBuilder,
    private router:Router
  ) {
      this.frmGroupModalReset=this.fb.group({
        password:['',[Validators.required,Validators.minLength(6)]],
        password_confirm:['',[Validators.required]],
        token:[''],
      })
  }

  onSubmit() {
    this.frmGroupModalReset.patchValue({
      'token':this.token
    })
    this.passwordResetService.resetPassword(this.frmGroupModalReset.value)
      .subscribe({
        next:res=>{
          console.log(res)
          Swal.fire("Réinitialisation réussie.");
          this.router.navigate(['/accueil/fr'])

        }
      })
  }

  get password(){
    return this.frmGroupModalReset.get('password');
  }
  get password_confirm(){
    return this.frmGroupModalReset.get('password_confirm');
  }

  ngOnInit(): void {
    this.token=this.route.snapshot.params['token']

  }
}
