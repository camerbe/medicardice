import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {WelcomeService} from "../../shared/services/welcomes/welcome.service";
import {Media, Welcome} from "../../shared/models/welcome";
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {JsonldService} from "../jsonld.service";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  isLoginModalOpen  = false;
  // @ts-ignore
  currentWelcomeImg:string;
  currentWelcomeTitle!:string;
  welcomeMessage:any;
  currentLocale!:string;

  currentBreadCrumbCurrent=''
  currentBreadCrumbParent= [] = [{ fr: "Accueil", en: 'Home' }];
  breadCrumbCurrent:string='';
  breadCrumbParent:string='';

  currentWelcome!:Welcome
  media!:Media

  constructor(
    private welcomeService:WelcomeService,
    private sanitizer: DomSanitizer,
    private metaService:Meta,
    private titleService:Title,
    private route:ActivatedRoute,
    private jldService:JsonldService,
    private router:Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

  }

  openLoginModal() {
    this.isLoginModalOpen = true;
  }

  closeLoginModal() {
    this.isLoginModalOpen = false;
  }

  ngOnInit(): void {
    this.currentLocale=this.route.snapshot.params['locale'] || 'fr';
    this.breadCrumbParent=this.getBreadCrumb(this.currentLocale);
    this.getWelcome()

  }

  getWelcome(){
    return this.welcomeService.getLastBySlug()
      .subscribe({
        next:res=>{
          // @ts-ignore
          this.currentWelcome=res['data']
          // @ts-ignore
          //console.log(this.currentWelcome['media'])
          // @ts-ignore
          this.media=this.currentWelcome['media']
          //console.log(`Media ${this.media}`)
          // @ts-ignore
          // @ts-ignore
          // @ts-ignore
          let keywords='';
          switch (this.currentLocale){
            // @ts-ignore
            case 'en'  :
              this.currentWelcomeTitle =this.currentWelcome.welcome_titre_en
              this.welcomeMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentWelcome.welcome_msg_en)
              this.metaService.updateTag({name:'description',content:this.currentWelcome.welcome_description_en});
              this.metaService.updateTag({name:'keyword',content:this.currentWelcome.welcome_keyword_en});
              this.metaService.updateTag({property:'og:title',content:this.currentWelcome.welcome_titre_en});
              this.metaService.updateTag({property:'og:description',content:this.currentWelcome.welcome_description_en});
              this.metaService.updateTag({property:'og:image:alt',content:this.currentWelcome.welcome_titre_en});
              //keywords=this.currentWelcome.welcome_keyword_en;
              break
            default:
            case 'fr' :
              this.currentWelcomeTitle =this.currentWelcome.welcome_titre_fr
              this.welcomeMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentWelcome.welcome_msg_fr)
              this.metaService.updateTag({name:'description',content:this.currentWelcome.welcome_description_fr});
              this.metaService.updateTag({name:'keyword',content:this.currentWelcome.welcome_keyword_fr});
              this.metaService.updateTag({property:'og:title',content:this.currentWelcome.welcome_titre_fr});
              this.metaService.updateTag({property:'og:description',content:this.currentWelcome.welcome_description_fr});
              this.metaService.updateTag({property:'og:image:alt',content:this.currentWelcome.welcome_titre_fr});
              //keywords=this.currentWelcome.welcome_keyword_fr;
              break

          }
          //this.currentWelcomeTitle =this.currentWelcome.welcome_titre_fr
          // @ts-ignore
          this.currentWelcomeImg=this.media[0].original_url
          // @ts-ignore
          this.metaService.updateTag({property:'og:image:type',content:this.media[0].mime_type});
          this.metaService.updateTag({property:'og:image',content:this.currentWelcomeImg});
          // @ts-ignore
          this.titleService.setTitle(`Cardiologie - Cabinet Médical Cardice - Medical office cardice :: ${this.currentWelcomeTitle}`)
          this.metaService.updateTag({name:'robots',content:'index, follow'});
          // @ts-ignore
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
                "@id":`${this.currentWelcomeTitle}`
              },
              "headline":`${this.currentWelcomeTitle}`,
              "image": {
                "@type": "ImageObject",
                "url": `${this.currentWelcomeImg}`,
                "height":500,
                "width" :500
              },
              // @ts-ignore
              "datePublished": `${today}`,
              "dateModified": `${today}`,
              "articleSection":"Cardiologie",
              "keywords":this.currentLocale==='fr'? `["${this.currentWelcome.welcome_keyword_fr}"]`:`["${this.currentWelcome.welcome_keyword_en}"]`,
              "author": {
                "@type": "Person",
                "name": "Medicardice",
              },
              "description":this.currentLocale==='fr'? `${this.currentWelcome.welcome_description_fr}`:`${this.currentWelcome.welcome_description_en}`
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

}
