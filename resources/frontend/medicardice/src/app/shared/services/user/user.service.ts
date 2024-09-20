import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {User} from "../../models/user.response.login";
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService<User>{

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.url+`users`);
  }
  changePassword(resource:any,id:number):Observable<User>{
    return this.httpClient.put<User>(environment.url+`users/changepassword/${id}`,JSON.stringify(resource))
  }

}
