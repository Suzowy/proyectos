import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  public widthSlider!: number;
  public anchuraToSlider!: any;
  public autor: any;

  constructor() {

  }

  ngOnInit() {

  }

}
