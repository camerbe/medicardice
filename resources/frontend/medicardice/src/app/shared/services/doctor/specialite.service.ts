import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {Specialite} from "../../models/user.response.login";
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService extends DataService<Specialite>{

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.url+`specialites`);
  }
}
