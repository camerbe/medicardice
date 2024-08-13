import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {Electrocardiographie} from "../../models/welcome";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ElectrocardiographieService extends DataService<Electrocardiographie> {

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.url+`electrocardiographies`);
  }
  getMedecinBySlug(slug:string):Observable<Electrocardiographie>{
    return this.httpClient.get<Electrocardiographie>(environment.url+`electrocardiographies/slug/${slug}`)
  }
  getLastElectrocardiographieBySlug():Observable<Electrocardiographie>{
    return this.httpClient.get<Electrocardiographie>(environment.url+`electrocardiographies/last`)
  }
  store(resource:FormData):Observable<Electrocardiographie>{
    return this.httpClient.post<Electrocardiographie>(environment.url+`electrocardiographies`,resource);
  }
  updateByFormData(id:number,resource:FormData):Observable<Electrocardiographie>{
    return this.httpClient.post<Electrocardiographie>(environment.url+`electrocardiographies/${id}`,resource);
  }
}
