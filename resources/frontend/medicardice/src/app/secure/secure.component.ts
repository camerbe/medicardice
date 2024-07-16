import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ObservableService} from "../shared/services/observable.service";
import {Profile} from "../shared/models/user.response.login";
import {ProfileObservableService} from "../shared/services/profile-observable.service";
import {AuthService} from "../public/auth.service";
import {Router} from "@angular/router";
import {ExpiresAtService} from "../shared/services/expires-at.service";

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrl: './secure.component.css'
})
export class SecureComponent implements OnInit,OnDestroy{
  subscription= new Subscription()
  currentUser!:Profile;
  isExpired!:boolean;
  constructor(
    private observableService:ProfileObservableService,
    private obs:ObservableService,
    private beheviorService:ExpiresAtService,
    private authService:AuthService,
    private router :Router

  ) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.beheviorService.state$.subscribe(res => {
        this.isExpired=res

      })
    )
    if (this.isExpired){
      /*const token =`Bearer `+localStorage.getItem('token');
      //
      this.authService.logout(token)
        .subscribe(res=>console.log(res))*/
      localStorage.removeItem('token');
      localStorage.removeItem('expires_at');
      this.router.navigateByUrl('login',{skipLocationChange:true})
        .then(()=>{
          this.router.navigate([this.router.url])
        })
      //this.router.navigate(['login'])
    }

    this.subscription.add(

      this.authService.profile()
       .subscribe(res=>this.observableService.setProfileObs(res))
    )
  this.observableService.subjectProfile.subscribe(res=>{
    this.currentUser=res
 })


  this.router.navigate(['/dashboard/profile'])
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleProfile() {
    this.observableService.setProfileObs(this.currentUser)
    console.log(`Is Expired : ${this.isExpired}`)
    //this.observableService.subjectProfile.subscribe(res=>console.log(res))
  }
}
