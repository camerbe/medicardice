import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../shared/environments/environment";
import {Profile, UserLogin, UserProfile, UserResponseLogin} from "../shared/models/user.response.login";

interface Credentials{
  email:string,
  password:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl=environment.url
  constructor(
    private httpClient:HttpClient
  ) { }
  login(credential:Credentials){
    return this.httpClient.post<UserLogin>(this.baseUrl+`auth/login`,credential)

  }
  profile(){
    return this.httpClient.get<Profile>(this.baseUrl+`auth/profile`)
  }
  logout(resource:any){
    return this.httpClient.post<any>(this.baseUrl+`auth/logout`,{resource})
  }
  isExpired(){
    const date=new Date();
    const currentDate=date.toISOString().slice(0,10)+ date.toLocaleString().slice(10);
    const expires_at=localStorage.getItem('expires_at')!
    //console.log(formattedDate);
    return !(expires_at > currentDate)
  }
}
