import {Inject,Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {DataService} from "./data.service";
import {Stress} from "../models/welcome";
import {environment} from "../environments/environment";
import {PasswordReset} from "../models/user.response.login";

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService extends DataService<PasswordReset>{

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.url+`password`);
  }

  forgot(resource:FormData):Observable<any>{
    return this.httpClient.post<any>(environment.url+`password/forgot`,resource);
  }
  resetPassword(resource:FormData):Observable<any>{
    return this.httpClient.post<any>(environment.url+`password/reset`,resource);
  }

}
