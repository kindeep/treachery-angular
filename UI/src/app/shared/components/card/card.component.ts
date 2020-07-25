

import { Component, OnInit, Input } from '@angular/core';
import { TgCard } from '../../api/models/models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: TgCard;
  @Input() active = false;
  @Input() means: boolean;
  constructor() {}

  ngOnInit() {}
}
