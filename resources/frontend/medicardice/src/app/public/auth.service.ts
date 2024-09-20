import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {environment} from "../shared/environments/environment";
import {Profile, UserLogin} from "../shared/models/user.response.login";
import {isPlatformBrowser} from "@angular/common";
import {ExpiresAtService} from "../shared/services/expires-at.service";
import {Router} from "@angular/router";



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
    private httpClient:HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
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
    if(isPlatformBrowser(this.platformId)){
      const expires_at=localStorage.getItem('expires_at')!
      //console.log(formattedDate);
      return !(expires_at > currentDate)
    }
    return true
  }

  checkExpires(authS:AuthService,exService:ExpiresAtService,isExpired:boolean,router:Router){
    exService.updateState(authS.isExpired());
    exService.state$.subscribe(res=>isExpired=res);
    if(isExpired){
      if(isPlatformBrowser(this.platformId)){
        localStorage.clear();
      }

      router.navigateByUrl('login')
        .then(()=>{
          router.navigate([router.url])
        })
    }
  }

}
