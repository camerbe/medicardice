import {Component, Inject, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {Coronaryangioplasty} from "../../../../shared/models/welcome";
import {AuthService} from "../../../../public/auth.service";
import {Router} from "@angular/router";
import {ExpiresAtService} from "../../../../shared/services/expires-at.service";
import {CoronaryangioplastyService} from "../../../../shared/services/coronaryangioplasty/coronaryangioplasty.service";

@Component({
  selector: 'app-coronaryangioplasty-list',
  templateUrl: './coronaryangioplasty-list.component.html',
  styleUrl: './coronaryangioplasty-list.component.css'
})
export class CoronaryangioplastyListComponent implements OnInit {

  userData: Coronaryangioplasty[]=[];
  isExpired!:boolean;
  url=signal("/dashboard/coronaryangioplastie/add");
  label=signal('nouvelle coronaryangioplastie');
  labelTitle=signal('');
  items!:Coronaryangioplasty[];

  constructor(
    private authService:AuthService,
    private router:Router,
    private expireService:ExpiresAtService,
    private coronaryangioplastyService:CoronaryangioplastyService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  ngOnInit(): void {
    this.authService.checkExpires(this.authService,this.expireService,this.isExpired,this.router);
    this.getAll();
  }

  private getAll(){
    return this.coronaryangioplastyService.getAll()
      .subscribe({
        next:res=>{
          const dataKey:string="data"
          // @ts-ignore
          this.userData=res[dataKey]
          // @ts-ignore
          this.labelTitle.set(res.message)
        }
      })
  }

  deleteCoronaryangioplasty(id: number) {

  }
}
