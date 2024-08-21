import {Component, OnInit} from '@angular/core';
import {Electrocardiographie, Media} from "../../../shared/models/welcome";
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {ElectrocardiographieService} from "../../../shared/services/electrocardiography/electrocardiographie.service";

@Component({
  selector: 'app-front-end-electrocardiographie',
  templateUrl: './front-end-electrocardiographie.component.html',
  styleUrl: './front-end-electrocardiographie.component.css'
})
export class FrontEndElectrocardiographieComponent implements OnInit{

  currentElectrocardiographieImg!:string;
  currentElectrocardiographieTitle!:string;
  electrocardiographieMessage:any;
  currentLocale:string='fr';
  currentBreadCrumbCurrent=[]=[{fr: "L'électrocardiographie", en: 'Electrocardiography'}];
  currentBreadCrumbParent= [] = [{ fr: "Examens", en: 'Exams' }];
  breadCrumbCurrent:string='';
  breadCrumbParent:string='';
  currentElectrocardiographie!:Electrocardiographie
  media!:Media

  constructor(
    private electrocardiographieService:ElectrocardiographieService,
    private sanitizer: DomSanitizer,
    private metaService:Meta,
    private titleService:Title,
    private route:ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.currentLocale=this.route.snapshot.params['locale'];
    this.breadCrumbParent=this.getBreadCrumb(this.currentLocale);
    this.breadCrumbCurrent=this.getBreadCrumbCurrent(this.currentLocale);
    this.getElectrocardiographie()
  }

  getBreadCrumb(locale:string){
    const breadcrumb= locale==='fr'? this.currentBreadCrumbParent.map(item=>item.fr):this.currentBreadCrumbParent.map(item=>item.en);
    return breadcrumb[0]
  }
  getBreadCrumbCurrent(locale:string){
    const breadcrumb= locale==='fr'? this.currentBreadCrumbCurrent.map(item=>item.fr):this.currentBreadCrumbCurrent.map(item=>item.en);
    return breadcrumb[0]
  }

  private getElectrocardiographie() {
    return this.electrocardiographieService.getLastElectrocardiographieBySlug()
      .subscribe({
        next:res=>{
          // @ts-ignore
          this.currentElectrocardiographie=res['data']
          // @ts-ignore
          this.media=this.currentElectrocardiographie['media']
          switch (this.currentLocale){
            // @ts-ignore
            case 'en'  :
              this.currentElectrocardiographieTitle =this.currentElectrocardiographie.electrocardiography_titre_en
              this.electrocardiographieMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentElectrocardiographie.electrocardiography_msg_en)
              this.metaService.updateTag({name:'description',content:this.currentElectrocardiographie.electrocardiography_description_en});
              this.metaService.updateTag({name:'keyword',content:this.currentElectrocardiographie.electrocardiography_keyword_en});
              this.metaService.updateTag({property:'og:title',content:this.currentElectrocardiographie.electrocardiography_titre_en});
              this.metaService.updateTag({property:'og:description',content:this.currentElectrocardiographie.electrocardiography_description_en});
              break
            default:
            case 'fr' :
              this.currentElectrocardiographieTitle =this.currentElectrocardiographie.electrocardiography_titre_fr
              this.electrocardiographieMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentElectrocardiographie.electrocardiography_msg_fr)
              this.metaService.updateTag({name:'description',content:this.currentElectrocardiographie.electrocardiography_description_fr});
              this.metaService.updateTag({name:'keyword',content:this.currentElectrocardiographie.electrocardiography_keyword_fr});
              this.metaService.updateTag({property:'og:title',content:this.currentElectrocardiographie.electrocardiography_titre_fr});
              this.metaService.updateTag({property:'og:description',content:this.currentElectrocardiographie.electrocardiography_description_fr});
              break
          }
          // @ts-ignore
          if(this.media[0].original_url){
            // @ts-ignore
            this.currentElectrocardiographieImg=this.media[0].original_url
            this.metaService.updateTag({property:'og:image',content:this.currentElectrocardiographieImg});
          }
          this.titleService.setTitle(`Medicardice ${this.currentElectrocardiographieTitle}`)
        }
      })
  }


}
