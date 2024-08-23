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
      phone_number:['',[Validators.required]],
      password:['',[Validators.required]],
      password_confirm:['',[Validators.required]],
      updated_by:[''],
      created_by:[''],
    })
  }

  get last_name(){
    return this.frmGroupRegister.get('last_name')
  }
  get first_name(){
    return this.frmGroupRegister.get('first_name')
  }
  get email(){
    return this.frmGroupRegister.get('email')
  }
  get role(){
    return this.frmGroupRegister.get('role')
  }
  get dob(){
    return this.frmGroupRegister.get('dob')
  }
  get phone_number(){
    return this.frmGroupRegister.get('phone_number')
  }
  get password(){
    return this.frmGroupRegister.get('password')
  }
  get password_confirm(){
    return this.frmGroupRegister.get('password_confirm')
  }
  get updated_by(){
    return this.frmGroupRegister.get('updated_by')
  }
  get created_by(){
    return this.frmGroupRegister.get('created_by')
  }

}
