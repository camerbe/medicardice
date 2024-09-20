import {Component, OnInit} from '@angular/core';
import {Heart, Media} from "../../../shared/models/welcome";
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {HeartService} from "../../../shared/services/heart/heart.service";

@Component({
  selector: 'app-front-end-heart',
  templateUrl: './front-end-heart.component.html',
  styleUrl: './front-end-heart.component.css'
})
export class FrontEndHeartComponent implements OnInit{

  currentBreadCrumbCurrent=[]=[{fr: "insuffisance cardiaque", en: 'Heart failure'}];
  currentBreadCrumbParent= [] = [{ fr: "Dossiers", en: 'Files' }];
  breadCrumbCurrent:string='';
  breadCrumbParent:string='';

  currentHeartImg!:string;
  currentHeartTitle!:string;
  heartMessage:any;
  currentLocale!:string;
  currentHeart!:Heart
  media!:Media

  constructor(
    private heartService:HeartService,
    private sanitizer: DomSanitizer,
    private metaService:Meta,
    private titleService:Title,
    private route:ActivatedRoute
  ) {}

  private getHeart() {
    return this.heartService.getLastHeartBySlug()
      .subscribe({
        next:res=>{
          // @ts-ignore
          this.currentHeart=res['data']
          // @ts-ignore
          this.media=this.currentHeart['media']
          switch (this.currentLocale){
            // @ts-ignore
            case 'en'  :
              this.currentHeartTitle =this.currentHeart.heart_titre_en
              this.heartMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentHeart.heart_msg_en)
              this.metaService.updateTag({name:'description',content:this.currentHeart.heart_description_en});
              this.metaService.updateTag({name:'keyword',content:this.currentHeart.heart_keyword_en});
              this.metaService.updateTag({property:'og:title',content:this.currentHeart.heart_titre_en});
              this.metaService.updateTag({property:'og:description',content:this.currentHeart.heart_description_en});
              break
            default:
            case 'fr' :
              this.currentHeartTitle =this.currentHeart.heart_titre_fr
              this.heartMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentHeart.heart_msg_fr)
              this.metaService.updateTag({name:'description',content:this.currentHeart.heart_description_fr});
              this.metaService.updateTag({name:'keyword',content:this.currentHeart.heart_keyword_fr});
              this.metaService.updateTag({property:'og:title',content:this.currentHeart.heart_titre_fr});
              this.metaService.updateTag({property:'og:description',content:this.currentHeart.heart_description_fr});
              break
          }
          // @ts-ignore
          if(this.media[0].original_url){
            // @ts-ignore
            this.currentHeartImg=this.media[0].original_url
            this.metaService.updateTag({property:'og:image',content:this.currentHeartImg});
          }
          this.titleService.setTitle(`Medicardice ${this.currentHeartTitle}`)
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
    this.getHeart()
  }

}
