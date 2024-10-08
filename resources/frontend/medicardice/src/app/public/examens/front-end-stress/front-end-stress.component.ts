import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Media, Stress} from "../../../shared/models/welcome";
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {StressService} from "../../../shared/services/stress/stress.service";
import {JsonldService} from "../../jsonld.service";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-front-end-stress',
  templateUrl: './front-end-stress.component.html',
  styleUrl: './front-end-stress.component.css'
})
export class FrontEndStressComponent implements OnInit{
  currentStressImg!:string;
  currentStressTitle!:string;
  stressMessage:any;
  currentLocale:string='fr';
  //currentBreadCrumbParent="Examens" || "Exams";
  //currentBreadCrumbCurrent="L'épeuve D'effort" || "Cyclo Ergometer";
  currentBreadCrumbCurrent=[]=[{fr: "L'épeuve D'effort", en: 'Cyclo Ergometer'}];
  currentBreadCrumbParent= [] = [{ fr: "Examens", en: 'Exams' }
  ];
  breadCrumbCurrent:string='';
  breadCrumbParent:string='';
  currentStress!:Stress
  media!:Media
  altImage!: string;

  constructor(
    private stressService:StressService,
    private sanitizer: DomSanitizer,
    private metaService:Meta,
    private titleService:Title,
    private route:ActivatedRoute,
    private router: Router,
    private jldService:JsonldService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getStress() {
    return this.stressService.getLastStressBySlug()
      .subscribe({
        next:res=>{
          // @ts-ignore
          this.currentStress=res['data']
          // @ts-ignore
          this.media=this.currentStress['media']
          switch (this.currentLocale){
            // @ts-ignore
            case 'en'  :
              this.currentStressTitle =this.currentStress.stress_titre_en
              this.stressMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentStress.stress_msg_en)
              this.metaService.updateTag({name:'description',content:this.currentStress.stress_description_en});
              this.metaService.updateTag({name:'keyword',content:this.currentStress.stress_keyword_en});
              this.metaService.updateTag({property:'og:title',content:this.currentStress.stress_titre_en});
              this.metaService.updateTag({property:'og:description',content:this.currentStress.stress_description_en});
              this.metaService.updateTag({property:'og:image:alt',content:this.currentStress.stress_titre_en});
              break
            default:
            case 'fr' :
              this.currentStressTitle =this.currentStress.stress_titre_fr
              this.stressMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentStress.stress_msg_fr)
              this.metaService.updateTag({name:'description',content:this.currentStress.stress_description_fr});
              this.metaService.updateTag({name:'keyword',content:this.currentStress.stress_keyword_fr});
              this.metaService.updateTag({property:'og:title',content:this.currentStress.stress_titre_fr});
              this.metaService.updateTag({property:'og:description',content:this.currentStress.stress_description_fr});
              this.metaService.updateTag({property:'og:image:alt',content:this.currentStress.stress_titre_fr});
              break
          }
          // @ts-ignore
          if(this.media[0].original_url){
            // @ts-ignore
            this.currentStressImg=this.media[0].original_url
            this.metaService.updateTag({property:'og:image',content:this.currentStressImg});
            // @ts-ignore
            this.metaService.updateTag({property:'og:image:type',content:this.media[0].mime_type});
          }
          this.metaService.updateTag({property:'og:site_name',content:'medicardice.be'});
          this.metaService.updateTag({property:'og:type',content:'article'});

          this.titleService.setTitle(`Cabinet Médical Cardice - Medical office cardice :: ${this.currentStressTitle}`)
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
                "@id":`${this.currentStress.id}`
              },
              "headline":`${this.currentStressTitle}`,
              "image": {
                "@type": "ImageObject",
                "url":`${this.currentStressImg}`,
                "height":500,
                "width" :500
              },
              // @ts-ignore
              "datePublished": `${today}`,
              "dateModified": `${today}`,
              "articleSection":"Cardiologie",
              "keywords":this.currentLocale==='fr'? `["${this.currentStress.stress_keyword_fr}"]`:`["${this.currentStress.stress_keyword_en}"]`,
              "author": {
                "@type": "Person",
                "name": "Medicardice",
              },
              "description":this.currentLocale==='fr'? `${this.currentStress.stress_description_fr}`:`${this.currentStress.stress_description_en}`
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
    this.getStress()
  }
}
