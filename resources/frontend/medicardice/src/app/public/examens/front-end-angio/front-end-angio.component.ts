import {Component, OnInit} from '@angular/core';
import {Angio, Media} from "../../../shared/models/welcome";
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {AngioService} from "../../../shared/services/angio/angio.service";

@Component({
  selector: 'app-front-end-angio',
  templateUrl: './front-end-angio.component.html',
  styleUrl: './front-end-angio.component.css'
})
export class FrontEndAngioComponent  implements OnInit {

  currentBreadCrumbCurrent=[]=[{fr: "L'angioplastie ", en: 'Coronary angioplasty'}];
  currentBreadCrumbParent= [] = [{ fr: "Examens", en: 'Exams' }];
  breadCrumbCurrent:string='';
  breadCrumbParent:string='';

  currentAngioImg!:string;
  currentAngioTitle!:string;
  angioMessage:any;
  currentLocale:string='fr';
  currentAngio!:Angio
  media!:Media

  constructor(
    private angioService:AngioService,
    private sanitizer: DomSanitizer,
    private metaService:Meta,
    private titleService:Title,
    private route:ActivatedRoute
  ) {}

  private getAngio() {
    return this.angioService.getLastAngioBySlug()
      .subscribe({
        next:res=>{
          // @ts-ignore
          this.currentAngio=res['data']
          // @ts-ignore
          this.media=this.currentAngio['media']
          switch (this.currentLocale){
            // @ts-ignore
            case 'en'  :
              this.currentAngioTitle =this.currentAngio.angio_titre_en
              this.angioMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentAngio.angio_msg_en)
              this.metaService.updateTag({name:'description',content:this.currentAngio.angio_description_en});
              this.metaService.updateTag({name:'keyword',content:this.currentAngio.angio_keyword_en});
              this.metaService.updateTag({property:'og:title',content:this.currentAngio.angio_titre_en});
              this.metaService.updateTag({property:'og:description',content:this.currentAngio.angio_description_en});
              break
            default:
            case 'fr' :
              this.currentAngioTitle =this.currentAngio.angio_titre_fr
              this.angioMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentAngio.angio_msg_fr)
              this.metaService.updateTag({name:'description',content:this.currentAngio.angio_description_fr});
              this.metaService.updateTag({name:'keyword',content:this.currentAngio.angio_keyword_fr});
              this.metaService.updateTag({property:'og:title',content:this.currentAngio.angio_titre_fr});
              this.metaService.updateTag({property:'og:description',content:this.currentAngio.angio_description_fr});
              break
          }
          // @ts-ignore
          if(this.media[0].original_url){
            // @ts-ignore
            this.currentAngioImg=this.media[0].original_url
            this.metaService.updateTag({property:'og:image',content:this.currentAngioImg});
          }
          this.titleService.setTitle(`Cardiologie - Cabinet Médical Cardice - Medical office cardice :: Cardiology - Cardiologue Bruxelles - ${this.currentAngioTitle}`)
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
    this.getAngio()
  }

}
