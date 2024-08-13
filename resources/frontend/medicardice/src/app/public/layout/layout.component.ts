import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TranslationService} from "../../shared/services/translation.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{
  parentLang!:string


  constructor(
    private route:ActivatedRoute,
    private translationService:TranslationService
    )
  {
    this.parentLang=this.translationService.getCurrentLang();
  }

  ngOnInit(): void {

  }
}
