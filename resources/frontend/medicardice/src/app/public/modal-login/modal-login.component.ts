// @ts-ignore
import {Component, Output, EventEmitter, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import Swal from "sweetalert2";
import {ModalService} from "../../shared/services/modal/modal-service.service";
//import EventEmitter from "events";

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrl: './modal-login.component.css'
})
export class ModalLoginComponent {
  @Output() close = new EventEmitter<void>();
  @Input() isOpen = false;
  frmGroupModalLogin!:FormGroup;





  constructor(
    private fb:FormBuilder,
    public modalService:ModalService
  )
  {
    this.frmGroupModalLogin=this.fb.group({
      email:['',Validators.required,Validators.email],
      password:['',[Validators.required]]
    })

  }
  get email(){
    return this.frmGroupModalLogin.get('email');
  }
  get password(){
    return this.frmGroupModalLogin.get('password');
  }

  onSubmit() {

    Swal.fire()
    console.log("in a modal")
  }

  onClose() {
    // @ts-ignore
    this.close.emit();
  }
  toggleModal() {
    this.isOpen = !this.isOpen;
  }

  closeModal() {
    this.close.emit()
  }
  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('fixed')) {
      this.closeModal();
    }
  }
}
