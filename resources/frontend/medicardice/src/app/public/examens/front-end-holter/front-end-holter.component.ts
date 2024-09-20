import {Component, OnInit} from '@angular/core';
import {Holter, Media} from "../../../shared/models/welcome";
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {HolterService} from "../../../shared/services/holter/holter.service";

@Component({
  selector: 'app-front-end-holter',
  templateUrl: './front-end-holter.component.html',
  styleUrl: './front-end-holter.component.css'
})
export class FrontEndHolterComponent implements OnInit {
  currentHolterImg!:string;
  currentHolterTitle!:string;
  holterMessage:any;
  currentLocale:string='fr';
  currentHolter!:Holter
  media!:Media

  currentBreadCrumbCurrent=[]=[{fr: "Holter", en: 'Holter ECG'}];
  currentBreadCrumbParent= [] = [{ fr: "Examens", en: 'Exams' }];
  breadCrumbCurrent:string='';
  breadCrumbParent:string='';
  constructor(
    private holterService:HolterService,
    private sanitizer: DomSanitizer,
    private metaService:Meta,
    private titleService:Title,
    private route:ActivatedRoute
  ) {}

  private getHolter() {
    return this.holterService.getLastHolterBySlug()
      .subscribe({
        next:res=>{
          // @ts-ignore
          this.currentHolter=res['data']
          // @ts-ignore
          this.media=this.currentHolter['media']
          switch (this.currentLocale){
            // @ts-ignore
            case 'en'  :
              this.currentHolterTitle =this.currentHolter.holter_titre_en
              this.holterMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentHolter.holter_msg_en)
              this.metaService.updateTag({name:'description',content:this.currentHolter.holter_description_en});
              this.metaService.updateTag({name:'keyword',content:this.currentHolter.holter_keyword_en});
              this.metaService.updateTag({property:'og:title',content:this.currentHolter.holter_titre_en});
              this.metaService.updateTag({property:'og:description',content:this.currentHolter.holter_description_en});
              break
            default:
            case 'fr' :
              this.currentHolterTitle =this.currentHolter.holter_titre_fr
              this.holterMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentHolter.holter_msg_fr)
              this.metaService.updateTag({name:'description',content:this.currentHolter.holter_description_fr});
              this.metaService.updateTag({name:'keyword',content:this.currentHolter.holter_keyword_fr});
              this.metaService.updateTag({property:'og:title',content:this.currentHolter.holter_titre_fr});
              this.metaService.updateTag({property:'og:description',content:this.currentHolter.holter_description_fr});
              break
          }
          // @ts-ignore
          if(this.media[0].original_url){
            // @ts-ignore
            this.currentHolterImg=this.media[0].original_url
            this.metaService.updateTag({property:'og:image',content:this.currentHolterImg});
          }
          this.titleService.setTitle(`Medicardice ${this.currentHolterTitle}`)
        }
      })
  }

  ngOnInit(): void {
    this.currentLocale=this.route.snapshot.params['locale'];
    this.breadCrumbParent=this.getBreadCrumb(this.currentLocale);
    this.breadCrumbCurrent=this.getBreadCrumbCurrent(this.currentLocale);
    this.getHolter();
  }
  getBreadCrumb(locale:string){
    const breadcrumb= locale==='fr'? this.currentBreadCrumbParent.map(item=>item.fr):this.currentBreadCrumbParent.map(item=>item.en);
    return breadcrumb[0]
  }
  getBreadCrumbCurrent(locale:string){
    const breadcrumb= locale==='fr'? this.currentBreadCrumbCurrent.map(item=>item.fr):this.currentBreadCrumbCurrent.map(item=>item.en);
    return breadcrumb[0]
  }
}
