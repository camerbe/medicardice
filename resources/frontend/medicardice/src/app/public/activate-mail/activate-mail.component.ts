import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-activate-mail',
  templateUrl: './activate-mail.component.html',
  styleUrl: './activate-mail.component.css'
})
export class ActivateMailComponent implements OnInit{
  name!:string
  constructor(
    private route:ActivatedRoute)
  {

  }
  ngOnInit(){
    this.name=this.route.snapshot.params['name']!;
    console.log(`Name : ${this.name}`)
  }
}
