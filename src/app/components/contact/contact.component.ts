import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public widthSlider!: number;
  public anchuraToSlider!: any;
  public autor: any;
  public email = 'suzowy@gmail.com';
  constructor() {

  }

  ngOnInit() {

  }

}
