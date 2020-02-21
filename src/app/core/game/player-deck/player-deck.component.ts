import {TgCard, TgGame, TgPlayer} from '../../../shared/api/firebase/GameSnapshot';
import {GameApiService} from '../../../shared/api/game/game-api.service';
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CardApiService} from '../../../shared/api/card/card-api.service';

@Component({
  selector: 'app-player-deck',
  templateUrl: './player-deck.component.html',
  styleUrls: ['./player-deck.component.scss']
})
export class PlayerDeckComponent implements OnInit {
  @Input() player: TgPlayer;
  @Input() disableSelection = false;
  @Input() clue: string;
  @Output() clueChange = new EventEmitter<string>();
  @Input() means: string;
  @Output() meansChange = new EventEmitter<string>();


  constructor() {
  }

  clueClick(cardName) {
    this.clue = cardName;
    this.clueChange.emit(this.clue);
  }

  meansClick(cardName) {
    this.means = cardName;
    this.meansChange.emit(this.means);
  }


  ngOnInit() {
  }
}
