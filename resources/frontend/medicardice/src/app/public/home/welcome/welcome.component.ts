import {Component, OnInit, signal} from '@angular/core';
import {WelcomeService} from "../../../shared/services/welcomes/welcome.service";
import {Media, Welcome} from "../../../shared/models/welcome";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit{
  currenWelcome!:Welcome
  media!:Media
  imgSrcSignal = signal<string | undefined>(undefined);
  //@Input({required:true}) label!:()=>string;
  /*@Input() set src(value: string) {
    this.imgSrcSignal.set(value);
  }*/


  constructor(
    private welcomeService:WelcomeService
  ) { }

  getWelcome(){
    return this.welcomeService.getLastBySlug()
      .subscribe({
        next:res=>{
          // @ts-ignore
          this.currenWelcome=res['data']
          // @ts-ignore
         //console.log(this.currenWelcome['media'])
          // @ts-ignore
          this.media=this.currenWelcome['media']
          //this.welcomeTitle.set(this.currenWelcome.welcome_titre_fr)
          //this.imgSrcSignal.set(this.media.original_url)
        }
      })
  }


  ngOnInit(): void {
    this.getWelcome();
  }
}
