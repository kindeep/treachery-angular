import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  imgSrc: string;
  name: string;
  constructor() {
    this.imgSrc = 'https://i.imgur.com/1F5dBju.png';
    this.name = 'Card Name';
  }

  ngOnInit() {

  }
}