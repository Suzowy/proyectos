import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  public title: string | undefined;
  public subtitle: string | undefined;
  public email: string | undefined;

  constructor() {

    this.title = "Soraya Casanova";
    this.subtitle = "Fullstack Developer";
    this.email = "suzowy@gmail.com";
  }

  ngOnInit() {

  }
}
