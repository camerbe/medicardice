import {Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class CanonicalService {

  private renderer:Renderer2;
  constructor(
    private rendererFactory: RendererFactory2,
    private sanitizer:DomSanitizer,
    @Inject(DOCUMENT) private doc: Document
  )
  {
    this.renderer=this.rendererFactory.createRenderer(null,null)
  }

  setCanonicalURL(url:string):void {
    const sanitizedUrl=this.sanitizer.bypassSecurityTrustResourceUrl(url);
    const head= this.doc.getElementsByTagName('head')[0];
    let link:HTMLLinkElement=head.querySelector(`link[rel='canonical']`) as HTMLLinkElement;
    if(link){
      this.renderer.setAttribute(link,'href',sanitizedUrl as string);
    }
    else{
      link=this.renderer.createElement('link');
      this.renderer.setAttribute(link, 'href', sanitizedUrl as string);
      this.renderer.appendChild(head, link);
    }
  }


}
