import { TgForensicPrivateData } from './../models/models';
import { CardApiService } from './../card/card-api.service';
import { randomReadableId, getObservableInstance } from './../util';
import { AuthService } from './../../../core/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { EMPTY, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/functions';
import { TgGame } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ForensicApiService {
  gameId: string;
  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private cardApi: CardApiService,
    private router: Router,
    private fns: AngularFireFunctions
  ) {
  }

  updateGame(gameId: string) {
    console.log(`Whippete whoo game id for forensic service is now ${gameId} yoo hoo`)
    this.gameId = gameId;
  }

  getGame(): Observable<TgGame> {
    return this.getGameDoc().valueChanges();
  }

  getGameDoc(): AngularFirestoreDocument<TgGame> {
    return this.db.collection('games').doc(this.gameId);
  }

  getPrivateData(): Observable<TgForensicPrivateData> {
    return this.getGameDoc().collection('users').doc(this.authService.user.uid).valueChanges() as Observable<TgForensicPrivateData>;
  }

  async createGame() {
    this.updateGame(randomReadableId());
    const callable = this.fns.httpsCallable('createGame');

    const response = await callable({ gameId: this.gameId }).toPromise();
    console.log(response);

    if (response.success) {
      // Game successfully created, navigate to forensic waiting for players screen.
      this.router.navigateByUrl(`/forensic/${this.gameId}`)
    }

  }

  async startGame() {
    // distribute cards, select murderer
    const _startGame = this.fns.httpsCallable('startGame');

    const response = await _startGame({ gameId: this.gameId }).toPromise();

    console.log(response);

    if (response.success) {
      console.log('Yess...');
    }
  }
}
