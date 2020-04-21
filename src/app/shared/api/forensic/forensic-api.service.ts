import { CardApiService } from './../card/card-api.service';
import { randomReadableId, getObservableInstance } from './../util';
import { AuthService } from './../../../core/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForensicApiService {
  public gameDoc: Observable<any> = EMPTY;
  public forensicDataDoc: Observable<any> = EMPTY;

  constructor(private db: AngularFirestore, private authService: AuthService, private cardApi: CardApiService) {
  }

  createGame() {
    const gameDoc = this.db.collection('games').doc(randomReadableId());
    const forensicDataDoc = gameDoc.collection('users').doc(this.authService.user.uid);
    // const clueCards  = this.cardApi.getClueCards();
    // const meansCards = this.cardApi.getMeansCards();
    // forensicDataDoc.set({ 'noice': 'ok' });
  }
}
