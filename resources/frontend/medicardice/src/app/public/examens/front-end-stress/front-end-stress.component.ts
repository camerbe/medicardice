import {Component, OnInit} from '@angular/core';
import {Media, Stress} from "../../../shared/models/welcome";
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {StressService} from "../../../shared/services/stress/stress.service";

@Component({
  selector: 'app-front-end-stress',
  templateUrl: './front-end-stress.component.html',
  styleUrl: './front-end-stress.component.css'
})
export class FrontEndStressComponent implements OnInit{
  currentStressImg!:string;
  currentStressTitle!:string;
  stressMessage:any;
  currentLocale:string='fr';

  currentStress!:Stress
  media!:Media

  constructor(
    private stressService:StressService,
    private sanitizer: DomSanitizer,
    private metaService:Meta,
    private titleService:Title,
    private route:ActivatedRoute
  ) {}

  private getStress() {
    return this.stressService.getLastStressBySlug()
      .subscribe({
        next:res=>{
          // @ts-ignore
          this.currentStress=res['data']
          // @ts-ignore
          this.media=this.currentStress['media']
          switch (this.currentLocale){
            // @ts-ignore
            case 'en'  :
              this.currentStressTitle =this.currentStress.stress_titre_en
              this.stressMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentStress.stress_msg_en)
              this.metaService.updateTag({name:'description',content:this.currentStress.stress_description_en});
              this.metaService.updateTag({name:'keyword',content:this.currentStress.stress_keyword_en});
              this.metaService.updateTag({property:'og:title',content:this.currentStress.stress_titre_en});
              this.metaService.updateTag({property:'og:description',content:this.currentStress.stress_description_en});
              break
            default:
            case 'fr' :
              this.currentStressTitle =this.currentStress.stress_titre_fr
              this.stressMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentStress.stress_msg_fr)
              this.metaService.updateTag({name:'description',content:this.currentStress.stress_description_fr});
              this.metaService.updateTag({name:'keyword',content:this.currentStress.stress_keyword_fr});
              this.metaService.updateTag({property:'og:title',content:this.currentStress.stress_titre_fr});
              this.metaService.updateTag({property:'og:description',content:this.currentStress.stress_description_fr});
              break
          }
          // @ts-ignore
          if(this.media[0].original_url){
            // @ts-ignore
            this.currentStressImg=this.media[0].original_url
            this.metaService.updateTag({property:'og:image',content:this.currentStressImg});
          }
          this.titleService.setTitle(`Medicardice ${this.currentStressTitle}`)
        }
      })
  }
  ngOnInit(): void {
    this.currentLocale=this.route.snapshot.params['locale'];
    this.getStress()
  }
}
