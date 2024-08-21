import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {Heart} from "../../models/welcome";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeartService extends DataService<Heart>{

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.url+`hearts`);
  }
  getHeartBySlug(slug:string):Observable<Heart>{
    return this.httpClient.get<Heart>(environment.url+`hearts/slug/${slug}`)
  }
  getLastHeartBySlug():Observable<Heart>{
    return this.httpClient.get<Heart>(environment.url+`hearts/last`)
  }
  store(resource:FormData):Observable<Heart>{
    return this.httpClient.post<Heart>(environment.url+`hearts`,resource);
  }
  updateByFormData(id:number,resource:FormData):Observable<Heart>{
    return this.httpClient.post<Heart>(environment.url+`hearts/${id}`,resource);
  }


}
