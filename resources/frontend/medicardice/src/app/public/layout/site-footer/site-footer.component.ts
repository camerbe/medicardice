import { Component } from '@angular/core';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.component.html',
  styleUrl: './site-footer.component.css'
})
export class SiteFooterComponent {
  year:string= new Date().getFullYear().toString();
}
