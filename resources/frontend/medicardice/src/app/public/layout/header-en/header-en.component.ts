import { Component } from '@angular/core';
import {TranslationService} from "../../../shared/services/translation.service";

@Component({
  selector: 'app-header-en',
  templateUrl: './header-en.component.html',
  styleUrl: './header-en.component.css'
})
export class HeaderEnComponent {
  currentLang!:string;
  constructor(private translateService :TranslationService) {
    this.currentLang=this.translateService.getCurrentLang();
  }
}
