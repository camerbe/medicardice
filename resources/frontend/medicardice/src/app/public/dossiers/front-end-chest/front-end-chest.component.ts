import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Chest, Media} from "../../../shared/models/welcome";
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {ChestService} from "../../../shared/services/chests/chest.service";
import {JsonldService} from "../../jsonld.service";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-front-end-chest',
  templateUrl: './front-end-chest.component.html',
  styleUrl: './front-end-chest.component.css'
})
export class FrontEndChestComponent implements OnInit{

  currentBreadCrumbCurrent=[]=[{fr: "Douleur Thoracique", en: 'Chest pain'}];
  currentBreadCrumbParent= [] = [{ fr: "Dossiers", en: 'Files' }];
  breadCrumbCurrent:string='';
  breadCrumbParent:string='';

  currentChestImg!:string;
  currentChestTitle!:string;
  chestMessage:any;
  currentLocale!:string;
  currentChest!:Chest
  media!:Media
  altImage!: string;

  constructor(
    private chestService:ChestService,
    private sanitizer: DomSanitizer,
    private metaService:Meta,
    private titleService:Title,
    private route:ActivatedRoute,
    private router: Router,
    private jldService:JsonldService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getChest() {
    return this.chestService.getLastChestBySlug()
      .subscribe({
        next:res=>{
          // @ts-ignore
          this.currentChest=res['data']
          // @ts-ignore
          this.media=this.currentChest['media']
          switch (this.currentLocale){
            // @ts-ignore
            case 'en'  :
              this.currentChestTitle =this.currentChest.chest_titre_en
              this.chestMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentChest.chest_msg_en)
              this.metaService.updateTag({name:'description',content:this.currentChest.chest_description_en});
              this.metaService.updateTag({name:'keyword',content:this.currentChest.chest_keyword_en});
              this.metaService.updateTag({property:'og:title',content:this.currentChest.chest_titre_en});
              this.metaService.updateTag({property:'og:description',content:this.currentChest.chest_description_en});
              this.metaService.updateTag({property:'og:image:alt',content:this.currentChest.chest_titre_en});
              break
            default:
            case 'fr' :
              this.currentChestTitle =this.currentChest.chest_titre_fr
              this.chestMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentChest.chest_msg_fr)
              this.metaService.updateTag({name:'description',content:this.currentChest.chest_description_fr});
              this.metaService.updateTag({name:'keyword',content:this.currentChest.chest_keyword_fr});
              this.metaService.updateTag({property:'og:title',content:this.currentChest.chest_titre_fr});
              this.metaService.updateTag({property:'og:description',content:this.currentChest.chest_description_fr});
              this.metaService.updateTag({property:'og:image:alt',content:this.currentChest.chest_titre_fr});
              break
          }
          // @ts-ignore
          if(this.media[0].original_url){
            // @ts-ignore
            this.currentChestImg=this.media[0].original_url
            this.metaService.updateTag({property:'og:image',content:this.currentChestImg});
            // @ts-ignore
            this.metaService.updateTag({property:'og:image:type',content:this.media[0].mime_type});

          }
          this.metaService.updateTag({property:'og:site_name',content:'medicardice.be'});
          this.metaService.updateTag({property:'og:type',content:'article'});

          this.altImage=this.currentChestTitle;
          this.titleService.setTitle(`Cardiologie - Cabinet Médical Cardice - Medical office cardice :: ${this.currentChestTitle}`)
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
                "logo":`${window.location.protocol}//${window.location.host}/assets/images/Medicardice.png`
              },
              "mainEntityOfPage":{
                "@type":"WebPage",
                "@id":`${this.currentChestTitle}`
              },
              "headline":`${this.currentChestTitle}`,
              "image": {
                "@type": "ImageObject",
                "url": `${this.currentChestImg}`,
                "height":500,
                "width" :500
              },
              // @ts-ignore
              "datePublished": `${today}`,
              "dateModified": `${today}`,
              "articleSection":"Cardiologie",
              "keywords":this.currentLocale==='fr'? `["${this.currentChest.chest_keyword_fr}"]`:`["${this.currentChest.chest_keyword_en}"]`,
              "author": {
                "@type": "Person",
                "name": "Medicardice",
              },
              "description":this.currentLocale==='fr'? `${this.currentChest.chest_description_fr}`:`${this.currentChest.chest_description_en}`
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
    this.getChest()
  }

}
