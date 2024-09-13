import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-en',
  templateUrl: './contact-en.component.html',
  styleUrl: './contact-en.component.css'
})
export class ContactEnComponent {
  currentMedecinTitle: string="contact us";
  breadCrumbParent: string="Contact";
  currentMedecinImg: string='./assets/images/contact.webp';
  currentLocale:string='en';
}
