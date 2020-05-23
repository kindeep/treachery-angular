import { GameApiService } from './../../../shared/api/game/game-api.service';
import { Component, Input, OnInit } from '@angular/core';
import { PlayerApiService } from '../../../shared/api/player/player-api.service';
import { TgGuess, TgPartialGuess } from '../../../shared/api/models/models';
import { TgCard } from 'src/app/shared/api/models/models';
import { map, take } from 'rxjs/operators';
import { TgPlayer } from './../../../shared/api/models/models';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/app/shared/api/auth/auth.service';
import { SnackBarService } from 'src/app/shared/api/snack-bar/snack-bar.service';
import { ChatApiService } from 'src/app/shared/api/chat/chat-api.service';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.scss']
})
export class GuessComponent implements OnInit {
  @Input() guess: TgPartialGuess;
  constructor(public gameApi: GameApiService, public auth: AuthService, public snack: SnackBarService, public chatApi: ChatApiService) {
  }

  ngOnInit() {
  }

  makeGuess() {
    this.gameApi.guesses$.pipe(take(1)).subscribe(guesses => {
      this.gameApi.playersDict$.pipe(take(1)).subscribe(playersDict => {
        if (guesses.filter(guess => guess.guessedByUid === this.auth.user.uid).length === 0) {
          this.gameApi.makeGuess(this.guess);
        } else {
          this.snack.error("You've already made a guess! But will send a message for your investigator colleagues.");
          this.chatApi.sendMessage(`I don't have any guesses left, but I think it's ${playersDict.get(this.guess.murdererUid).name} with '${this.guess.clueCardName}' and '${this.guess.meansCardName}'`);
        }
      });
    });
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
