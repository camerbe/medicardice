import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Media, Monitoring} from "../../../shared/models/welcome";
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {MonitoringService} from "../../../shared/services/monitoring/monitoring.service";
import {JsonldService} from "../../jsonld.service";

@Component({
  selector: 'app-front-end-monitoring',
  templateUrl: './front-end-monitoring.component.html',
  styleUrl: './front-end-monitoring.component.css'
})
export class FrontEndMonitoringComponent implements OnInit {


  currentBreadCrumbCurrent=[]=[{fr: "Monitoring", en: 'Blood pressure'}];
  currentBreadCrumbParent= [] = [{ fr: "Examens", en: 'Exams' }];
  breadCrumbCurrent:string='';
  breadCrumbParent:string='';
  currentMonitoringImg!:string;
  currentMonitoringTitle!:string;
  monitoringMessage:any;
  currentLocale:string='fr';
  currentMonitoring!:Monitoring
  media!:Media
  altImage!: string;

  constructor(
    private monitoringService:MonitoringService,
    private sanitizer: DomSanitizer,
    private metaService:Meta,
    private titleService:Title,
    private route:ActivatedRoute,
    private router: Router,
    private jldService:JsonldService,
    @Inject(PLATFORM_ID) private platformId: Object
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
    this.breadCrumbParent=this.getBreadCrumb(this.currentLocale);
    this.breadCrumbCurrent=this.getBreadCrumbCurrent(this.currentLocale);
    this.getMonitoring();
  }
  getBreadCrumb(locale:string){
    const breadcrumb= locale==='fr'? this.currentBreadCrumbParent.map(item=>item.fr):this.currentBreadCrumbParent.map(item=>item.en);
    return breadcrumb[0]
  }
  getBreadCrumbCurrent(locale:string){
    const breadcrumb= locale==='fr'? this.currentBreadCrumbCurrent.map(item=>item.fr):this.currentBreadCrumbCurrent.map(item=>item.en);
    return breadcrumb[0]
  }

}
