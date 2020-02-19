import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
const GAME_COMPLETE_EXPIRE_TIME = 10 * 60 * 100;
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})
export class CardApiService {
  db;
  constructor(db: AngularFirestore) {
    this.db = db;
  }

  generateRandomGame() {
    return this.db.collection('games').add({});
  }

  getGameDoc(gameId: string) {
    return this.db.collection('games').doc(gameId);
  }

  activeGamesQuery(callback) {
    const currTime = new Date().getTime(); // current Time in seconds
    const expiredCreation = new Date(currTime - GAME_COMPLETE_EXPIRE_TIME);
    this.db.collection('games', query => {
      console.log(query);
      query = query
        .where('started', '==', false)
        .orderBy('createdTimestamp', 'desc')
        .where('createdTimestamp', '>', expiredCreation);
      console.log(query);
      callback(query);
    });
  }
}
