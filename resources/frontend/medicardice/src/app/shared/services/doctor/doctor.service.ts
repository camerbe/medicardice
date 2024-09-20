import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {DisplayAppointment, Doctor} from "../../models/patient.model";
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DoctorService extends DataService<Doctor>{

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.url+`doctors`);
  }
  findDoctorAppointment(id:number):Observable<DisplayAppointment[]>{
    return this.httpClient.get<DisplayAppointment[]>(environment.url+`doctors/appointment/${id}`)
  }

  getDoctorId(id:number):Observable<any>{
    return this.httpClient.get<any>(environment.url+`doctors/login/${id}`)
  }
}
