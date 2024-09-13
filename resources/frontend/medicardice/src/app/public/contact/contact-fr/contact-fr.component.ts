import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-fr',
  templateUrl: './contact-fr.component.html',
  styleUrl: './contact-fr.component.css'
})
export class ContactFrComponent {
  currentMedecinTitle: string="contact";
  breadCrumbParent: string="Contact";
  currentMedecinImg: string='./assets/images/contact.webp';
  currentLocale:string='fr';

}
