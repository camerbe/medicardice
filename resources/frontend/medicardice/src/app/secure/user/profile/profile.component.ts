import {Component, OnDestroy, OnInit} from '@angular/core';
import {Profile} from "../../../shared/models/user.response.login";
import {Subscription} from "rxjs";
import {ProfileObservableService} from "../../../shared/services/profile-observable.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../public/auth.service";
import {ExpiresAtService} from "../../../shared/services/expires-at.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit,OnDestroy{
  currentUser!:Profile;
  subscription=new Subscription();
  isExpired!:boolean;
  constructor(
    private observableService:ProfileObservableService,
    private router:Router,
    private authService:AuthService,
    private expireService:ExpiresAtService
  ) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {
    this.expireService.updateState(this.authService.isExpired());
    this.expireService.state$.subscribe(res=>this.isExpired=res);
    if(this.isExpired){
      /*const token =`Bearer `+localStorage.getItem('token');
      this.authService.logout(token)
        .subscribe(res=>console.log(res))*/
      localStorage.clear()
      this.router.navigateByUrl('login',{replaceUrl:true})
        .then(()=>{
          this.router.navigate([this.router.url])
        })

    }
    this.subscription.add(
      this.observableService.subjectProfile.subscribe(res=>{
        this.currentUser=res
        localStorage.setItem('role',this.currentUser.role)
        //console.log(this.currentUser)
      })
    )

  }
}
