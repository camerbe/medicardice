import {Component, OnInit} from '@angular/core';
import {Location, Media} from "../../../shared/models/welcome";
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {LocationService} from "../../../shared/services/location/location.service";

@Component({
  selector: 'app-front-end-location',
  templateUrl: './front-end-location.component.html',
  styleUrl: './front-end-location.component.css'
})
export class FrontEndLocationComponent implements OnInit {

  currentBreadCrumbCurrent=''
  currentBreadCrumbParent= [] = [{ fr: "Accès", en: 'Access' }];


  breadCrumbCurrent:string='';
  breadCrumbParent:string='';

  currentLocationImg!:string;
  currentLocationTitle!:string;
  locationMessage:any;
  currentLocale:string='fr';
  currentLocation!:Location;
  media!:Media


  constructor(
    private locationService:LocationService,
    private sanitizer: DomSanitizer,
    private metaService:Meta,
    private titleService:Title,
    private route:ActivatedRoute
  ) {}

  private getLocation() {
    return this.locationService.getLastLocationBySlug()
      .subscribe({
        next:res=>{
          // @ts-ignore
          this.currentLocation=res['data']
          //console.log(`currentLocation : ${this.currentLocation}`)
          // @ts-ignore
          this.media=this.currentLocation['media']
          switch (this.currentLocale){
            // @ts-ignore
            case 'en'  :
              this.currentLocationTitle =this.currentLocation.location_titre_en
              this.locationMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentLocation.location_msg_en)
              this.metaService.updateTag({name:'description',content:this.currentLocation.location_description_en});
              this.metaService.updateTag({name:'keyword',content:this.currentLocation.location_keyword_en});
              this.metaService.updateTag({property:'og:title',content:this.currentLocation.location_titre_en});
              this.metaService.updateTag({property:'og:description',content:this.currentLocation.location_description_en});
              break
            default:
            case 'fr' :
              this.currentLocationTitle =this.currentLocation.location_titre_fr
              this.locationMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentLocation.location_msg_fr)
              this.metaService.updateTag({name:'description',content:this.currentLocation.location_description_fr});
              this.metaService.updateTag({name:'keyword',content:this.currentLocation.location_keyword_fr});
              this.metaService.updateTag({property:'og:title',content:this.currentLocation.location_titre_fr});
              this.metaService.updateTag({property:'og:description',content:this.currentLocation.location_description_fr});
              break
          }
          // @ts-ignore
          if(this.media[0].original_url){
            // @ts-ignore
            this.currentLocationImg=this.media[0].original_url
            this.metaService.updateTag({property:'og:image',content:this.currentLocationImg});
          }
          this.titleService.setTitle(`Cardiologie - Cabinet Médical Cardice - Medical office cardice :: Cardiology - Cardiologue Bruxelles - ${this.currentLocationTitle}`)
        }
      })
  }
  getBreadCrumb(locale:string){
    const breadcrumb= locale==='fr'? this.currentBreadCrumbParent.map(item=>item.fr):this.currentBreadCrumbParent.map(item=>item.en);
    //console.log(`breadcrumb ${breadcrumb}`)
    return breadcrumb[0]
  }
  ngOnInit(): void {
    this.currentLocale=this.route.snapshot.params['locale'];
    this.breadCrumbParent=this.getBreadCrumb(this.currentLocale);
    this.getLocation()
  }

}
