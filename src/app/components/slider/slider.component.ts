import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
declare var $: any;

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit {
  [x: string]: any;

  @Input()
  anchura!: number;
@Output() conseguirAutor = new EventEmitter();

  constructor() {
    this['autor']={
      nombre:"Soraya Casanova",
      website:"suzowyweb.es",
      github:"suzowy"
    }
  }

  ngOnInit(): void {
    $("logo").click(function (e: { preventDefault: () => void; }) {
      e.preventDefault();
      $("header").css("background", "pink")
        .css("height", "50px");
    });

    $('.galeria').bxSlider({
      adaptiveHeight: true,
      adaptiveWidth:true,
      auto: true,
      autoControls: true,
      stopAutoOnClick: true,
      pager: true,
      slideWidth: this.anchura
    });;
  }
lanzar(event: any){
  console.log(event);

  this.conseguirAutor.emit(this['autor']);
}
}
