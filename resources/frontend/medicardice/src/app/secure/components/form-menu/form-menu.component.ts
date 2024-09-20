import {Component, Input, signal} from '@angular/core';

@Component({
  selector: 'app-form-menu',
  templateUrl: './form-menu.component.html',
  styleUrl: './form-menu.component.css'
})
export class FormMenuComponent {
  routerLinkSignal = signal<string | undefined>(undefined);
  @Input({required:true}) label!:()=>string;
  @Input() set routerLink(value: string) {
    this.routerLinkSignal.set(value);
  }
}
