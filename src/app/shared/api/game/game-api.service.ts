import { TgPlayerPrivateData, TgGuess, TgPartialGuess } from './../models/models';
import { Router } from '@angular/router';
import { TgPlayer, TgGame, TgForensicCard } from '../models/models';
import { AuthService } from './../../../core/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions';

const GAME_COMPLETE_EXPIRE_TIME = 10 * 60 * 1000;

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
    const response = await addPlayer({ gameId, playerName }).toPromise();
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

  async makeGuess(guess: TgPartialGuess) {
    const _makeGuess = this.fns.httpsCallable('makeGuess');
    const response = await _makeGuess({ ...guess, gameId: this.gameId }).toPromise();
    console.log(response);
  }

  async selectForensicCauseCard(card: TgForensicCard) {
    this.getGameDoc().set({ causeCard: card } as any, { merge: true })
  }

  async selectForensicLocationCard(card: TgForensicCard) {
    this.getGameDoc().set({ locationCard: card } as any, { merge: true })
  }

  async selectNextForensicOtherCard(card: TgForensicCard) {
    this.getCurrentGame().pipe(take(1)).subscribe((game: TgGame) => {
      const otherCards = game.otherCards;
      const newCardIndex = otherCards.findIndex(value => value.cardName === card.cardName);

      otherCards[newCardIndex] = card;
      this.getGameDoc().set({ otherCards } as any, { merge: true })
    })
  }
}
