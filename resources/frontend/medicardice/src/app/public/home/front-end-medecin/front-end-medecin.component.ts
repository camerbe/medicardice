import {Component, OnInit} from '@angular/core';
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {MedecinService} from "../../../shared/services/medecins/medecin.service";
import {Medecin, Media} from "../../../shared/models/welcome";

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
  constructor(
    private medecinService:MedecinService,
    private sanitizer: DomSanitizer,
    private metaService:Meta,
    private titleService:Title,
    private route:ActivatedRoute
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
              break
            default:
            case 'fr' :
              this.currentMedecinTitle =this.currentMedecin.doc_titre_fr
              this.medecinMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentMedecin.doc_msg_fr)
              this.currentSlug=this.currentMedecin.doc_titre_fr_slug
              break
          }
          // @ts-ignore
          this.currentMedecinImg=this.media[0].original_url
          this.metaService.updateTag({name:'description',content:this.currentMedecin.doc_description_fr});
          this.metaService.updateTag({name:'keyword',content:this.currentMedecin.doc_keyword_fr});
          this.metaService.updateTag({property:'og:title',content:this.currentMedecin.doc_titre_fr});
          this.metaService.updateTag({property:'og:description',content:this.currentMedecin.doc_description_fr});
          this.metaService.updateTag({property:'og:image',content:this.currentMedecinImg});
          this.titleService.setTitle(`Cardiologie - Cabinet Médical Cardice - Medical office cardice :: Cardiology - Cardiologue Bruxelles - ${this.currentMedecinTitle}`)
        }
      })
  }
}
