import { TgForensicPrivateData } from './../models/models';
import { randomReadableId } from './../util';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/functions';
import { TgGame } from '../models/models';
import { GameApiService } from './../game/game-api.service';
import { switchMap, take, shareReplay } from 'rxjs/operators';
import { SnackBarService } from '../snack-bar/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class ForensicApiService {
  forensicPrivateData$: Observable<TgForensicPrivateData>;

  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private router: Router,
    private fns: AngularFireFunctions,
    public gameApi: GameApiService,
    private snack: SnackBarService
  ) {
    this.forensicPrivateData$ = this.gameApi.gameDoc$.pipe(switchMap(gameDoc => {
      if (gameDoc) {
        return gameDoc.collection('users').doc(this.authService.user.uid).valueChanges();
      } else {
        return of(null);
      }
    }
    )).pipe(shareReplay(1));
  }

  updateGameId(gameId: string) {
    this.gameApi.setGameId(gameId);
  }

  getGame(): Observable<TgGame> {
    return this.gameApi.game$;
  }

  getPrivateData(): Observable<TgForensicPrivateData> {
    return this.forensicPrivateData$;
  }

  async createGame() {
    const gameId = randomReadableId();
    this.updateGameId(gameId);
    const callable = this.fns.httpsCallable('createGame');

    const response = await callable({ gameId }).toPromise();
    console.log(response);

    if (response.success) {
      // Game successfully created, navigate to forensic waiting for players screen.
      this.router.navigateByUrl(`/forensic/${gameId}`)
    }
  }

  async startGame() {
    this.gameApi.gameId$.pipe(take(1)).subscribe(async (gameId) => {
      this.gameApi.players$.pipe(take(1)).subscribe(async (players) => {
        if (players.length >= 3) {
          // distribute cards, select murderer
          const _startGame = this.fns.httpsCallable('startGame');
          console.log('Starting game', gameId);
          const response = await _startGame({ gameId }).toPromise();

          console.log(response);

          if (response.success) {
            console.log('Yess...');
          }
        } else {
          this.snack.error('Need at least 3 players to start!')
        }
      })
    });
  }

  endGame() {
    this.gameApi.gameDoc$.pipe(take(1)).subscribe(gameDoc => {
      this.forensicPrivateData$.pipe(take(1)).subscribe(forensicPrivateData => {
        gameDoc.set({
          finished: true,
          murdererUid: forensicPrivateData.murderer.uid,
          murdererMeansCardName: forensicPrivateData.murdererMeansCardName,
          murdererClueCardName: forensicPrivateData.murdererClueCardName
        } as any, { merge: true })
      })
    })
  }
}
