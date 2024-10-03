import {Component, OnInit} from '@angular/core';
import {Location, Media} from "../../../shared/models/welcome";
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {LocationService} from "../../../shared/services/location/location.service";
import {JsonldService} from "../../jsonld.service";

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
  altImage!: string;


  constructor(
    private locationService:LocationService,
    private sanitizer: DomSanitizer,
    private metaService:Meta,
    private titleService:Title,
    private route:ActivatedRoute,
    private router:Router,
    private jldService:JsonldService
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
              this.metaService.updateTag({property:'og:image:alt',content:this.currentLocation.location_titre_en});
              break
            default:
            case 'fr' :
              this.currentLocationTitle =this.currentLocation.location_titre_fr
              this.locationMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentLocation.location_msg_fr)
              this.metaService.updateTag({name:'description',content:this.currentLocation.location_description_fr});
              this.metaService.updateTag({name:'keyword',content:this.currentLocation.location_keyword_fr});
              this.metaService.updateTag({property:'og:title',content:this.currentLocation.location_titre_fr});
              this.metaService.updateTag({property:'og:description',content:this.currentLocation.location_description_fr});
              this.metaService.updateTag({property:'og:image:alt',content:this.currentLocation.location_titre_fr});
              break
          }
          this.altImage=this.currentLocationTitle
          // @ts-ignore
          if(this.media[0].original_url){
            // @ts-ignore
            this.currentLocationImg=this.media[0].original_url
            this.metaService.updateTag({property:'og:image',content:this.currentLocationImg});
            // @ts-ignore
            this.metaService.updateTag({property:'og:image:type',content:this.media[0].mime_type});
          }

          this.titleService.setTitle(`Cabinet Médical Cardice - Medical office cardice :: ${this.currentLocationTitle}`)
          this.metaService.updateTag({name:'robots',content:'index, follow'});

          const date =new Date(Date.now());
          const today=date.toISOString().slice(0, 19) + '+00:00'
          // @ts-ignore

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
              "@id":`${this.currentLocationTitle}`
            },
            "headline":`${this.currentLocationTitle}`,
            "image": {
              "@type": "ImageObject",
              "url": `${this.currentLocationImg}`,
              "height":500,
              "width" :500
            },
            // @ts-ignore
            "datePublished": `${today}`,
            "dateModified": `${today}`,
            "articleSection":"Cardiologie",
            "keywords":this.currentLocale==='fr'? `["${this.currentLocation.location_titre_fr}"]`:`["${this.currentLocation.location_titre_en}"]`,
            "author": {
              "@type": "Person",
              "name": "Medicardice",
            },
            "description":this.currentLocale==='fr'? `${this.currentLocation.location_description_fr}`:`${this.currentLocation.location_description_en}`
          }
          this.jldService.setJsonLd(jsonLd)
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
