import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

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

  }
}
