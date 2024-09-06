import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {Patient, Slot} from "../../models/patient.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SlotService extends DataService<Slot>{

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.url+`slots`);
  }
  /*getMedecinBySlug(slug:string):Observable<Slot>{
    return this.httpClient.get<Slot>(environment.url+`patients/slug/${slug}`)
  }
  getLastMedecinBySlug():Observable<Slot>{
    return this.httpClient.get<Slot>(environment.url+`medecins/last`)
  }*/


}
