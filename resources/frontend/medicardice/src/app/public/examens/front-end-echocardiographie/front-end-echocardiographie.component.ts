import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Echocardiographie, Media} from "../../../shared/models/welcome";
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {EchocardiographyService} from "../../../shared/services/echocardiography/echocardiography.service";
import {JsonldService} from "../../jsonld.service";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-front-end-echocardiographie',
  templateUrl: './front-end-echocardiographie.component.html',
  styleUrl: './front-end-echocardiographie.component.css'
})
export class FrontEndEchocardiographieComponent implements OnInit{

  currentEchocardiographieImg!:string;
  currentEchocardiographieTitle!:string;
  echocardiographieMessage:any;
  currentLocale:string='fr';
  currentBreadCrumbCurrent=[]=[{fr: "L'échographie Cardiaque", en: 'Echocardiography'}];
  currentBreadCrumbParent= [] = [{ fr: "Examens", en: 'Exams' }];
  breadCrumbCurrent:string='';
  breadCrumbParent:string='';

  currentEchocardiographie!:Echocardiographie
  media!:Media
  altImage!: string;

  constructor(
    private echocardiographieService:EchocardiographyService,
    private sanitizer: DomSanitizer,
    private metaService:Meta,
    private titleService:Title,
    private route:ActivatedRoute,
    private router: Router,
    private jldService:JsonldService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getEchocardiographie() {
    return this.echocardiographieService.getLastEchocardiographieBySlug()
      .subscribe({
        next:res=>{
          // @ts-ignore
          this.currentEchocardiographie=res['data']
          // @ts-ignore
          this.media=this.currentEchocardiographie['media']
          switch (this.currentLocale){
            // @ts-ignore
            case 'en'  :
              this.currentEchocardiographieTitle =this.currentEchocardiographie.echocardiography_titre_en
              this.echocardiographieMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentEchocardiographie.echocardiography_msg_en)
              this.metaService.updateTag({name:'description',content:this.currentEchocardiographie.echocardiography_description_en});
              this.metaService.updateTag({name:'keyword',content:this.currentEchocardiographie.echocardiography_keyword_en});
              this.metaService.updateTag({property:'og:title',content:this.currentEchocardiographie.echocardiography_titre_en});
              this.metaService.updateTag({property:'og:description',content:this.currentEchocardiographie.echocardiography_description_en});
              this.metaService.updateTag({property:'og:image:alt',content:this.currentEchocardiographie.echocardiography_titre_en});
              break
            default:
            case 'fr' :
              this.currentEchocardiographieTitle =this.currentEchocardiographie.echocardiography_titre_fr
              this.echocardiographieMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentEchocardiographie.echocardiography_msg_fr)
              this.metaService.updateTag({name:'description',content:this.currentEchocardiographie.echocardiography_description_fr});
              this.metaService.updateTag({name:'keyword',content:this.currentEchocardiographie.echocardiography_keyword_fr});
              this.metaService.updateTag({property:'og:title',content:this.currentEchocardiographie.echocardiography_titre_fr});
              this.metaService.updateTag({property:'og:description',content:this.currentEchocardiographie.echocardiography_description_fr});
              this.metaService.updateTag({property:'og:image:alt',content:this.currentEchocardiographie.echocardiography_titre_fr});
              break
          }
          // @ts-ignore
          if(this.media[0].original_url){
            // @ts-ignore
            this.currentEchocardiographieImg=this.media[0].original_url
            this.metaService.updateTag({property:'og:image',content:this.currentEchocardiographieImg});
            // @ts-ignore
            this.metaService.updateTag({property:'og:image:type',content:this.media[0].mime_type});
          }
          this.metaService.updateTag({property:'og:site_name',content:'medicardice.be'});
          this.metaService.updateTag({property:'og:type',content:'article'});

          this.titleService.setTitle(`Cabinet Médical Cardice - Medical office cardice :: ${this.currentEchocardiographieTitle}`)
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
                "@id":`${this.currentEchocardiographie.id}`
              },
              "headline":`${this.currentEchocardiographieTitle}`,
              "image": {
                "@type": "ImageObject",
                "url":`${this.currentEchocardiographieImg}`,
                "height":500,
                "width" :500
              },
              // @ts-ignore
              "datePublished": `${today}`,
              "dateModified": `${today}`,
              "articleSection":"Cardiologie",
              "keywords":this.currentLocale==='fr'? `["${this.currentEchocardiographie.echocardiography_keyword_fr}"]`:`["${this.currentEchocardiographie.echocardiography_keyword_en}"]`,
              "author": {
                "@type": "Person",
                "name": "Medicardice",
              },
              "description":this.currentLocale==='fr'? `${this.currentEchocardiographie.echocardiography_description_fr}`:`${this.currentEchocardiographie.echocardiography_description_en}`
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
    this.getEchocardiographie()
  }

}
