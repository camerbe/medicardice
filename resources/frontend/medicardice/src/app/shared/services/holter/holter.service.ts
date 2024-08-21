import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {Holter, Stress} from "../../models/welcome";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HolterService extends DataService<Holter>{

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.url+`holters`);
  }
  getHolterBySlug(slug:string):Observable<Holter>{
    return this.httpClient.get<Holter>(environment.url+`holters/slug/${slug}`)
  }
  getLastHolterBySlug():Observable<Holter>{
    return this.httpClient.get<Holter>(environment.url+`holters/last`)
  }
  store(resource:FormData):Observable<Holter>{
    return this.httpClient.post<Holter>(environment.url+`holters`,resource);
  }
  updateByFormData(id:number,resource:FormData):Observable<Holter>{
    return this.httpClient.post<Holter>(environment.url+`holters/${id}`,resource);
  }


}
