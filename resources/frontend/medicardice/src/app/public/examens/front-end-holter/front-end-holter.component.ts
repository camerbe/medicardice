import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Holter, Media} from "../../../shared/models/welcome";
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {HolterService} from "../../../shared/services/holter/holter.service";
import {JsonldService} from "../../jsonld.service";
import {isPlatformBrowser} from "@angular/common";

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
  altImage!: string;
  constructor(
    private holterService:HolterService,
    private sanitizer: DomSanitizer,
    private metaService:Meta,
    private titleService:Title,
    private route:ActivatedRoute,
    private router: Router,
    private jldService:JsonldService,
    @Inject(PLATFORM_ID) private platformId: Object
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
              this.metaService.updateTag({property:'og:image:alt',content:this.currentHolter.holter_titre_en});
              break
            default:
            case 'fr' :
              this.currentHolterTitle =this.currentHolter.holter_titre_fr
              this.holterMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentHolter.holter_msg_fr)
              this.metaService.updateTag({name:'description',content:this.currentHolter.holter_description_fr});
              this.metaService.updateTag({name:'keyword',content:this.currentHolter.holter_keyword_fr});
              this.metaService.updateTag({property:'og:title',content:this.currentHolter.holter_titre_fr});
              this.metaService.updateTag({property:'og:description',content:this.currentHolter.holter_description_fr});
              this.metaService.updateTag({property:'og:image:alt',content:this.currentHolter.holter_titre_fr});
              break
          }
          // @ts-ignore
          if(this.media[0].original_url){
            // @ts-ignore
            this.currentHolterImg=this.media[0].original_url
            this.metaService.updateTag({property:'og:image',content:this.currentHolterImg});
            // @ts-ignore
            this.metaService.updateTag({property:'og:image:type',content:this.media[0].mime_type});
          }
          this.metaService.updateTag({property:'og:site_name',content:'medicardice.be'});
          this.metaService.updateTag({property:'og:type',content:'article'});

          this.titleService.setTitle(`Cabinet Médical Cardice - Medical office cardice ::  ${this.currentHolterTitle}`)
          this.metaService.updateTag({name:'robots',content:'index, follow'});

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
                "@id":`${this.currentHolter.id}`
              },
              "headline":`${this.currentHolterTitle}`,
              "image": {
                "@type": "ImageObject",
                "url":`${this.currentHolterImg}`,
                "height":500,
                "width" :500
              },
              // @ts-ignore
              "datePublished": `${today}`,
              "dateModified": `${today}`,
              "articleSection":"Cardiologie",
              "keywords":this.currentLocale==='fr'? `["${this.currentHolter.holter_keyword_fr}"]`:`["${this.currentHolter.holter_keyword_en}"]`,
              "author": {
                "@type": "Person",
                "name": "Medicardice",
              },
              "description":this.currentLocale==='fr'? `${this.currentHolter.holter_description_fr}`:`${this.currentHolter.holter_description_en}`
            }
            this.jldService.setJsonLd(jsonLd)
          }
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
