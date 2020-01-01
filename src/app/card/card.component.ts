import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() imgSrc: string = 'https://i.imgur.com/1F5dBju.png';
  @Input() name: string = 'Card Name';
  constructor() {

  }

  ngOnInit() {

  }
}