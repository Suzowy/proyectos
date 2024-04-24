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

  }

  ngOnInit(): void {



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


}
