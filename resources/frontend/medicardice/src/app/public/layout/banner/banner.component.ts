import {Component, EventEmitter, Output} from '@angular/core';
import {ModalService} from "../../../shared/services/modal/modal-service.service";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  isModalOpen = false;
  @Output() loginClick = new EventEmitter<void>();
  constructor(
    public modalService:ModalService
  ) {
  }

  openLoginModal() {
    //this.openModal.emit();
  }

  openModal() {
    console.log(`openModal in Banner`)
    this.loginClick.emit()
  }
}
