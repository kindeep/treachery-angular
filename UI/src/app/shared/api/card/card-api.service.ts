import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { TgCardResources, TgForensicCard } from './../models/models';

@Injectable({
  providedIn: 'root'
})
export class CardApiService {
  public cards$: Observable<TgCardResources>;

  constructor(private db: AngularFirestore) {
    this.cards$ = db.collection('resources').doc('cards').get().pipe(map(value => value.data())) as Observable<TgCardResources>;
  }

  async getCardsSnapshot(): Promise<TgCardResources> {
    return this.cards$.toPromise<TgCardResources>();
  }

  async getCauseCard(cardName: string, selectedChoice: string): Promise<TgForensicCard> {
    const cards = await this.getCardsSnapshot();

    return {
      ...cards.forensicCards.causeCards.find(card => card.cardName === cardName),
      selectedChoice
    } as TgForensicCard
  }

  async getLocationCard(cardName: string, selectedChoice: string): Promise<TgForensicCard> {
    const cards = await this.getCardsSnapshot();

    return {
      ...cards.forensicCards.locationCards.find(card => card.cardName === cardName),
      selectedChoice
    }
  }

}
