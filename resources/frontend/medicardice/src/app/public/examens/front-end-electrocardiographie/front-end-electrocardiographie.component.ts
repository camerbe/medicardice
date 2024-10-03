import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Electrocardiographie, Media} from "../../../shared/models/welcome";
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {ElectrocardiographieService} from "../../../shared/services/electrocardiography/electrocardiographie.service";
import {JsonldService} from "../../jsonld.service";
import {isPlatformBrowser} from "@angular/common";

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
  altImage!: string;

  constructor(
    private electrocardiographieService:ElectrocardiographieService,
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
              this.metaService.updateTag({property:'og:image:alt',content:this.currentElectrocardiographie.electrocardiography_titre_en});
              break
            default:
            case 'fr' :
              this.currentElectrocardiographieTitle =this.currentElectrocardiographie.electrocardiography_titre_fr
              this.electrocardiographieMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentElectrocardiographie.electrocardiography_msg_fr)
              this.metaService.updateTag({name:'description',content:this.currentElectrocardiographie.electrocardiography_description_fr});
              this.metaService.updateTag({name:'keyword',content:this.currentElectrocardiographie.electrocardiography_keyword_fr});
              this.metaService.updateTag({property:'og:title',content:this.currentElectrocardiographie.electrocardiography_titre_fr});
              this.metaService.updateTag({property:'og:description',content:this.currentElectrocardiographie.electrocardiography_description_fr});
              this.metaService.updateTag({property:'og:image:alt',content:this.currentElectrocardiographie.electrocardiography_titre_fr});
              break
          }
          // @ts-ignore
          if(this.media[0].original_url){
            // @ts-ignore
            this.currentElectrocardiographieImg=this.media[0].original_url
            this.metaService.updateTag({property:'og:image',content:this.currentElectrocardiographieImg});
            // @ts-ignore
            this.metaService.updateTag({property:'og:image:type',content:this.media[0].mime_type});
          }
          this.titleService.setTitle(`Cabinet Médical Cardice - Medical office cardice :: ${this.currentElectrocardiographieTitle}`)
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
                "@id":`${this.currentElectrocardiographie.id}`
              },
              "headline":`${this.currentElectrocardiographieTitle}`,
              "image": {
                "@type": "ImageObject",
                "url":`${this.currentElectrocardiographieImg}`,
                "height":500,
                "width" :500
              },
              // @ts-ignore
              "datePublished": `${today}`,
              "dateModified": `${today}`,
              "articleSection":"Cardiologie",
              "keywords":this.currentLocale==='fr'? `["${this.currentElectrocardiographie.electrocardiography_keyword_fr}"]`:`["${this.currentElectrocardiographie.electrocardiography_keyword_en}"]`,
              "author": {
                "@type": "Person",
                "name": "Medicardice",
              },
              "description":this.currentLocale==='fr'? `${this.currentElectrocardiographie.electrocardiography_description_fr}`:`${this.currentElectrocardiographie.electrocardiography_description_en}`
            }
            this.jldService.setJsonLd(jsonLd)
          }
        }
      })
  }


}
