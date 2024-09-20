import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Profile} from "../models/user.response.login";

@Injectable({
  providedIn: 'root'
})
export class PatientIdService {

  subjectPatientID:Subject<number>=new Subject<number>();
  subjectDoctorID:Subject<number>=new Subject<number>();
  subjectUserID:Subject<number>=new Subject<number>();

  private value: number=0;
  private docValue: number=0;
  private userValue: number=0;
  emitPatientIDObs(){
    return this.subjectPatientID.next(this.value);
  }
  emitDoctorIDObs(){
    return this.subjectDoctorID.next(this.docValue);
  }
  emitUserIDObs(){
    return this.subjectUserID.next(this.userValue);
  }
  setPatientIDObs(value:number){
    this.value=value;
    this.emitPatientIDObs();
  }
  setDoctorIDObs(value:number){
    this.docValue=value;
    this.emitDoctorIDObs();
  }
  setUserIDObs(value:number){
    this.userValue=value;
    this.emitUserIDObs();
  }
  public getPatientIdObs(){
    return this.value
  }
  public getDoctorIdObs(){
    return this.docValue
  }
  public getUserIdObs(){
    return this.userValue
  }
}
