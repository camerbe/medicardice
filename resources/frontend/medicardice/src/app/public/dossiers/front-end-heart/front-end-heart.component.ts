import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Heart, Media} from "../../../shared/models/welcome";
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {HeartService} from "../../../shared/services/heart/heart.service";
import {CanonicalService} from "../../canonical.service";
import {DOCUMENT, isPlatformBrowser} from "@angular/common";
import {JsonldService} from "../../jsonld.service";

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
  altImage!: string;

  constructor(
    private heartService:HeartService,
    private sanitizer: DomSanitizer,
    private metaService:Meta,
    private titleService:Title,
    private route:ActivatedRoute,
    private router: Router,
    private jldService:JsonldService,
    @Inject(PLATFORM_ID) private platformId: Object
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
              this.metaService.updateTag({property:'og:image:alt',content:this.currentHeart.heart_titre_en});
              break
            default:
            case 'fr' :
              this.currentHeartTitle =this.currentHeart.heart_titre_fr
              this.heartMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentHeart.heart_msg_fr)
              this.metaService.updateTag({name:'description',content:this.currentHeart.heart_description_fr});
              this.metaService.updateTag({name:'keyword',content:this.currentHeart.heart_keyword_fr});
              this.metaService.updateTag({property:'og:title',content:this.currentHeart.heart_titre_fr});
              this.metaService.updateTag({property:'og:description',content:this.currentHeart.heart_description_fr});
              this.metaService.updateTag({property:'og:image:alt',content:this.currentHeart.heart_titre_en});
              break
          }
          // @ts-ignore
          if(this.media[0].original_url){
            // @ts-ignore
            this.currentHeartImg=this.media[0].original_url
            this.metaService.updateTag({property:'og:image',content:this.currentHeartImg});
            // @ts-ignore
            this.metaService.updateTag({property:'og:image:type',content:this.media[0].mime_type});
          }
          this.altImage=this.currentHeartTitle
          this.titleService.setTitle(`Cardiologie - Cabinet Médical Cardice - Medical office cardice :: ${this.currentHeartTitle}`)
          this.metaService.updateTag({name:'robots',content:'index, follow'});
          this.metaService.updateTag({property:'og:site_name',content:'medicardice.be'});
          this.metaService.updateTag({property:'og:type',content:'article'});


          const date =new Date(Date.now());
          const today=date.toISOString().slice(0, 19) + '+00:00'
          if(isPlatformBrowser(this.platformId)){
            const jsonLd={
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              "url": `${window.location.protocol}//${window.location.host}${this.router.url}`,
              "publisher":{
                "@type":"Organization",
                "name":"Médicardice",
                // @ts-ignore
                "logo":`${window.location.protocol}//${window.location.host}/assets/images/Medicardice.png`
              },
              "mainEntityOfPage":{
                "@type":"WebPage",
                "@id":`${this.currentHeartTitle}`
              },
              "headline":`${this.currentHeartTitle}`,
              "image": {
                "@type": "ImageObject",
                "url": `${this.currentHeartImg}`,
                "height":500,
                "width" :500
              },
              // @ts-ignore
              "datePublished": `${today}`,
              "dateModified": `${today}`,
              "articleSection":"Cardiologie",
              "keywords":this.currentLocale==='fr'? `["${this.currentHeart.heart_keyword_fr}"]`:`["${this.currentHeart.heart_keyword_en}"]`,
              "author": {
                "@type": "Person",
                "name": "Medicardice",
              },
              "description":this.currentLocale==='fr'? `${this.currentHeart.heart_description_fr}`:`${this.currentHeart.heart_description_en}`
            }
            this.jldService.setJsonLd(jsonLd)
          }
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
