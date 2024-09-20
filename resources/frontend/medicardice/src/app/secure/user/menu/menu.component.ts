import {Component, Inject, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {Router} from "@angular/router";
import {isPlatformBrowser} from "@angular/common";
import {ExpiresAtService} from "../../../shared/services/expires-at.service";
import {AuthService} from "../../../public/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  isExpired!:boolean;
  selectedOption!: string;
  childTitle=signal('créer')
  constructor(
    private authService:AuthService,
    private expireService:ExpiresAtService,
    private router:Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }
  private checkExpires(){
    this.expireService.updateState(this.authService.isExpired());
    this.expireService.state$.subscribe(res=>this.isExpired=res);
    if(this.isExpired){
      if(isPlatformBrowser(this.platformId)){
        localStorage.clear();
      }

      this.router.navigateByUrl('login',{replaceUrl:true})
        .then(()=>{
          this.router.navigate([this.router.url])
        })
    }
  }
  chooseRole(event: Event) {
    this.checkExpires();
    const target=event.target as HTMLButtonElement

    // @ts-ignore
    switch((target.value).toString()){
      case 'Admin':
        // @ts-ignore

        this.router.navigate(['dashboard/user/add']);
        break;
      case 'Doctor':
        this.router.navigate(['dashboard/doctor/add']);
        break;
      case 'Secretary':
        this.router.navigate(['dashboard/user/add']);
        break;
    }
  }

  ngOnInit(): void {
    this.checkExpires()
  }


}
