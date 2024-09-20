import {computed, Injectable, signal} from '@angular/core';
// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private currentLang = signal<'fr' | 'en'>('fr');
  getCurrentLang = computed(() => this.currentLang());
  setLanguage(lang: 'fr' | 'en') {
    this.currentLang.set(lang);
  }
}
