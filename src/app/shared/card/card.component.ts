

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() imgSrc = 'https://i.imgur.com/1F5dBju.png';
  @Input() name = 'Card Name';
  @Input() active = false;
  constructor() {}

  ngOnInit() {}
}
