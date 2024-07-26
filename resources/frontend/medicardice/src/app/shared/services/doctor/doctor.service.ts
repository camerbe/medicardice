import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {Doctor} from "../../models/patient.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DoctorService extends DataService<Doctor>{

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.url+`doctors`);
  }
}
