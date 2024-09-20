import { Injectable } from '@angular/core';
import {AuthService} from "../../public/auth.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExpiresAtService {

  constructor(private authService:AuthService) { }
  private stateSubject = new BehaviorSubject<boolean>(false);
  state$ = this.stateSubject.asObservable();

  updateState(newState: boolean): void {
    this.stateSubject.next(this.authService.isExpired());
  }
}
