import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-welcome-title',
  templateUrl: './welcome-title.component.html',
  styleUrl: './welcome-title.component.css'
})
export class WelcomeTitleComponent {
  @Input() welcomeTitle!:string
}
