import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {Medecin} from "../../models/welcome";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {DisplayAppointment, Patient} from "../../models/patient.model";

@Injectable({
  providedIn: 'root'
})
export class PatientService extends DataService<Patient>{

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.url+`patients`);
  }
  /*getMedecinBySlug(slug:string):Observable<Patient>{
    return this.httpClient.get<Patient>(environment.url+`patients/slug/${slug}`)
  }
  getLastMedecinBySlug():Observable<Patient>{
    return this.httpClient.get<Patient>(environment.url+`medecins/last`)
  }*/
  store(resource:FormData):Observable<Patient>{
    return this.httpClient.post<Patient>(environment.url+`patients`,resource);
  }
  register(resource:Patient):Observable<Patient>{
    return this.httpClient.post<Patient>(environment.url+`patients/register`,resource);
  }
  updateByFormData(id:number,resource:FormData):Observable<Patient>{
    return this.httpClient.post<Patient>(environment.url+`patients/${id}`,resource);
  }

  findPatientAppointment(id:number):Observable<DisplayAppointment[]>{
    return this.httpClient.get<DisplayAppointment[]>(environment.url+`patients/appointment/${id}`)
  }
  getPatientId(id:number):Observable<any>{
    return this.httpClient.get<any>(environment.url+`patients/login/${id}`)
  }
}
