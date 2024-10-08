import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Consultation, Media} from "../../../shared/models/welcome";
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {ConsultationService} from "../../../shared/services/consultations/consultation.service";
import {JsonldService} from "../../jsonld.service";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-front-end-consultation',
  templateUrl: './front-end-consultation.component.html',
  styleUrl: './front-end-consultation.component.css'
})
export class FrontEndConsultationComponent implements OnInit{

  currentConsultationImg!:string;
  currentConsultationTitle!:string;
  consultationMessage:any;
  currentLocale:string='fr';

  currentBreadCrumbCurrent=[]=[{fr: "La Consultation Générale", en: 'Consultation Cardiology'}];
  currentBreadCrumbParent= [] = [{ fr: "Examens", en: 'Exams' }];
  breadCrumbCurrent:string='';
  breadCrumbParent:string='';
  currentConsultation!:Consultation
  media!:Media
  altImage!: string;

  constructor(
    private consultationService:ConsultationService,
    private sanitizer: DomSanitizer,
    private metaService:Meta,
    private titleService:Title,
    private route:ActivatedRoute,
    private router: Router,
    private jldService:JsonldService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }
  ngOnInit(): void {
    this.currentLocale=this.route.snapshot.params['locale'];
    this.breadCrumbParent=this.getBreadCrumb(this.currentLocale);
    this.breadCrumbCurrent=this.getBreadCrumbCurrent(this.currentLocale);
    this.getConsultation()
  }

  getBreadCrumb(locale:string){
    const breadcrumb= locale==='fr'? this.currentBreadCrumbParent.map(item=>item.fr):this.currentBreadCrumbParent.map(item=>item.en);
    return breadcrumb[0]
  }
  getBreadCrumbCurrent(locale:string){
    const breadcrumb= locale==='fr'? this.currentBreadCrumbCurrent.map(item=>item.fr):this.currentBreadCrumbCurrent.map(item=>item.en);
    return breadcrumb[0]
  }

  private getConsultation() {
    return this.consultationService.getLastConsultationBySlug()
      .subscribe({
        next:res=>{
          // @ts-ignore
          this.currentConsultation=res['data']
          // @ts-ignore
          this.media=this.currentConsultation['media']
          switch (this.currentLocale){
            // @ts-ignore
            case 'en'  :
              this.currentConsultationTitle =this.currentConsultation.cons_titre_en
              this.consultationMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentConsultation.cons_msg_en)
              this.metaService.updateTag({name:'description',content:this.currentConsultation.cons_description_en.substring(0,160)});
              this.metaService.updateTag({name:'keyword',content:this.currentConsultation.cons_keyword_en});
              this.metaService.updateTag({property:'og:title',content:this.currentConsultation.cons_titre_en});
              this.metaService.updateTag({property:'og:description',content:this.currentConsultation.cons_description_en.substring(0,160)});
              this.metaService.updateTag({property:'og:image:alt',content:this.currentConsultation.cons_titre_en});
              break
            default:
            case 'fr' :
              this.currentConsultationTitle =this.currentConsultation.cons_titre_fr
              this.consultationMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentConsultation.cons_msg_fr)
              this.metaService.updateTag({name:'description',content:this.currentConsultation.cons_description_fr.substring(0,160)});
              this.metaService.updateTag({name:'keyword',content:this.currentConsultation.cons_keyword_fr});
              this.metaService.updateTag({property:'og:title',content:this.currentConsultation.cons_titre_fr});
              this.metaService.updateTag({property:'og:description',content:this.currentConsultation.cons_description_fr.substring(0,160)});
              this.metaService.updateTag({property:'og:image:alt',content:this.currentConsultation.cons_titre_fr});
              break
          }
          // @ts-ignore
          if(this.media[0].original_url){
            // @ts-ignore
            this.currentConsultationImg=this.media[0].original_url
            this.metaService.updateTag({property:'og:image',content:this.currentConsultationImg});
            // @ts-ignore
            this.metaService.updateTag({property:'og:image:type',content:this.media[0].mime_type});
          }
          this.metaService.updateTag({property:'og:site_name',content:'medicardice.be'});
          this.metaService.updateTag({property:'og:type',content:'article'});

          this.titleService.setTitle(`Cabinet Médical Cardice - Medical office cardice :: ${this.currentConsultationTitle}`)
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
                "@id":`${this.currentConsultation.id}`
              },
              "headline":`${this.currentConsultationTitle}`,
              "image": {
                "@type": "ImageObject",
                "url":`${this.currentConsultationImg}`,
                "height":500,
                "width" :500
              },
              // @ts-ignore
              "datePublished": `${today}`,
              "dateModified": `${today}`,
              "articleSection":"Cardiologie",
              "keywords":this.currentLocale==='fr'? `["${this.currentConsultation.cons_keyword_fr}"]`:`["${this.currentConsultation.cons_keyword_en}"]`,
              "author": {
                "@type": "Person",
                "name": "Medicardice",
              },
              "description":this.currentLocale==='fr'? `${this.currentConsultation.cons_description_fr}`:`${this.currentConsultation.cons_description_en}`
            }
            this.jldService.setJsonLd(jsonLd)
          }
        }
      })
  }
}
