import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Echocardiographie, Stress} from "../../models/welcome";

@Injectable({
  providedIn: 'root'
})
export class StressService extends DataService<Stress>{

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.url+`stress`);
  }
  getStressBySlug(slug:string):Observable<Stress>{
    return this.httpClient.get<Stress>(environment.url+`stress/slug/${slug}`)
  }
  getLastStressBySlug():Observable<Stress>{
    return this.httpClient.get<Stress>(environment.url+`stress/last`)
  }
  store(resource:FormData):Observable<Stress>{
    return this.httpClient.post<Stress>(environment.url+`stress`,resource);
  }
  updateByFormData(id:number,resource:FormData):Observable<Stress>{
    return this.httpClient.post<Stress>(environment.url+`stress/${id}`,resource);
  }
}
