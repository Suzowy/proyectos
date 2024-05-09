import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public widthSlider!: number;
  public anchuraToSlider!: any;
  public autor: any;
  public email: string = 'suzowy@gmail.com';
  showSuccessMessage: boolean | undefined;
  constructor() {

  }

  ngOnInit() {
    this.email = 'suzowy@gmail.com';
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.showSuccessMessage = true;
      form.reset();
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 5000);
    } else {
      console.log('Formulario no válido');
    }
  }
}
