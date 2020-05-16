import {TgCard, TgGame, TgPlayer} from '../../../shared/api/models/models';
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
  @Input() selectedClue: string;
  @Output() selectedClueChange = new EventEmitter<string>();
  @Input() selectedMeans: string;
  @Output() selectedMeansChange = new EventEmitter<string>();


  constructor() {
  }

  clueClick(cardName) {
    this.selectedClue = cardName;
    this.selectedClueChange.emit(this.selectedClue);
  }

  meansClick(cardName) {
    this.selectedMeans = cardName;
    this.selectedMeansChange.emit(this.selectedMeans);
  }


  ngOnInit() {
  }
}
