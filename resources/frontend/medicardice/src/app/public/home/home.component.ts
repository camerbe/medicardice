import {Component, OnInit} from '@angular/core';
import {WelcomeService} from "../../shared/services/welcomes/welcome.service";
import {Media, Welcome} from "../../shared/models/welcome";
import {DomSanitizer, Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";

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
    private route:ActivatedRoute
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
          switch (this.currentLocale){
            // @ts-ignore
            case 'en'  :
              this.currentWelcomeTitle =this.currentWelcome.welcome_titre_en
              this.welcomeMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentWelcome.welcome_msg_en)
              break
            default:
            case 'fr' :
              this.currentWelcomeTitle =this.currentWelcome.welcome_titre_fr
              this.welcomeMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentWelcome.welcome_msg_fr)
              break

          }
          //this.currentWelcomeTitle =this.currentWelcome.welcome_titre_fr
          // @ts-ignore
          this.currentWelcomeImg=this.media[0].original_url
          //this.welcomeMessage=this.sanitizer.bypassSecurityTrustHtml(this.currentWelcome.welcome_msg_fr)
          //const template=this.sanitizer.bypassSecurityTrustHtml(this.currenWelcome.welcome_msg_fr)
          // @ts-ignore
         //console.log(`Current image ${this.currentWelcomeImg} ${this.media[0].original_url}`)
          // @ts-ignore
          this.metaService.updateTag({name:'description',content:this.currentWelcome.welcome_description_fr});
          this.metaService.updateTag({name:'keyword',content:this.currentWelcome.welcome_keyword_fr});
          this.metaService.updateTag({property:'og:title',content:this.currentWelcome.welcome_titre_fr});
          this.metaService.updateTag({property:'og:description',content:this.currentWelcome.welcome_description_fr});
          this.metaService.updateTag({property:'og:image',content:this.currentWelcomeImg});
          this.titleService.setTitle(`Medicardice ${this.currentWelcomeTitle}`)
        }
      })
  }
  getBreadCrumb(locale:string){
    const breadcrumb= locale==='fr'? this.currentBreadCrumbParent.map(item=>item.fr):this.currentBreadCrumbParent.map(item=>item.en);
    return breadcrumb[0]
  }

}
