import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrl: './language-switch.component.css'
})
export class LanguageSwitchComponent {

  currentLang: 'fr' | 'en' = 'fr';
  //@Output() langEvent = new EventEmitter<string>();
  constructor(private router: Router) {}
  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'fr' : 'en';
    const newUrl = `home/${this.currentLang}`;
    this.router.navigateByUrl(newUrl).then(() => {
      //window.location.reload();
    });
  }
  /*sendData() {
    this.langEvent.emit(this.currentLang );
  }*/
  get buttonLabel(): string {
    return this.currentLang === 'en' ? 'Fr' : 'En';
  }
}
