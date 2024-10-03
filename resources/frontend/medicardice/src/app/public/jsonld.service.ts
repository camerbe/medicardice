import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Meta} from "@angular/platform-browser";
import {DOCUMENT, isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class JsonldService {

  constructor(
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private doc: Document
  ) { }

  setJsonLd(data: any) {
    if (isPlatformBrowser(this.platformId)) {
      const json = JSON.stringify(data);
      let script = this.doc.querySelector('script[type="application/ld+json"]');

      if (!script) {
        script = this.doc.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        this.doc.head.appendChild(script);
      }

      script.textContent = json;
    } else {
      // For server-side rendering
      const json = JSON.stringify(data);
      this.meta.addTag({ name: 'json-ld', content: json });
      //this.meta.addTag({ name: 'json-ld', content: json });
      //this.meta.addTag({ name: 'microdata', content: json });
    }
  }
}
