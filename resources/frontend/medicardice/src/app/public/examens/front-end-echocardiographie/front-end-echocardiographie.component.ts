import {Component, OnInit} from '@angular/core';
import {Echocardiographie, Media} from "../../../shared/models/welcome";
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {EchocardiographyService} from "../../../shared/services/echocardiography/echocardiography.service";

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

  currentEchocardiographie!:Echocardiographie
  media!:Media

  constructor(
    private echocardiographieService:EchocardiographyService,
    private sanitizer: DomSanitizer,
    private metaService:Meta,
    private titleService:Title,
    private route:ActivatedRoute
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
              break
            default:
            case 'fr' :
              this.currentEchocardiographieTitle =this.currentEchocardiographie.echocardiography_titre_fr
              this.echocardiographieMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentEchocardiographie.echocardiography_msg_fr)
              this.metaService.updateTag({name:'description',content:this.currentEchocardiographie.echocardiography_description_fr});
              this.metaService.updateTag({name:'keyword',content:this.currentEchocardiographie.echocardiography_keyword_fr});
              this.metaService.updateTag({property:'og:title',content:this.currentEchocardiographie.echocardiography_titre_fr});
              this.metaService.updateTag({property:'og:description',content:this.currentEchocardiographie.echocardiography_description_fr});
              break
          }
          // @ts-ignore
          if(this.media[0].original_url){
            // @ts-ignore
            this.currentEchocardiographieImg=this.media[0].original_url
            this.metaService.updateTag({property:'og:image',content:this.currentEchocardiographieImg});
          }
          this.titleService.setTitle(`Medicardice ${this.currentEchocardiographieTitle}`)
        }
      })
  }

  ngOnInit(): void {
    this.currentLocale=this.route.snapshot.params['locale'];
    this.getEchocardiographie()
  }

}
