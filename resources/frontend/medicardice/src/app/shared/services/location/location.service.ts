import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Location} from "../../models/welcome";

@Injectable({
  providedIn: 'root'
})
export class LocationService extends DataService<Location>{

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.url+`locations`);
  }
  getLocationBySlug(slug:string):Observable<Location>{
    return this.httpClient.get<Location>(environment.url+`locations/slug/${slug}`)
  }
  getLastLocationBySlug():Observable<Location>{
    return this.httpClient.get<Location>(environment.url+`locations/last`)
  }
  store(resource:FormData):Observable<Location>{
    return this.httpClient.post<Location>(environment.url+`locations`,resource);
  }
  updateByFormData(id:number,resource:FormData):Observable<Location>{
    return this.httpClient.post<Location>(environment.url+`locations/${id}`,resource);
  }
}
