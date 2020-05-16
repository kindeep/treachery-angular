import { Component, OnInit, Input } from '@angular/core';
import { TgCard } from 'src/app/shared/api/models/models';

@Component({
  selector: 'tg-card-wrapper',
  templateUrl: './card-wrapper.component.html',
  styleUrls: ['./card-wrapper.component.scss']
})
export class CardWrapperComponent implements OnInit {
  @Input() card: TgCard;
  constructor() { }

  ngOnInit(): void {
  }

}
