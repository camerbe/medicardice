import {Component, OnInit} from '@angular/core';
import {Catheterization, Media, Monitoring} from "../../../shared/models/welcome";
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {CatheterizationService} from "../../../shared/services/catheterization/catheterization.service";

@Component({
  selector: 'app-front-end-catheterization',
  templateUrl: './front-end-catheterization.component.html',
  styleUrl: './front-end-catheterization.component.css'
})
export class FrontEndCatheterizationComponent implements OnInit {

  currentCatheterizationImg!:string;
  currentCatheterizationTitle!:string;
  catheterizationMessage:any;
  currentLocale:string='fr';
  currentCatheterization!:Catheterization
  media!:Media

  constructor(
    private catheterizationService:CatheterizationService,
    private sanitizer: DomSanitizer,
    private metaService:Meta,
    private titleService:Title,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentLocale=this.route.snapshot.params['locale'];
    this.getCatheterization()
  }

  private getCatheterization() {
    return this.catheterizationService.getLastCatheterizationBySlug()
      .subscribe({
        next:res=>{
          // @ts-ignore
          this.currentCatheterization=res['data']
          // @ts-ignore
          this.media=this.currentCatheterization['media']
          switch (this.currentLocale){
            // @ts-ignore
            case 'en'  :
              this.currentCatheterizationTitle =this.currentCatheterization.catheterization_titre_en
              this.catheterizationMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentCatheterization.catheterization_msg_en)
              this.metaService.updateTag({name:'description',content:this.currentCatheterization.catheterization_description_en});
              this.metaService.updateTag({name:'keyword',content:this.currentCatheterization.catheterization_keyword_en});
              this.metaService.updateTag({property:'og:title',content:this.currentCatheterization.catheterization_titre_en});
              this.metaService.updateTag({property:'og:description',content:this.currentCatheterization.catheterization_description_en});
              break
            default:
            case 'fr' :
              this.currentCatheterizationTitle =this.currentCatheterization.catheterization_titre_fr
              this.catheterizationMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentCatheterization.catheterization_msg_fr)
              this.metaService.updateTag({name:'description',content:this.currentCatheterization.catheterization_description_fr});
              this.metaService.updateTag({name:'keyword',content:this.currentCatheterization.catheterization_keyword_fr});
              this.metaService.updateTag({property:'og:title',content:this.currentCatheterization.catheterization_titre_fr});
              this.metaService.updateTag({property:'og:description',content:this.currentCatheterization.catheterization_description_fr});
              break
          }
          // @ts-ignore
          if(this.media[0].original_url){
            // @ts-ignore
            this.currentCatheterizationImg=this.media[0].original_url
            this.metaService.updateTag({property:'og:image',content:this.currentCatheterizationImg});
          }
          this.titleService.setTitle(`Medicardice ${this.currentCatheterizationTitle}`)
        }
      })
  }

}
