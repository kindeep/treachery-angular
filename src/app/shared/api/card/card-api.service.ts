import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { GameApiService } from '../game/game-api.service';
import { TgCard } from '../models/models';
import { map } from 'rxjs/operators';
import { PlayerApiService } from '../player/player-api.service';
import { getObservableInstance } from '../util';

@Injectable({
  providedIn: 'root'
})
export class CardApiService {
  private cardsDocument: AngularFirestoreDocument<any>;
  private cards;

  constructor(private db: AngularFirestore) {
    this.cardsDocument = db.collection('resources').doc('cards');
    this.initCards();
  }

  initCards = async () => {
    this.cards = await getObservableInstance(this.cardsDocument.valueChanges());
  }

  getMeansCards(): TgCard[] {
    return this.cards.meansCards;
  }

  getClueCards(): TgCard[] {
    return this.cards.clueCards;
  }
}
