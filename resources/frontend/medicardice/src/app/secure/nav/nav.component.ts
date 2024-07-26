import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {AuthService} from "../../public/auth.service";
import {Profile} from "../../shared/models/user.response.login";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ProfileObservableService} from "../../shared/services/profile-observable.service";
import {ExpiresAtService} from "../../shared/services/expires-at.service";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit,OnDestroy{
  userProfile!:Profile;
  subscription=new Subscription();
  isExpired!:boolean;
  constructor(
    private authService:AuthService,
    private router:Router,
    private observableService:ProfileObservableService,
    private expiredService:ExpiresAtService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngOnInit(): void {
    this.expiredService.updateState(this.authService.isExpired())
    this.expiredService.state$.subscribe(res=>this.isExpired=res)
    if(this.isExpired){
      //const token =`Bearer `+localStorage.getItem('token');
      //
      /*this.authService.logout(token)
        .subscribe(res=>console.log(res))*/
      if(isPlatformBrowser(this.platformId)) localStorage.clear()

      this.router.navigateByUrl('login',{replaceUrl:true})
        .then(()=>{
          this.router.navigate([this.router.url])
        })
      //this.router.navigate(['login'])
    }
    this.observableService.subjectProfile.subscribe(res=>{
      this.userProfile=res

    })

  }

  logout() {
    const token =`Bearer `+localStorage.getItem('token');
    //
    this.authService.logout(token)
      .subscribe(res=>console.log(res))
    localStorage.clear()
    this.observableService.setProfileObs(this.userProfile)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
