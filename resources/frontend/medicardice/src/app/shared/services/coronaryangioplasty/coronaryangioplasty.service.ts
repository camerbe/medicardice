import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {Coronaryangioplasty} from "../../models/welcome";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CoronaryangioplastyService extends DataService<Coronaryangioplasty>{

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.url+`coronaryangioplasties`);
  }
  getHolterBySlug(slug:string):Observable<Coronaryangioplasty>{
    return this.httpClient.get<Coronaryangioplasty>(environment.url+`coronaryangioplasties/slug/${slug}`)
  }
  getLastCoronaryangioplastyBySlug():Observable<Coronaryangioplasty>{
    return this.httpClient.get<Coronaryangioplasty>(environment.url+`coronaryangioplasties/last`)
  }
  store(resource:FormData):Observable<Coronaryangioplasty>{
    return this.httpClient.post<Coronaryangioplasty>(environment.url+`coronaryangioplasties`,resource);
  }
  updateByFormData(id:number,resource:FormData):Observable<Coronaryangioplasty>{
    return this.httpClient.post<Coronaryangioplasty>(environment.url+`coronaryangioplasties/${id}`,resource);
  }


}
