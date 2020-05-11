import { TgPlayerPrivateData, TgGuess, TgPartialGuess } from './../models/models';
import { Router } from '@angular/router';
import { TgPlayer, TgGame, TgForensicCard } from '../models/models';
import { AuthService } from './../../../core/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

const GAME_COMPLETE_EXPIRE_TIME = 10 * 60 * 1000;
import { firestore } from 'firebase/app';
import { plainToClass, classToPlain } from 'class-transformer';
import { getPlainObject } from '../util';
import { map } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class GameApiService {
  private gameId: string;

  constructor(
    private db: AngularFirestore,
    private auth: AuthService,
    private fns: AngularFireFunctions,
    private router: Router
  ) {
    this.gameId = null;
  }

  getGameGuesses(): Observable<TgGuess[]> {
    return this.getGameDoc().collection('guesses').valueChanges() as Observable<TgGuess[]>;
  }

  getPrivateData(): Observable<TgPlayerPrivateData> {
    console.log(`Emm get player data for ${this.auth.user.uid}`);
    return this.getGameDoc().collection('users').doc(this.auth.user.uid).valueChanges() as Observable<TgPlayerPrivateData>;
  }

  getCurrentGamePlayer(): Observable<TgPlayer> {
    return this.getGameDoc().collection('players').doc(this.auth.user.uid).valueChanges() as Observable<TgPlayer>;
  }

  getGameDoc(gameId?: string): AngularFirestoreDocument<TgGame> {
    return this.db.collection('games').doc(gameId ? gameId : this.gameId);
  }

  getCurrentGame(): Observable<TgGame> {
    return this.getGameDoc(this.gameId).valueChanges() as Observable<TgGame>;
  }

  getJoinedPlayers(gameId: string): Observable<TgPlayer[]> {
    return this.db.collection('games').doc(gameId).collection('players').valueChanges() as Observable<TgPlayer[]>
  }

  getCurrentGamePlayers() {
    return this.getJoinedPlayers(this.gameId);
  }

  async joinGame(gameId: string, playerName: string) {
    this.gameId = gameId;
    const addPlayer = this.fns.httpsCallable('addPlayer');
    const response = await addPlayer({ gameId, playerName}).toPromise();
    console.log(response);
    if (response.success) {
      this.router.navigateByUrl(`/play/${gameId}`)
    }
  }

  activeGamesQuery() {
    const currTime = new Date().getTime(); // current Time in seconds
    const expiredCreation = new Date(currTime - GAME_COMPLETE_EXPIRE_TIME);
    console.log(`Expired creation: ${expiredCreation} ${expiredCreation.getTime()}`);
    return this.db.collection('games');
  }

  setGameId(gameId) {
    this.gameId = gameId;
  }

  async selectMurdererCards(clueCardName, meansCardName) {
    const _selectMurdererCards = this.fns.httpsCallable('selectMurdererCards');
    const response = await _selectMurdererCards({ gameId: this.gameId, clueCardName, meansCardName }).toPromise();
    console.log(response);
    if (response.success) {
      console.log("Yaay cards selected");
    }
  }

  async makeGuess({ clueCardName, meansCardName, murdererUid }: TgPartialGuess) {
    this.getGameDoc().collection('guesses').add({
      clueCardName,
      meansCardName,
      murdererUid,
      guessedByUid: this.auth.user.uid
    });
  }

}
