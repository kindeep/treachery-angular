import { GameApiService } from './../../../shared/api/game/game-api.service';
import {TgCard, TgGuess, TgPlayer} from '../../../shared/api/models/models';
import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {PlayerApiService} from '../../../shared/api/player/player-api.service';

@Component({
  selector: 'app-player-deck-pager',
  templateUrl: './player-deck-pager.component.html',
  styleUrls: ['./player-deck-pager.component.scss']
})
export class PlayerDeckPagerComponent implements OnInit {
  players$: Observable<TgPlayer[]>;
  @Input() guess: TgGuess;
  selectedClue: string;
  selectedMeans: string;

  constructor(gameApi: GameApiService) {
    this.players$ = gameApi.getCurrentGamePlayers();
  }

  ngOnInit() {
  }


  handleClueChange(player: TgPlayer) {
    this.guess.guessedPlayer = player.name;
    if (!player.meansCards.some(card => card.name === this.selectedMeans)) {
      this.selectedMeans = null;
    }
    this.guess.meansCard = this.selectedMeans;
    this.guess.clueCard = this.selectedClue;
  }

  handleMeansChange(player: TgPlayer) {
    this.guess.guessedPlayer = player.name;
    if (!player.clueCards.some(card => card.name === this.selectedClue)) {
      this.selectedClue = null;
    }
    this.guess.meansCard = this.selectedMeans;
    this.guess.clueCard = this.selectedClue;
  }
}
