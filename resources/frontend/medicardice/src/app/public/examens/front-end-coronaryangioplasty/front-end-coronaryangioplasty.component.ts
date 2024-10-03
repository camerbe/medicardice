import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Coronaryangioplasty, Media} from "../../../shared/models/welcome";
import {CatheterizationService} from "../../../shared/services/catheterization/catheterization.service";
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {CoronaryangioplastyService} from "../../../shared/services/coronaryangioplasty/coronaryangioplasty.service";
import {JsonldService} from "../../jsonld.service";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-front-end-coronaryangioplasty',
  templateUrl: './front-end-coronaryangioplasty.component.html',
  styleUrl: './front-end-coronaryangioplasty.component.css'
})
export class FrontEndCoronaryangioplastyComponent implements OnInit {
  currentBreadCrumbCurrent=[]=[{fr: "La Coronarographie", en: 'Coronary Angiography'}];
  currentBreadCrumbParent= [] = [{ fr: "Examens", en: 'Exams' }];
  breadCrumbCurrent:string='';
  breadCrumbParent:string='';

  currentCoronaryangioplastyImg!:string;
  currentCoronaryangioplastyTitle!:string;
  coronaryangioplastyMessage:any;
  currentLocale:string='fr';
  currentCoronaryangioplasty!:Coronaryangioplasty
  media!:Media
  altImage!: string;

  constructor(
    private coronaryangioplastyService:CoronaryangioplastyService,
    private sanitizer: DomSanitizer,
    private metaService:Meta,
    private titleService:Title,
    private route:ActivatedRoute,
    private router: Router,
    private jldService:JsonldService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  ngOnInit(): void {
    this.currentLocale=this.route.snapshot.params['locale'];
    this.breadCrumbParent=this.getBreadCrumb(this.currentLocale);
    this.breadCrumbCurrent=this.getBreadCrumbCurrent(this.currentLocale);
    this.getCoronaryangioplasty()
  }
  getBreadCrumb(locale:string){
    const breadcrumb= locale==='fr'? this.currentBreadCrumbParent.map(item=>item.fr):this.currentBreadCrumbParent.map(item=>item.en);
    return breadcrumb[0]
  }
  getBreadCrumbCurrent(locale:string){
    const breadcrumb= locale==='fr'? this.currentBreadCrumbCurrent.map(item=>item.fr):this.currentBreadCrumbCurrent.map(item=>item.en);
    return breadcrumb[0]
  }
  private getCoronaryangioplasty() {
    // @ts-ignore
    return this.coronaryangioplastyService.getLastCoronaryangioplastyBySlug()
      .subscribe({
        next:res=>{
          // @ts-ignore
          this.currentCoronaryangioplasty=res['data']
          // @ts-ignore
          this.media=this.currentCoronaryangioplasty['media']
          switch (this.currentLocale){
            // @ts-ignore
            case 'en'  :
              this.currentCoronaryangioplastyTitle =this.currentCoronaryangioplasty.coronaryangioplasty_titre_en
              this.coronaryangioplastyMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentCoronaryangioplasty.coronaryangioplasty_msg_en)
              this.metaService.updateTag({name:'description',content:this.currentCoronaryangioplasty.coronaryangioplasty_description_en});
              this.metaService.updateTag({name:'keyword',content:this.currentCoronaryangioplasty.coronaryangioplasty_keyword_en});
              this.metaService.updateTag({property:'og:title',content:this.currentCoronaryangioplasty.coronaryangioplasty_titre_en});
              this.metaService.updateTag({property:'og:description',content:this.currentCoronaryangioplasty.coronaryangioplasty_description_en});
              this.metaService.updateTag({property:'og:image:alt',content:this.currentCoronaryangioplasty.coronaryangioplasty_titre_en});
              break
            default:
            case 'fr' :
              this.currentCoronaryangioplastyTitle =this.currentCoronaryangioplasty.coronaryangioplasty_titre_fr
              this.coronaryangioplastyMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentCoronaryangioplasty.coronaryangioplasty_msg_fr)
              this.metaService.updateTag({name:'description',content:this.currentCoronaryangioplasty.coronaryangioplasty_description_fr});
              this.metaService.updateTag({name:'keyword',content:this.currentCoronaryangioplasty.coronaryangioplasty_keyword_fr});
              this.metaService.updateTag({property:'og:title',content:this.currentCoronaryangioplasty.coronaryangioplasty_titre_fr});
              this.metaService.updateTag({property:'og:description',content:this.currentCoronaryangioplasty.coronaryangioplasty_description_fr});
              this.metaService.updateTag({property:'og:image:alt',content:this.currentCoronaryangioplasty.coronaryangioplasty_titre_fr});
              break
          }
          // @ts-ignore
          if(this.media[0].original_url){
            // @ts-ignore
            this.currentCoronaryangioplastyImg=this.media[0].original_url
            this.metaService.updateTag({property:'og:image',content:this.currentCoronaryangioplastyImg});
            // @ts-ignore
            this.metaService.updateTag({property:'og:image:type',content:this.media[0].mime_type});

          }
          this.titleService.setTitle(`Cabinet Médical Cardice - Medical office cardice :: ${this.currentCoronaryangioplastyTitle}`)
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
                "@id":`${this.currentCoronaryangioplasty.id}`
              },
              "headline":`${this.currentCoronaryangioplastyTitle}`,
              "image": {
                "@type": "ImageObject",
                "url":`${this.currentCoronaryangioplastyImg}`,
                "height":500,
                "width" :500
              },
              // @ts-ignore
              "datePublished": `${today}`,
              "dateModified": `${today}`,
              "articleSection":"Cardiologie",
              "keywords":this.currentLocale==='fr'? `["${this.currentCoronaryangioplasty.coronaryangioplasty_keyword_fr}"]`:`["${this.currentCoronaryangioplasty.coronaryangioplasty_keyword_en}"]`,
              "author": {
                "@type": "Person",
                "name": "Medicardice",
              },
              "description":this.currentLocale==='fr'? `${this.currentCoronaryangioplasty.coronaryangioplasty_description_fr}`:`${this.currentCoronaryangioplasty.coronaryangioplasty_description_en}`
            }
            this.jldService.setJsonLd(jsonLd)
          }
        }
      })
  }

}
