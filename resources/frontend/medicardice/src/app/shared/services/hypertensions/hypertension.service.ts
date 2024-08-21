import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Hypertension} from "../../models/welcome";

@Injectable({
  providedIn: 'root'
})
export class HypertensionService extends DataService<Hypertension>{

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.url+`hypertensions`);
  }
  getHolterBySlug(slug:string):Observable<Hypertension>{
    return this.httpClient.get<Hypertension>(environment.url+`hypertensions/slug/${slug}`)
  }
  getLastHolterBySlug():Observable<Hypertension>{
    return this.httpClient.get<Hypertension>(environment.url+`hypertensions/last`)
  }
  store(resource:FormData):Observable<Hypertension>{
    return this.httpClient.post<Hypertension>(environment.url+`hypertensions`,resource);
  }
  updateByFormData(id:number,resource:FormData):Observable<Hypertension>{
    return this.httpClient.post<Hypertension>(environment.url+`hypertensions/${id}`,resource);
  }
}
