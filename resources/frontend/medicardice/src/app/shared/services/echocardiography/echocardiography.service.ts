import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {Echocardiographie} from "../../models/welcome";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EchocardiographyService extends DataService<Echocardiographie> {

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.url+`echocardiographies`);
  }
  getEchocardiographieBySlug(slug:string):Observable<Echocardiographie>{
    return this.httpClient.get<Echocardiographie>(environment.url+`echocardiographies/slug/${slug}`)
  }
  getLastEchocardiographieBySlug():Observable<Echocardiographie>{
    return this.httpClient.get<Echocardiographie>(environment.url+`echocardiographies/last`)
  }
  store(resource:FormData):Observable<Echocardiographie>{
    return this.httpClient.post<Echocardiographie>(environment.url+`echocardiographies`,resource);
  }
  updateByFormData(id:number,resource:FormData):Observable<Echocardiographie>{
    return this.httpClient.post<Echocardiographie>(environment.url+`echocardiographies/${id}`,resource);
  }
}
