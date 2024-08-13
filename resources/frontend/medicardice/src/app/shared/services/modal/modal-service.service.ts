import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private showModal =new BehaviorSubject<boolean>(false);
  showModal$:Observable<boolean>=this.showModal.asObservable();
  openModal(){
    this.showModal.next(true);
  }
  closeModal(){
    this.showModal.next(false);
  }
  constructor() { }
}
