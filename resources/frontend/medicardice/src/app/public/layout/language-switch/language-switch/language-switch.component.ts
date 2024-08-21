import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrl: './language-switch.component.css'
})
export class LanguageSwitchComponent implements OnInit{

  currentLang: 'fr' | 'en' = 'fr';
  //@Output() langEvent = new EventEmitter<string>();
  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private componentFactoryResolver:ComponentFactoryResolver
  ) {}
  toggleLanguage() {
    let newUrl:string=''
    this.currentLang = this.currentLang === 'en' ? 'fr' : 'en';
    if(this.currentLang==='fr') {
      newUrl=`accueil/${this.currentLang}`;
    }
    else{
      newUrl = `home/${this.currentLang}`;
    }
    this.router.navigateByUrl(newUrl).then(() => {
      window.location.reload();
    });
  }
  /*sendData() {
    this.langEvent.emit(this.currentLang );
  }*/
  get buttonLabel(): string {
    return this.currentLang === 'en' ? 'Fr' : 'En';
  }

  ngOnInit(): void {
    this.currentLang=this.route.snapshot.params['locale'];
  }
}
