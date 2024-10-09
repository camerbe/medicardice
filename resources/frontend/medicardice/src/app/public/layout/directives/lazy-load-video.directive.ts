import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[appLazyLoadVideo]'
})
export class LazyLoadVideoDirective implements OnInit{

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    const observer=new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const video=this.el.nativeElement;
          const source=video.getElementsByTagName('source')[0];
          const dataSrc = source.getAttribute('data-src');
          source.setAttribute('src', dataSrc);
          video.load();
          observer.unobserve(video);
        }
      })
    });
    observer.observe(this.el.nativeElement);
  }

}
