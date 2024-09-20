import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-header-list-title',
  templateUrl: './header-list-title.component.html',
  styleUrl: './header-list-title.component.css'
})
export class HeaderListTitleComponent {
  @Input({required:true}) labelTitle!:()=>string;
}
