import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
frmGroupRegister!:FormGroup;

  constructor(
    private fb:FormBuilder)
  {
    this.frmGroupRegister=this.fb.group({
      last_name:['',[Validators.required]],
      first_name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      role:['Patient'],
      dob:['',[Validators.required]],
      phone_number:[''],
      password:['123456'],
      password_confirm:['123456'],
      updated_by:[''],
      created_by:[''],
    })
  }
}
