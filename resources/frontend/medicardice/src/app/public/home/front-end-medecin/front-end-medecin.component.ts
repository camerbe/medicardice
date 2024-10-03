import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {MedecinService} from "../../../shared/services/medecins/medecin.service";
import {Medecin, Media} from "../../../shared/models/welcome";
import {JsonldService} from "../../jsonld.service";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-front-end-medecin',
  templateUrl: './front-end-medecin.component.html',
  styleUrl: './front-end-medecin.component.css'
})
export class FrontEndMedecinComponent implements OnInit{

  currentMedecinImg!:string;
  currentMedecinTitle!:string;
  medecinMessage:any;
  currentLocale:string='fr';
  currentSlug!:string;
  //currentBreadCrumbParent=['fr'=>"Médecin" ,'en'=> "Doctor"]
  currentBreadCrumbParent= [] = [
    { fr: 'médecin', en: 'doctor' }
  ];
  breadCrumbParent:string='';
  currentMedecin!:Medecin
  media!:Media
  altImage!: string;
  constructor(
    private medecinService:MedecinService,
    private sanitizer: DomSanitizer,
    private metaService:Meta,
    private titleService:Title,
    private route:ActivatedRoute,
    private router:Router,
    private jldService:JsonldService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }
  getBreadCrumb(locale:string){
    return locale==='fr'? this.currentBreadCrumbParent.map(item=>{return item.fr}):this.currentBreadCrumbParent.map(item=>{return item.en})
  }
  ngOnInit(): void {
    this.currentLocale=this.route.snapshot.params['locale'] || 'fr';
    // @ts-ignore
    this.breadCrumbParent=this.getBreadCrumb(this.currentLocale);
    // @ts-ignore

    this.currentSlug=this.route.snapshot.params['slug'];
    this.getMedecin()
  }

  private getMedecin() {
    return this.medecinService.getLastMedecinBySlug()
      .subscribe({
        next:res=>{
          // @ts-ignore
          this.currentMedecin=res['data']
          // @ts-ignore
          this.media=this.currentMedecin['media']
          switch (this.currentLocale){
            // @ts-ignore
            case 'en'  :
              this.currentMedecinTitle =this.currentMedecin.doc_titre_en
              this.medecinMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentMedecin.doc_msg_en)
              this.currentSlug=this.currentMedecin.doc_titre_en_slug
              this.metaService.updateTag({name:'description',content:this.currentMedecin.doc_description_en});
              this.metaService.updateTag({name:'keyword',content:this.currentMedecin.doc_keyword_en});
              this.metaService.updateTag({property:'og:title',content:this.currentMedecin.doc_titre_en});
              this.metaService.updateTag({property:'og:description',content:this.currentMedecin.doc_description_en});
              this.metaService.updateTag({property:'og:image:alt',content:this.currentMedecin.doc_titre_en});
              break
            default:
            case 'fr' :
              this.currentMedecinTitle =this.currentMedecin.doc_titre_fr
              this.medecinMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentMedecin.doc_msg_fr)
              this.currentSlug=this.currentMedecin.doc_titre_fr_slug
              this.metaService.updateTag({name:'description',content:this.currentMedecin.doc_description_fr});
              this.metaService.updateTag({name:'keyword',content:this.currentMedecin.doc_keyword_fr});
              this.metaService.updateTag({property:'og:title',content:this.currentMedecin.doc_titre_fr});
              this.metaService.updateTag({property:'og:description',content:this.currentMedecin.doc_description_fr});
              this.metaService.updateTag({property:'og:image:alt',content:this.currentMedecin.doc_titre_fr});
              break
          }
          this.altImage=this.currentMedecinTitle
          // @ts-ignore
          this.currentMedecinImg=this.media[0].original_url
          // @ts-ignore
          this.metaService.updateTag({property:'og:image',content:this.media[0].original_url});
          this.titleService.setTitle(`Cabinet Médical Cardice - Medical office cardice :: ${this.currentMedecinTitle}`)
          this.metaService.updateTag({name:'robots',content:'index, follow'});

          const date =new Date(Date.now());
          const today=date.toISOString().slice(0, 19) + '+00:00'
          // @ts-ignore
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
                "@id":`${this.currentMedecinTitle}`
              },
              "headline":`${this.currentMedecinTitle}`,
              "image": {
                "@type": "ImageObject",
                "url": `${this.currentMedecinImg}`,
                "height":500,
                "width" :500
              },
              // @ts-ignore
              "datePublished": `${today}`,
              "dateModified": `${today}`,
              "articleSection":"Cardiologie",
              "keywords":this.currentLocale==='fr'? `["${this.currentMedecin.doc_keyword_fr}"]`:`["${this.currentMedecin.doc_keyword_en}"]`,
              "author": {
                "@type": "Person",
                "name": "Medicardice",
              },
              "description":this.currentLocale==='fr'? `${this.currentMedecin.doc_description_fr}`:`${this.currentMedecin.doc_description_en}`
            }
            this.jldService.setJsonLd(jsonLd)
          }

        }
      })
  }
}
