import {Component, OnInit} from '@angular/core';
import {Coronaryangioplasty, Media} from "../../../shared/models/welcome";
import {CatheterizationService} from "../../../shared/services/catheterization/catheterization.service";
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {CoronaryangioplastyService} from "../../../shared/services/coronaryangioplasty/coronaryangioplasty.service";

@Component({
  selector: 'app-front-end-coronaryangioplasty',
  templateUrl: './front-end-coronaryangioplasty.component.html',
  styleUrl: './front-end-coronaryangioplasty.component.css'
})
export class FrontEndCoronaryangioplastyComponent implements OnInit {

  currentCoronaryangioplastyImg!:string;
  currentCoronaryangioplastyTitle!:string;
  coronaryangioplastyMessage:any;
  currentLocale:string='fr';
  currentCoronaryangioplasty!:Coronaryangioplasty
  media!:Media

  constructor(
    private coronaryangioplastyService:CoronaryangioplastyService,
    private sanitizer: DomSanitizer,
    private metaService:Meta,
    private titleService:Title,
    private route:ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.currentLocale=this.route.snapshot.params['locale'];
    this.getCoronaryangioplasty()
  }

  private getCoronaryangioplasty() {
    // @ts-ignore
    return this.coronaryangioplastyService.getLastCoronaryangioplastyBySlug()
      .subscribe({
        next:res=>{
          // @ts-ignore
          this.currentCoronaryangioplasty=res['data']
          // @ts-ignore
          this.media=this.currentCoronaryangioplasty['media']
          switch (this.currentLocale){
            // @ts-ignore
            case 'en'  :
              this.currentCoronaryangioplastyTitle =this.currentCoronaryangioplasty.coronaryangioplasty_titre_en
              this.coronaryangioplastyMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentCoronaryangioplasty.coronaryangioplasty_msg_en)
              this.metaService.updateTag({name:'description',content:this.currentCoronaryangioplasty.coronaryangioplasty_description_en});
              this.metaService.updateTag({name:'keyword',content:this.currentCoronaryangioplasty.coronaryangioplasty_keyword_en});
              this.metaService.updateTag({property:'og:title',content:this.currentCoronaryangioplasty.coronaryangioplasty_titre_en});
              this.metaService.updateTag({property:'og:description',content:this.currentCoronaryangioplasty.coronaryangioplasty_description_en});
              break
            default:
            case 'fr' :
              this.currentCoronaryangioplastyTitle =this.currentCoronaryangioplasty.coronaryangioplasty_titre_fr
              this.coronaryangioplastyMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentCoronaryangioplasty.coronaryangioplasty_msg_fr)
              this.metaService.updateTag({name:'description',content:this.currentCoronaryangioplasty.coronaryangioplasty_description_fr});
              this.metaService.updateTag({name:'keyword',content:this.currentCoronaryangioplasty.coronaryangioplasty_keyword_fr});
              this.metaService.updateTag({property:'og:title',content:this.currentCoronaryangioplasty.coronaryangioplasty_titre_fr});
              this.metaService.updateTag({property:'og:description',content:this.currentCoronaryangioplasty.coronaryangioplasty_description_fr});
              break
          }
          // @ts-ignore
          if(this.media[0].original_url){
            // @ts-ignore
            this.currentCoronaryangioplastyImg=this.media[0].original_url
            this.metaService.updateTag({property:'og:image',content:this.currentCoronaryangioplastyImg});
          }
          this.titleService.setTitle(`Medicardice ${this.currentCoronaryangioplastyTitle}`)
        }
      })
  }

}
