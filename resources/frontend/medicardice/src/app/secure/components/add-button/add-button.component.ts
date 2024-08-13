import {Component, Input, signal} from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.css'
})
export class AddButtonComponent {
  routerLinkSignal = signal<string | undefined>(undefined);

  @Input({required:true}) label!:()=>string;
  @Input() set routerLink(value: string) {
    this.routerLinkSignal.set(value);
  }

  constructor() {
  }
}
