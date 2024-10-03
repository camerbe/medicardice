import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Angio, Media} from "../../../shared/models/welcome";
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {AngioService} from "../../../shared/services/angio/angio.service";
import {JsonldService} from "../../jsonld.service";
import {isPlatformBrowser} from "@angular/common";

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
  altImage!: string;

  constructor(
    private angioService:AngioService,
    private sanitizer: DomSanitizer,
    private metaService:Meta,
    private titleService:Title,
    private route:ActivatedRoute,
    private router: Router,
    private jldService:JsonldService,
    @Inject(PLATFORM_ID) private platformId: Object
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
              this.metaService.updateTag({property:'og:image:alt',content:this.currentAngio.angio_titre_en});
              break
            default:
            case 'fr' :
              this.currentAngioTitle =this.currentAngio.angio_titre_fr

              this.angioMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentAngio.angio_msg_fr)
              this.metaService.updateTag({name:'description',content:this.currentAngio.angio_description_fr});
              this.metaService.updateTag({name:'keyword',content:this.currentAngio.angio_keyword_fr});
              this.metaService.updateTag({property:'og:title',content:this.currentAngio.angio_titre_fr});
              this.metaService.updateTag({property:'og:description',content:this.currentAngio.angio_description_fr});
              this.metaService.updateTag({property:'og:image:alt',content:this.currentAngio.angio_titre_fr});
              break
          }
          // @ts-ignore
          if(this.media[0].original_url){
            // @ts-ignore
            this.currentAngioImg=this.media[0].original_url
            this.metaService.updateTag({property:'og:image',content:this.currentAngioImg});
            // @ts-ignore
            this.metaService.updateTag({property:'og:image:type',content:this.media[0].mime_type});
          }
          this.titleService.setTitle(`Cabinet Médical Cardice - Medical office cardice :: ${this.currentAngioTitle}`)
          this.metaService.updateTag({name:'robots',content:'index, follow'});
          this.altImage=this.currentAngioTitle;

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
                "logo":`${this.media[0].original_url}`
              },
              "mainEntityOfPage":{
                "@type":"WebPage",
                "@id":`${this.currentAngioTitle}`
              },
              "headline":`${this.currentAngioTitle}`,
              "image": {
                "@type": "ImageObject",
                "url":`${this.currentAngioImg}`,
                "height":500,
                "width" :500
              },
              // @ts-ignore
              "datePublished": `${today}`,
              "dateModified": `${today}`,
              "articleSection":"Cardiologie",
              "keywords":this.currentLocale==='fr'? `["${this.currentAngio.angio_keyword_fr}"]`:`["${this.currentAngio.angio_keyword_en}"]`,
              "author": {
                "@type": "Person",
                "name": "Medicardice",
              },
              "description":this.currentLocale==='fr'? `${this.currentAngio.angio_description_fr}`:`${this.currentAngio.angio_description_en}`
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
    this.getAngio()
  }

}
