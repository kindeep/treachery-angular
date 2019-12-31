import { GameInstanceSnapshot, ForensicCardSnapshot } from './firebase/GameSnapshot';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
const GAME_COMPLETE_EXPIRE_TIME = 10 * 60 * 1000;
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})
export class GameApiService {
  db;
  private gameId: string;
  playerName: string;
  gameInstance: GameInstanceSnapshot;
  gameReference: AngularFirestoreDocument;

  constructor(db: AngularFirestore) {
    this.db = db;
    this.gameId = null;
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
    return this.db.collection('games', ref => ref.where('started', '==', false)
      .orderBy('createdTimestamp', 'desc')
      .where('createdTimestamp', '>', expiredCreation));
  }

  setGameId(value) {
    if (this.gameId !== value) {
      this.gameId = value;
      console.log(`Set game id to: ${this.gameId}`);
      this.gameReference = this.getGameDoc(this.gameId);
      // this.gameInstance = gameDoc.valueChanges();
      this.gameReference.ref.get().then((snapshot) => {
        this.gameInstance = snapshot.data() as GameInstanceSnapshot;
        console.log("Game api instance set")
      });
      this.gameReference.ref.onSnapshot((snapshot) => {
        this.gameInstance = snapshot.data() as GameInstanceSnapshot;
        console.log("Game api instance update");
      });
    }
  }

  getGameObservable() {
    return this.gameReference.valueChanges();
  }

  setPlayerName(value) {
    this.playerName = value;
  }
}
