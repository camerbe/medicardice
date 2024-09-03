import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../../shared/services/patients/patient.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
frmGroupRegister!:FormGroup;

  constructor(
    private fb:FormBuilder,
    private patientService:PatientService,
    private router:Router
  )
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

  registerPatient() {
    this.patientService.register(this.frmGroupRegister.value)
      .subscribe(res=>{
        console.log(res)
        // @ts-ignore
        const data=res['data']
        // @ts-ignore
        if(res.success){
          this.router.navigate(['activation',`${data.updated_by}`]);
        }else{
          this.frmGroupRegister.reset(this.frmGroupRegister.value)
        }
      })

  }
}
