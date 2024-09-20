import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Consultation} from "../../models/welcome";
import {DataService} from "../data.service";

@Injectable({
  providedIn: 'root'
})
export class ConsultationService extends DataService<Consultation>{

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.url+`consultations`);
  }
  getConsultationBySlug(slug:string):Observable<Consultation>{
    return this.httpClient.get<Consultation>(environment.url+`consultations/slug/${slug}`)
  }
  getLastConsultationBySlug():Observable<Consultation>{
    return this.httpClient.get<Consultation>(environment.url+`consultations/last`)
  }
  store(resource:FormData):Observable<Consultation>{
    return this.httpClient.post<Consultation>(environment.url+`consultations`,resource);
  }
  updateByFormData(id:number,resource:FormData):Observable<Consultation>{
    return this.httpClient.post<Consultation>(environment.url+`consultations/${id}`,resource);
  }
}
