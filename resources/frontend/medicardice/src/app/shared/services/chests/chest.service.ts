import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Chest} from "../../models/welcome";

@Injectable({
  providedIn: 'root'
})
export class ChestService extends DataService<Chest>{

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.url+`chests`);
  }
  getChestBySlug(slug:string):Observable<Chest>{
    return this.httpClient.get<Chest>(environment.url+`chests/slug/${slug}`)
  }
  getLastChestBySlug():Observable<Chest>{
    return this.httpClient.get<Chest>(environment.url+`chests/last`)
  }
  store(resource:FormData):Observable<Chest>{
    return this.httpClient.post<Chest>(environment.url+`chests`,resource);
  }
  updateByFormData(id:number,resource:FormData):Observable<Chest>{
    return this.httpClient.post<Chest>(environment.url+`chests/${id}`,resource);
  }
}
