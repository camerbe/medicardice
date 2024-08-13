import { Component } from '@angular/core';
import {TranslationService} from "../../../shared/services/translation.service";

@Component({
  selector: 'app-header-fr',
  templateUrl: './header-fr.component.html',
  styleUrl: './header-fr.component.css'
})
export class HeaderFrComponent {
  currentLang!:string;
  constructor(private translateService:TranslationService) {
    this.currentLang=this.translateService.getCurrentLang()
  }
}
