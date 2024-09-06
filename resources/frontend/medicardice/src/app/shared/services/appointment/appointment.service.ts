import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Appointment, Slot} from "../../models/patient.model";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends DataService<Appointment>{

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.url+`appointments`);
  }


  getSlots():Observable<Slot>{
    return this.httpClient.get<Slot>(environment.url+`appointments/slot`)
  }
  getDoctors():Observable<any>{
    return this.httpClient.get<any>(environment.url+`appointments/doctor`)
  }
}
