import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-titre',
  templateUrl: './titre.component.html',
  styleUrl: './titre.component.css'
})
export class TitreComponent {
  // @ts-ignore
  @Input() titre! :string
}
