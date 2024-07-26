import { HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser} from "@angular/common";
import {inject, PLATFORM_ID} from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token
  const platformId = inject(PLATFORM_ID);
  if(isPlatformBrowser(platformId)){
     token=localStorage.getItem('token');
  }

  const authReq= req.clone({
    setHeaders:{
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers':'*',
      'Content-Type':'application/json',
      'Accept':'*/*',
      'mode': 'no-cors',
      'Authorization':`Bearer ${token}`
    }
  })
  //console.log(token)
  return next(authReq);
};
