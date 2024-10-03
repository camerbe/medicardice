import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Catheterization, Media, Monitoring} from "../../../shared/models/welcome";
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {CatheterizationService} from "../../../shared/services/catheterization/catheterization.service";
import {JsonldService} from "../../jsonld.service";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-front-end-catheterization',
  templateUrl: './front-end-catheterization.component.html',
  styleUrl: './front-end-catheterization.component.css'
})
export class FrontEndCatheterizationComponent implements OnInit {

  currentBreadCrumbCurrent=[]=[{fr: "Le Cathétérisme", en: 'Catheterization'}];
  currentBreadCrumbParent= [] = [{ fr: "Examens", en: 'Exams' }];
  breadCrumbCurrent:string='';
  breadCrumbParent:string='';

  currentCatheterizationImg!:string;
  currentCatheterizationTitle!:string;
  catheterizationMessage:any;
  currentLocale:string='fr';
  currentCatheterization!:Catheterization
  media!:Media
  altImage!: string;

  constructor(
    private catheterizationService:CatheterizationService,
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
    this.getCatheterization()
  }
  getBreadCrumb(locale:string){
    const breadcrumb= locale==='fr'? this.currentBreadCrumbParent.map(item=>item.fr):this.currentBreadCrumbParent.map(item=>item.en);
    return breadcrumb[0]
  }
  getBreadCrumbCurrent(locale:string){
    const breadcrumb= locale==='fr'? this.currentBreadCrumbCurrent.map(item=>item.fr):this.currentBreadCrumbCurrent.map(item=>item.en);
    return breadcrumb[0]
  }

  private getCatheterization() {
    return this.catheterizationService.getLastCatheterizationBySlug()
      .subscribe({
        next:res=>{
          // @ts-ignore
          this.currentCatheterization=res['data']
          // @ts-ignore
          this.media=this.currentCatheterization['media']
          switch (this.currentLocale){
            // @ts-ignore
            case 'en'  :
              this.currentCatheterizationTitle =this.currentCatheterization.catheterization_titre_en
              this.catheterizationMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentCatheterization.catheterization_msg_en)
              this.metaService.updateTag({name:'description',content:this.currentCatheterization.catheterization_description_en});
              this.metaService.updateTag({name:'keyword',content:this.currentCatheterization.catheterization_keyword_en});
              this.metaService.updateTag({property:'og:title',content:this.currentCatheterization.catheterization_titre_en});
              this.metaService.updateTag({property:'og:description',content:this.currentCatheterization.catheterization_description_en});
              this.metaService.updateTag({property:'og:image:alt',content:this.currentCatheterization.catheterization_titre_en});
              break
            default:
            case 'fr' :
              this.currentCatheterizationTitle =this.currentCatheterization.catheterization_titre_fr
              this.catheterizationMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentCatheterization.catheterization_msg_fr)
              this.metaService.updateTag({name:'description',content:this.currentCatheterization.catheterization_description_fr});
              this.metaService.updateTag({name:'keyword',content:this.currentCatheterization.catheterization_keyword_fr});
              this.metaService.updateTag({property:'og:title',content:this.currentCatheterization.catheterization_titre_fr});
              this.metaService.updateTag({property:'og:description',content:this.currentCatheterization.catheterization_description_fr});
              this.metaService.updateTag({property:'og:image:alt',content:this.currentCatheterization.catheterization_titre_fr});
              break
          }
          // @ts-ignore
          if(this.media[0].original_url){
            // @ts-ignore
            this.currentCatheterizationImg=this.media[0].original_url
            this.metaService.updateTag({property:'og:image',content:this.currentCatheterizationImg});
            // @ts-ignore
            this.metaService.updateTag({property:'og:image:type',content:this.media[0].mime_type});
          }
          this.titleService.setTitle(`Cabinet Médical Cardice - Medical office cardice :: ${this.currentCatheterizationTitle}`)
          this.metaService.updateTag({name:'robots',content:'index, follow'});

          this.altImage=this.currentCatheterizationTitle;

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
                "@id":`${this.currentCatheterization.id}`
              },
              "headline":`${this.currentCatheterizationTitle}`,
              "image": {
                "@type": "ImageObject",
                "url":`${this.currentCatheterizationImg}`,
                "height":500,
                "width" :500
              },
              // @ts-ignore
              "datePublished": `${today}`,
              "dateModified": `${today}`,
              "articleSection":"Cardiologie",
              "keywords":this.currentLocale==='fr'? `["${this.currentCatheterization.catheterization_keyword_fr}"]`:`["${this.currentCatheterization.catheterization_keyword_en}"]`,
              "author": {
                "@type": "Person",
                "name": "Medicardice",
              },
              "description":this.currentLocale==='fr'? `${this.currentCatheterization.catheterization_description_fr}`:`${this.currentCatheterization.catheterization_description_en}`
            }
            this.jldService.setJsonLd(jsonLd)
          }
        }
      })
  }

}
