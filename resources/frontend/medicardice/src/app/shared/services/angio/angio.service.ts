import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {Angio} from "../../models/welcome";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AngioService  extends DataService<Angio>{

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.url+`angios`);
  }
  getAngioBySlug(slug:string):Observable<Angio>{
    return this.httpClient.get<Angio>(environment.url+`angios/slug/${slug}`)
  }
  getLastAngioBySlug():Observable<Angio>{
    return this.httpClient.get<Angio>(environment.url+`angios/last`)
  }
  store(resource:FormData):Observable<Angio>{
    return this.httpClient.post<Angio>(environment.url+`angios`,resource);
  }
  updateByFormData(id:number,resource:FormData):Observable<Angio>{
    return this.httpClient.post<Angio>(environment.url+`angios/${id}`,resource);
  }


}
