import { Injectable } from '@angular/core';
import {Profile} from "../models/user.response.login";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileObservableService {

  userProfile!:Profile;
  subjectProfile:Subject<Profile>=new Subject<Profile>();
  emitProfileObs(){
    return this.subjectProfile.next(this.userProfile);
  }
  setProfileObs(userprofile:Profile){
    this.userProfile=userprofile;
    this.emitProfileObs();
  }

}
