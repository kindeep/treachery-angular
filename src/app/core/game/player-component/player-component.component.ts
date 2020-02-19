import { CardComponent } from '../../../shared/card/card.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-component',
  templateUrl: './player-component.component.html',
  styleUrls: ['./player-component.component.scss']
})
export class PlayerComponentComponent implements OnInit {
  clues: CardComponent[];
  means: CardComponent[];

  constructor() {
    this.clues = [new CardComponent(), new CardComponent(), new CardComponent(), new CardComponent()];
    this.means = [new CardComponent(), new CardComponent(), new CardComponent(), new CardComponent()];
  }

  ngOnInit() {}
}
