import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent implements OnInit {
  public title: string | undefined;
  public subtitle: string | undefined;
  public email: string | undefined;

  constructor() {

    this.title = "Soraya Casanova";
    this.subtitle = "Fullstack Developer";
    this.email = "suzowy@gmail.com";
  }  ngOnInit(): void {

  }
}
