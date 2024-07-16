import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {AuthService} from "../../public/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ObservableService {
  expired!:boolean;
  isExpiredSubject=new Subject<boolean>();
  emitExpiredObs(){
    this.expired=this.authService.isExpired()
    return this.isExpiredSubject.next(this.expired);
  }


  setExpiredToken(){
     this.emitExpiredObs()
  }
  constructor(private authService:AuthService) {
  }
}
