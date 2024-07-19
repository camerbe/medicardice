import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../shared/environments/environment";
import {Profile, UserLogin} from "../shared/models/user.response.login";



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
      //.pipe(catchError(this.errorHandler()))

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
  private errorHandler(errorRes:HttpErrorResponse){
    let errorMessage='An unknow error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return new Error(errorMessage)
    }
    return new Error(errorRes.error.message);
  }
}
