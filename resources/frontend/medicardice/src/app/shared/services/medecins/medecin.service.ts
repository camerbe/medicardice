import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {Medecin} from "../../models/welcome";
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MedecinService extends DataService<Medecin>{

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.url+`medecins`);
  }
  getMedecinBySlug(slug:string):Observable<Medecin>{
    return this.httpClient.get<Medecin>(environment.url+`medecins/slug/${slug}`)
  }
  getLastMedecinBySlug():Observable<Medecin>{
    return this.httpClient.get<Medecin>(environment.url+`medecins/last`)
  }
  store(resource:FormData):Observable<Medecin>{
    return this.httpClient.post<Medecin>(environment.url+`medecins`,resource);
  }
  updateByFormData(id:number,resource:FormData):Observable<Medecin>{
    return this.httpClient.post<Medecin>(environment.url+`medecins/${id}`,resource);
  }
}
