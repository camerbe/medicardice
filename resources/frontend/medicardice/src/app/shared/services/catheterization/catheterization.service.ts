import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {Catheterization, Holter, Stress} from "../../models/welcome";
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CatheterizationService  extends DataService<Catheterization>{

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.url+`catheterizations`);
  }
  getCatheterizationBySlug(slug:string):Observable<Catheterization>{
    return this.httpClient.get<Catheterization>(environment.url+`catheterizations/slug/${slug}`)
  }
  getLastCatheterizationBySlug():Observable<Catheterization>{
    return this.httpClient.get<Catheterization>(environment.url+`catheterizations/last`)
  }
  store(resource:FormData):Observable<Catheterization>{
    return this.httpClient.post<Catheterization>(environment.url+`catheterizations`,resource);
  }
  updateByFormData(id:number,resource:FormData):Observable<Catheterization>{
    return this.httpClient.post<Catheterization>(environment.url+`catheterizations/${id}`,resource);
  }



}
