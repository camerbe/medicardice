import {Component, OnInit} from '@angular/core';
import {Angio, Hypertension, Media} from "../../../shared/models/welcome";
import {AngioService} from "../../../shared/services/angio/angio.service";
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {HypertensionService} from "../../../shared/services/hypertensions/hypertension.service";

@Component({
  selector: 'app-front-end-hypertension',
  templateUrl: './front-end-hypertension.component.html',
  styleUrl: './front-end-hypertension.component.css'
})
export class FrontEndHypertensionComponent implements OnInit{

  currentBreadCrumbCurrent=[]=[{fr: "hypertension artérielle", en: 'Hypertension'}];
  currentBreadCrumbParent= [] = [{ fr: "Dossiers", en: 'Files' }];
  breadCrumbCurrent:string='';
  breadCrumbParent:string='';

  currentHypertensionImg!:string;
  currentHypertensionTitle!:string;
  hypertensionMessage:any;
  currentLocale!:string;
  currentHypertension!:Hypertension
  media!:Media

  constructor(
    private hypertensionService:HypertensionService,
    private sanitizer: DomSanitizer,
    private metaService:Meta,
    private titleService:Title,
    private route:ActivatedRoute
  ) {}

  private getHypertension() {
    return this.hypertensionService.getLastHolterBySlug()
      .subscribe({
        next:res=>{
          // @ts-ignore
          this.currentHypertension=res['data']
          // @ts-ignore
          this.media=this.currentHypertension['media']
          switch (this.currentLocale){
            // @ts-ignore
            case 'en'  :
              this.currentHypertensionTitle =this.currentHypertension.hypertension_titre_en
              this.hypertensionMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentHypertension.hypertension_msg_en)
              this.metaService.updateTag({name:'description',content:this.currentHypertension.hypertension_description_en});
              this.metaService.updateTag({name:'keyword',content:this.currentHypertension.hypertension_keyword_en});
              this.metaService.updateTag({property:'og:title',content:this.currentHypertension.hypertension_titre_en});
              this.metaService.updateTag({property:'og:description',content:this.currentHypertension.hypertension_description_en});
              break
            default:
            case 'fr' :
              this.currentHypertensionTitle =this.currentHypertension.hypertension_titre_fr
              this.hypertensionMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentHypertension.hypertension_msg_fr)
              this.metaService.updateTag({name:'description',content:this.currentHypertension.hypertension_description_fr});
              this.metaService.updateTag({name:'keyword',content:this.currentHypertension.hypertension_keyword_fr});
              this.metaService.updateTag({property:'og:title',content:this.currentHypertension.hypertension_titre_fr});
              this.metaService.updateTag({property:'og:description',content:this.currentHypertension.hypertension_description_fr});
              break
          }
          // @ts-ignore
          if(this.media[0].original_url){
            // @ts-ignore
            this.currentHypertensionImg=this.media[0].original_url
            this.metaService.updateTag({property:'og:image',content:this.currentHypertensionImg});
          }
          this.titleService.setTitle(`Medicardice ${this.currentHypertensionTitle}`)
        }
      })
  }
  getBreadCrumb(locale:string){
    const breadcrumb= locale==='fr'? this.currentBreadCrumbParent.map(item=>item.fr):this.currentBreadCrumbParent.map(item=>item.en);
    return breadcrumb[0]
  }
  getBreadCrumbCurrent(locale:string){
    const breadcrumb= locale==='fr'? this.currentBreadCrumbCurrent.map(item=>item.fr):this.currentBreadCrumbCurrent.map(item=>item.en);
    return breadcrumb[0]
  }
  ngOnInit(): void {
    this.currentLocale=this.route.snapshot.params['locale'];
    this.breadCrumbParent=this.getBreadCrumb(this.currentLocale);
    this.breadCrumbCurrent=this.getBreadCrumbCurrent(this.currentLocale);
    this.getHypertension()
  }

}
