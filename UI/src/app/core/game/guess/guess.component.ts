import { GameApiService } from './../../../shared/api/game/game-api.service';
import { Component, Input, OnInit } from '@angular/core';
import { PlayerApiService } from '../../../shared/api/player/player-api.service';
import { TgGuess, TgPartialGuess } from '../../../shared/api/models/models';
import { TgCard } from 'src/app/shared/api/models/models';
import { map } from 'rxjs/operators';
import { TgPlayer } from './../../../shared/api/models/models';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.scss']
})
export class GuessComponent implements OnInit {
  @Input() guess: TgPartialGuess;
  constructor(public gameApi: GameApiService) {
  }

  ngOnInit() {
  }

  makeGuess() {
    this.gameApi.makeGuess(this.guess);
  }

  getMurderer(players) {
    return players.find(player => player.uid === this.guess.murdererUid);
  }

  getClueCard(murderer: TgPlayer) {
    return murderer.clueCards.find(card => card.name === this.guess.clueCardName)
  }

  getMeansCard(murderer: TgPlayer) {
    return murderer.meansCards.find(card => card.name === this.guess.meansCardName)

  }

}
