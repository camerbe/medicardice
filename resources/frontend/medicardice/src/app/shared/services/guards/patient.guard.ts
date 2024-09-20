import {CanActivateFn, Router} from '@angular/router';
import {inject, PLATFORM_ID} from "@angular/core";
import {AuthService} from "../../../public/auth.service";
import {isPlatformBrowser} from "@angular/common";

export const patientGuard: CanActivateFn = (route, state) => {
  const authService=inject(AuthService);
  const router=inject(Router);
  const platformId = inject(PLATFORM_ID);

  if(authService.isExpired()) {
    if(isPlatformBrowser(platformId)){
      localStorage.removeItem('role')
      localStorage.clear()
    }

    return false;
  }
  const requiredRoles=['Doctor','Patient']
  const userRoles:string | null = localStorage.getItem('role');
  if(userRoles===null) return false
  // @ts-ignore
  if(!requiredRoles.some(role => userRoles.includes(role))){
    if(isPlatformBrowser(platformId)){
      localStorage.removeItem('role')
      localStorage.clear()
    }
    return false;
  }
  return true;
};
