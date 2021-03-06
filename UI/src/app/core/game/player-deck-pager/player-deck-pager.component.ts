import { GameApiService } from './../../../shared/api/game/game-api.service';
import { TgCard, TgGuess, TgPlayer, TgPartialGuess } from '../../../shared/api/models/models';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerApiService } from '../../../shared/api/player/player-api.service';
import { AuthService } from './../../../shared/api/auth/auth.service';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-player-deck-pager',
  templateUrl: './player-deck-pager.component.html',
  styleUrls: ['./player-deck-pager.component.scss']
})
export class PlayerDeckPagerComponent implements OnInit {
  players$: Observable<TgPlayer[]>;
  @Input() guess: TgPartialGuess = {} as TgPartialGuess;
  @Input() disableSelection: boolean;
  selectedClue: string;
  selectedMeans: string;
  player$: Observable<TgPlayer>;

  constructor(gameApi: GameApiService, private auth: AuthService) {
    this.players$ = gameApi.getCurrentGamePlayers();
    this.player$ = gameApi.getCurrentGamePlayer();
  }

  ngOnInit() {
  }


  handleClueChange(player: TgPlayer) {
    this.guess.murdererUid = player.uid;
    if (!player.meansCards.some(card => card.name === this.selectedMeans)) {
      this.selectedMeans = null;
    }
    this.guess.meansCardName = this.selectedMeans;
    this.guess.clueCardName = this.selectedClue;
  }

  handleMeansChange(player: TgPlayer) {
    this.guess.murdererUid = player.uid;
    if (!player.clueCards.some(card => card.name === this.selectedClue)) {
      this.selectedClue = null;
    }
    this.guess.meansCardName = this.selectedMeans;
    this.guess.clueCardName = this.selectedClue;
  }

  otherPlayers(players: TgPlayer[]) {
    return players ? players.filter(player => player.uid !== this.auth.user.uid) : null;
  }
}
