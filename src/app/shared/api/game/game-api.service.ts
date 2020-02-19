import { GameInstanceSnapshot, ForensicCardSnapshot, DefaultPlayerSnapshot } from '../firebase/GameSnapshot';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
const GAME_COMPLETE_EXPIRE_TIME = 10 * 60 * 1000;
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;
import { plainToClass, classToPlain } from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export class GameApiService {
  db;
  selectedClue: string;
  selectedMeans: string;
  private gameId: string;
  playerName: string;
  gameInstance: GameInstanceSnapshot;
  gameReference: AngularFirestoreDocument;
  gameObserveable: Observable<GameInstanceSnapshot>;

  constructor(db: AngularFirestore) {
    this.db = db;
    this.gameId = null;
  }

  setSelectedClue(value) {
    this.selectedClue = value;
  }

  setSelectedMeans(value) {
    this.selectedMeans = value;
  }

  generateRandomGame() {
    return this.db.collection('games').add({});
  }

  getGameDoc(gameId: string) {
    return this.db.collection('games').doc(gameId);
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

  setGameId(value) {
    if (this.gameId !== value) {
      this.gameId = value;
      console.log(`Set game id to: ${this.gameId}`);
      this.gameReference = this.getGameDoc(this.gameId);
      this.gameObserveable = this.gameReference.valueChanges() as Observable<GameInstanceSnapshot>;
      // this.gameInstance = gameDoc.valueChanges();
      this.gameReference.ref.get().then(snapshot => {
        this.gameInstance = snapshot.data() as GameInstanceSnapshot;
        console.log('Game api instance set');
      });
      this.gameReference.ref.onSnapshot(snapshot => {
        this.gameInstance = snapshot.data() as GameInstanceSnapshot;
        console.log('Game api instance update');
      });
    }
  }

  getGameObservable() {
    return this.gameObserveable;
  }

  setPlayerName(value) {
    this.playerName = value;
  }

  addPlayer(playerName) {
    let newPlayer = this.getPlainObject(new DefaultPlayerSnapshot());
    newPlayer.playerName = playerName;
    this.db.firestore
      .runTransaction(transaction =>
        // This code may get re-run multiple times if there are conflicts.
        transaction.get(this.gameReference.ref).then(sfDoc => {
          // const newPopulation = sfDoc.data().population + 1;
          const gameInstance: GameInstanceSnapshot = sfDoc.data();
          console.log(gameInstance.players);
          gameInstance.players.push(newPlayer);
          console.log(gameInstance.players);
          transaction.update(this.gameReference.ref, { players: classToPlain(gameInstance.players) });
        })
      )
      .then(() => console.log('Player transaction successfully committed!'))
      .catch(error => console.log('Player transaction failed: ', error));
  }

  getPlainObject(obj) {
    let result = Object.assign({}, obj);
    console.log(result);
    return result;
  }
}
