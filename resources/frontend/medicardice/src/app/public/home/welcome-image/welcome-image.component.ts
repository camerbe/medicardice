import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-welcome-image',
  templateUrl: './welcome-image.component.html',
  styleUrl: './welcome-image.component.css'
})
export class WelcomeImageComponent {
  @Input() welcomeImage!:string;
}
