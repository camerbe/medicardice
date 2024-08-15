import {Component, OnInit} from '@angular/core';
import {Consultation, Media} from "../../../shared/models/welcome";
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {ConsultationService} from "../../../shared/services/consultations/consultation.service";

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

  currentConsultation!:Consultation
  media!:Media

  constructor(
    private consultationService:ConsultationService,
    private sanitizer: DomSanitizer,
    private metaService:Meta,
    private titleService:Title,
    private route:ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.currentLocale=this.route.snapshot.params['locale'];
    this.getConsultation()
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
              break
            default:
            case 'fr' :
              this.currentConsultationTitle =this.currentConsultation.cons_titre_fr
              this.consultationMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentConsultation.cons_msg_fr)
              break
          }
          // @ts-ignore
          if(this.media[0].original_url){
            // @ts-ignore
            this.currentConsultationImg=this.media[0].original_url
            this.metaService.updateTag({property:'og:image',content:this.currentConsultationImg});
          }

          this.metaService.updateTag({name:'description',content:this.currentConsultation.cons_description_fr});
          this.metaService.updateTag({name:'keyword',content:this.currentConsultation.cons_keyword_fr});
          this.metaService.updateTag({property:'og:title',content:this.currentConsultation.cons_titre_fr});
          this.metaService.updateTag({property:'og:description',content:this.currentConsultation.cons_description_fr});
          this.titleService.setTitle(`Medicardice ${this.currentConsultationTitle}`)
        }
      })
  }
}
