import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {Monitoring} from "../../models/welcome";
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MonitoringService extends DataService<Monitoring>{

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.url+`monitorings`);
  }
  getMonitoringBySlug(slug:string):Observable<Monitoring>{
    return this.httpClient.get<Monitoring>(environment.url+`monitorings/slug/${slug}`)
  }
  getLastMonitoringBySlug():Observable<Monitoring>{
    return this.httpClient.get<Monitoring>(environment.url+`monitorings/last`)
  }
  store(resource:FormData):Observable<Monitoring>{
    return this.httpClient.post<Monitoring>(environment.url+`monitorings`,resource);
  }
  updateByFormData(id:number,resource:FormData):Observable<Monitoring>{
    return this.httpClient.post<Monitoring>(environment.url+`monitorings/${id}`,resource);
  }


}
