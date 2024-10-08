import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Hypertension, Media} from "../../../shared/models/welcome";
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {HypertensionService} from "../../../shared/services/hypertensions/hypertension.service";
import {JsonldService} from "../../jsonld.service";
import {isPlatformBrowser} from "@angular/common";

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
  altImage!: string;

  constructor(
    private hypertensionService:HypertensionService,
    private sanitizer: DomSanitizer,
    private metaService:Meta,
    private titleService:Title,
    private route:ActivatedRoute,
    private router: Router,
    private jldService:JsonldService,
    @Inject(PLATFORM_ID) private platformId: Object
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
              this.metaService.updateTag({property:'og:image:alt',content:this.currentHypertension.hypertension_titre_en});
              break
            default:
            case 'fr' :
              this.currentHypertensionTitle =this.currentHypertension.hypertension_titre_fr
              this.hypertensionMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentHypertension.hypertension_msg_fr)
              this.metaService.updateTag({name:'description',content:this.currentHypertension.hypertension_description_fr});
              this.metaService.updateTag({name:'keyword',content:this.currentHypertension.hypertension_keyword_fr});
              this.metaService.updateTag({property:'og:title',content:this.currentHypertension.hypertension_titre_fr});
              this.metaService.updateTag({property:'og:description',content:this.currentHypertension.hypertension_description_fr});
              this.metaService.updateTag({property:'og:image:alt',content:this.currentHypertension.hypertension_titre_fr});
              break
          }
          // @ts-ignore
          if(this.media[0].original_url){
            // @ts-ignore
            this.currentHypertensionImg=this.media[0].original_url
            // @ts-ignore
            this.metaService.updateTag({property:'og:image:type',content:this.media[0].mime_type});
            this.metaService.updateTag({property:'og:image',content:this.currentHypertensionImg});
          }
          this.metaService.updateTag({property:'og:site_name',content:'medicardice.be'});
          this.metaService.updateTag({property:'og:type',content:'article'});

          this.titleService.setTitle(`Cabinet Médical Cardice - Medical office cardice :: ${this.currentHypertensionTitle}`)
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
                "@id":`${this.currentHypertension.id}`
              },
              "headline":`${this.currentHypertensionTitle}`,
              "image": {
                "@type": "ImageObject",
                "url":`${this.currentHypertensionImg}`,
                "height":500,
                "width" :500
              },
              // @ts-ignore
              "datePublished": `${today}`,
              "dateModified": `${today}`,
              "articleSection":"Cardiologie",
              "keywords":this.currentLocale==='fr'? `["${this.currentHypertension.hypertension_keyword_fr}"]`:`["${this.currentHypertension.hypertension_keyword_en}"]`,
              "author": {
                "@type": "Person",
                "name": "Medicardice",
              },
              "description":this.currentLocale==='fr'? `${this.currentHypertension.hypertension_description_fr}`:`${this.currentHypertension.hypertension_description_en}`
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
    this.getHypertension()
  }

}
