import {Component, OnInit} from '@angular/core';
import {Media, Monitoring} from "../../../shared/models/welcome";
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {MonitoringService} from "../../../shared/services/monitoring/monitoring.service";

@Component({
  selector: 'app-front-end-monitoring',
  templateUrl: './front-end-monitoring.component.html',
  styleUrl: './front-end-monitoring.component.css'
})
export class FrontEndMonitoringComponent implements OnInit {

  currentMonitoringImg!:string;
  currentMonitoringTitle!:string;
  monitoringMessage:any;
  currentLocale:string='fr';
  currentMonitoring!:Monitoring
  media!:Media

  constructor(
    private monitoringService:MonitoringService,
    private sanitizer: DomSanitizer,
    private metaService:Meta,
    private titleService:Title,
    private route:ActivatedRoute
  ) {}

  private getMonitoring() {
    return this.monitoringService.getLastMonitoringBySlug()
      .subscribe({
        next:res=>{
          // @ts-ignore
          this.currentMonitoring=res['data']
          // @ts-ignore
          this.media=this.currentMonitoring['media']
          switch (this.currentLocale){
            // @ts-ignore
            case 'en'  :
              this.currentMonitoringTitle =this.currentMonitoring.monitoring_titre_en
              this.monitoringMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentMonitoring.monitoring_msg_en)
              this.metaService.updateTag({name:'description',content:this.currentMonitoring.monitoring_description_en});
              this.metaService.updateTag({name:'keyword',content:this.currentMonitoring.monitoring_keyword_en});
              this.metaService.updateTag({property:'og:title',content:this.currentMonitoring.monitoring_titre_en});
              this.metaService.updateTag({property:'og:description',content:this.currentMonitoring.monitoring_description_en});
              break
            default:
            case 'fr' :
              this.currentMonitoringTitle =this.currentMonitoring.monitoring_titre_fr
              this.monitoringMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentMonitoring.monitoring_msg_fr)
              this.metaService.updateTag({name:'description',content:this.currentMonitoring.monitoring_description_fr});
              this.metaService.updateTag({name:'keyword',content:this.currentMonitoring.monitoring_keyword_fr});
              this.metaService.updateTag({property:'og:title',content:this.currentMonitoring.monitoring_titre_fr});
              this.metaService.updateTag({property:'og:description',content:this.currentMonitoring.monitoring_description_fr});
              break
          }
          // @ts-ignore
          if(this.media[0].original_url){
            // @ts-ignore
            this.currentMonitoringImg=this.media[0].original_url
            this.metaService.updateTag({property:'og:image',content:this.currentMonitoringImg});
          }
          this.titleService.setTitle(`Medicardice ${this.currentMonitoringTitle}`)
        }
      })
  }
  ngOnInit(): void {
    this.currentLocale=this.route.snapshot.params['locale'];
    this.getMonitoring();
  }

}
