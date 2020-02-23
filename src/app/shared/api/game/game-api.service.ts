import {TgGame, TgForensicCard, DefaultTgPlayer} from '../models/models';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument, DocumentReference} from '@angular/fire/firestore';

const GAME_COMPLETE_EXPIRE_TIME = 10 * 60 * 1000;
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;
import {plainToClass, classToPlain} from 'class-transformer';
import {getPlainObject} from '../models/util';

@Injectable({
  providedIn: 'root'
})
export class GameApiService {
  private gameId: string;
  private playerName: string;
  gameInstance: TgGame;
  gameReference: AngularFirestoreDocument;
  game: Observable<TgGame>;

  constructor(private db: AngularFirestore) {
    this.gameId = null;
  }

  getGame(): Observable<TgGame> {
    return this.game;
  }

  generateRandomGame() {
    return this.db.collection('games').add({});
  }

  getGameDoc(gameId: string): AngularFirestoreDocument {
    return this.db.collection('games').doc(gameId);
  }

  getCurrentGameDoc(): AngularFirestoreDocument {
    return this.getGameDoc(this.gameId);
  }

  activeGamesQuery() {
    const currTime = new Date().getTime(); // current Time in seconds
    const expiredCreation = new Date(currTime - GAME_COMPLETE_EXPIRE_TIME);
    console.log(`Expired creation: ${expiredCreation} ${expiredCreation.getTime()}`);
    return this.db.collection('games', ref =>
      ref
        .where('started', '==', false)
        .orderBy('createdTimestamp', 'desc')
        .where('createdTimestamp', '>', expiredCreation)
    );
  }

  setGameId(gameId) {
    if (this.gameId !== gameId) {
      this.gameId = gameId;
      console.log(`Set game id to: ${this.gameId}`);
      this.gameReference = this.getGameDoc(this.gameId);
      this.game = this.gameReference.valueChanges() as Observable<TgGame>;
      // this.gameInstance = gameDoc.valueChanges();
      this.gameReference.ref.get().then(snapshot => {
        this.gameInstance = snapshot.data() as TgGame;
        console.log('Game api instance set');
      });
      this.gameReference.ref.onSnapshot(snapshot => {
        this.gameInstance = snapshot.data() as TgGame;
        console.log('Game api instance update');
      });
    }
  }

  getGameObservable() {
    return this.game;
  }

  setPlayerName(value) {
    this.playerName = value;
  }

  getPlayerName() {
    return this.playerName;
  }

  addPlayer(playerName) {
    const newPlayer = getPlainObject(new DefaultTgPlayer());
    newPlayer.playerName = playerName;
    this.db.firestore
      .runTransaction(transaction =>
        // This code may get re-run multiple times if there are conflicts.
        transaction.get(this.gameReference.ref).then(sfDoc => {
          // const newPopulation = sfDoc.data().population + 1;
          const gameInstance: TgGame = sfDoc.data() as TgGame;
          console.log(gameInstance.players);
          gameInstance.players.push(newPlayer);
          console.log(gameInstance.players);
          transaction.update(this.gameReference.ref, {players: classToPlain(gameInstance.players)});
        })
      )
      .then(() => console.log('Player transaction successfully committed!'))
      .catch(error => console.log('Player transaction failed: ', error));
  }

}
