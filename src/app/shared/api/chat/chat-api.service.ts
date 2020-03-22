import {Injectable} from '@angular/core';
import {GameApiService} from '../game/game-api.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {TgGame, TgGuess, TgMessage, TgMessageType} from '../models/models';
import {classToPlain} from 'class-transformer';
import {PlayerApiService} from '../player/player-api.service';
import {firestore} from 'firebase';
import Timestamp = firestore.Timestamp;
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatApiService {

  constructor(
    private db: AngularFirestore,
    private gameApi: GameApiService,
  ) {
  }

  sendMessage(message: string, playerName: string, type: TgMessageType) {
    const gameRef = this.gameApi.getCurrentGameDoc().ref;
    this.db.firestore
      .runTransaction(transaction =>
        transaction.get(gameRef).then(gameSnapshot => {
          const game: TgGame = gameSnapshot.data() as TgGame;
          game.messages.push({
            playerName,
            message,
            timestamp: Timestamp.now(),
            type,
          });
          transaction.update(gameRef, {messages: classToPlain(game.messages)});
        })
      )
      .then(() => console.log('Guess transaction successfully committed!'))
      .catch(error => console.log('Guess transaction failed: ', error));
  }

  sendGuessedMessage(guess: TgGuess) {
    this.sendMessage(`${guess.guessedPlayer} is the murderer, with ${guess.meansCard} and ${guess.clueCard}`,
      guess.guesserPlayer,
      TgMessageType.TWO);
  }

  sendChatMessage(message: string) {
    this.sendMessage(message, this.gameApi.getPlayerName(), TgMessageType.ONE);
  }

  getMessages(): Observable<TgMessage[]> {
    return this.gameApi.getGame().pipe(map(game => {
      return game.messages;
    }));
  }

}
