import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-welcome-article',
  templateUrl: './welcome-article.component.html',
  styleUrl: './welcome-article.component.css'
})
export class WelcomeArticleComponent {
  @Input() welcomeArticle:any
}
