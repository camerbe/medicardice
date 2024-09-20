import {Component, signal} from '@angular/core';
import {Router} from "@angular/router";
import {PasswordResetService} from "../../shared/services/password-reset.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  frmGroupModalResetPassword!:FormGroup;

  isModalOpen=signal(false)


  constructor(
    private passwordResetService:PasswordResetService,
    private route:Router,
    private fb:FormBuilder,
  ) {
      this.frmGroupModalResetPassword=this.fb.group({
        email:['',[Validators.required,Validators.email]]
      })

  }

  get email(){
    return this.frmGroupModalResetPassword.get('email');
  }
  closeModal() {
    this.route.navigate(['/accueil/fr'])
  }

  onSubmit() {
    this.passwordResetService.forgot(this.frmGroupModalResetPassword.value)
      .subscribe({
        next:res=>{
          console.log(res)
          Swal.fire("Un lien de réinitialisation de votre mot de passe a été envoyé à l'adresse e-mail associée à votre compte.");
          this.closeModal()
        }
      })
  }
}
