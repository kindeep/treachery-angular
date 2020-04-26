import { CardApiService } from './../card/card-api.service';
import { randomReadableId, getObservableInstance } from './../util';
import { AuthService } from './../../../core/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { EMPTY, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class ForensicApiService {
  public gameDoc: Observable<any> = EMPTY;
  public forensicDataDoc: Observable<any> = EMPTY;
  gameId: string;
  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private cardApi: CardApiService,
    private router: Router,
    private fns: AngularFireFunctions
  ) {
  }

  createGame() {
    this.gameId = randomReadableId();
    const callable = this.fns.httpsCallable('createGame');
    (async () => console.log(await callable({ gameId: this.gameId }).toPromise()))()

    // this.gameId = randomReadableId();
    // const gameDoc = this.db.collection('games').doc(this.gameId);
    // gameDoc.set({ creatorUid: this.authService.user.uid, gameId: this.gameId, createdTimestamp: new Date(), players: [] });
    // const forensicDataDoc = gameDoc.collection('users').doc(this.authService.user.uid);
    // this.router.navigateByUrl(`/forensic/${this.gameId}`);

    // const clueCards  = this.cardApi.getClueCards();
    // const meansCards = this.cardApi.getMeansCards();
    // forensicDataDoc.set({ 'noice': 'ok' });
  }

  startGame() {
    // distribute cards, select murderer
  }
}
