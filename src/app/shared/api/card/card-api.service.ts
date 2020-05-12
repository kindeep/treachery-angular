import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { TgCardResources } from './../models/models';

@Injectable({
  providedIn: 'root'
})
export class CardApiService {
  public cards$: Observable<TgCardResources>;

  constructor(private db: AngularFirestore) {
    this.cards$ = db.collection('resources').doc('cards').get().pipe(map(value => value.data())) as Observable<TgCardResources>;
  }

}
