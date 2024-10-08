import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {Hypertension, Welcome} from "../../models/welcome";
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class WelcomeService extends DataService<Welcome>{

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.url+`welcomes`);
  }
  getWelcomeBySlug(slug:string):Observable<Welcome>{
    return this.httpClient.get<Welcome>(environment.url+`welcomes/slug/${slug}`)
  }
  getLastBySlug():Observable<Welcome>{
    return this.httpClient.get<Welcome>(environment.url+`welcomes/last`)
  }
  store(resource:FormData):Observable<Welcome>{
    return this.httpClient.post<Welcome>(environment.url+`welcomes`,resource);
  }
  updateByFormData(id:number,resource:FormData):Observable<Welcome>{
    return this.httpClient.post<Welcome>(environment.url+`welcomes/${id}`,resource);
  }
}
