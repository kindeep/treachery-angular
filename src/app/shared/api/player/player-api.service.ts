import {Injectable} from '@angular/core';
import {GameApiService} from '../game/game-api.service';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {TgGame, TgGuess, TgPlayer} from '../models/models';
import {getPlainObject} from '../util';
import {classToPlain} from 'class-transformer';
import {AngularFirestore} from '@angular/fire/firestore';
import {ChatApiService} from '../chat/chat-api.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerApiService {

  constructor(private gameApiService: GameApiService, private db: AngularFirestore, private chatApi: ChatApiService) {
  }

  getPlayer(playerName: string): Observable<TgPlayer> {
    return this.getAllPlayers().pipe(map(players => {
      return players.find(player => player.playerName = playerName);
    })) as Observable<TgPlayer>;
  }

  getCurrentPlayer(): Observable<TgPlayer> {
    return this.getPlayer(this.gameApiService.getPlayerName());
  }

  getAllPlayers(): Observable<TgPlayer[]> {
    return this.gameApiService.getGame().pipe(map(game => {
      return game.players;
    })) as Observable<TgPlayer[]>;
  }

  selectMurdererCards(clueCardName: string, meansCardName: string) {
    // TODO: figure out how to return a promise instead of logging
    this.getCurrentPlayer().pipe(take(1)).subscribe(player => {
      const clueCard = player.clueCards.find(card => card.name === clueCardName);
      const meansCard = player.meansCards.find(card => card.name === meansCardName);
      this.gameApiService.getCurrentGameDoc().update({murdererClueCard: clueCard, murdererMeansCard: meansCard}).then(() => {
        console.log('Murder Successful!');
      }).catch((e) => {
        console.error('Murder failed');
        console.error(e);
      });
    });
  }

  makeGuess(guess: TgGuess) {
    const gameRef = this.gameApiService.getCurrentGameDoc().ref;
    this.getCurrentPlayer().pipe(take(1)).subscribe(player => {
      this.db.firestore
        .runTransaction(transaction =>
          transaction.get(gameRef).then(gameSnapshot => {
            const game: TgGame = gameSnapshot.data() as TgGame;
            game.guesses.push(getPlainObject(guess));
            transaction.update(gameRef, {players: classToPlain(game.players)});
          })
        )
        .then(() => {
          // this.chatApi.sendGuessedMessage(guess);
          console.log('Guess transaction successfully committed!');
        })
        .catch(error => console.log('Guess transaction failed: ', error));
    });
  }
}
