import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {timestamp} from "rxjs";

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.css'
})
export class SiteHeaderComponent implements OnInit{
  //currentLang!: string;
  cunrrentSlug!:string;
  @Input() currentLang!:string
  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentLang = params['lang'] || 'fr';
      this.cunrrentSlug= params['slug'];
    });
  }

  protected readonly timestamp = timestamp;

  handleData($event: string) {

  }
}
