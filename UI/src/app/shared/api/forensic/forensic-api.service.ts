import { TgForensicPrivateData } from './../models/models';
import { randomReadableId } from './../util';
import { AuthService } from './../../../core/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/functions';
import { TgGame } from '../models/models';
import { GameApiService } from './../game/game-api.service';
import { switchMap, take } from 'rxjs/operators';

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
    public gameApi: GameApiService
  ) {
    this.forensicPrivateData$ = this.gameApi.gameDoc$.pipe(switchMap(gameDoc => {
      if (gameDoc) {
        return gameDoc.collection('users').doc(this.authService.user.uid).valueChanges();
      } else {
        return of(null);
      }
    }
    ))
  }

  updateGame(gameId: string) {
    this.gameApi.setGameId(gameId);
  }

  getGame(): Observable<TgGame> {
    return this.gameApi.game$;
  }

  getPrivateData(): Observable<TgForensicPrivateData> {
    return this.forensicPrivateData$;
  }

  createGame() {
    this.gameApi.gameId$.pipe(take(1)).subscribe(async (gameId) => {
      this.updateGame(randomReadableId());
      const callable = this.fns.httpsCallable('createGame');

      const response = await callable({ gameId }).toPromise();
      console.log(response);

      if (response.success) {
        // Game successfully created, navigate to forensic waiting for players screen.
        this.router.navigateByUrl(`/forensic/${gameId}`)
      }

    })
  }

  async startGame() {
    this.gameApi.gameId$.pipe(take(1)).subscribe(async (gameId) => {

      // distribute cards, select murderer
      const _startGame = this.fns.httpsCallable('startGame');

      const response = await _startGame({ gameId }).toPromise();

      console.log(response);

      if (response.success) {
        console.log('Yess...');
      }
    });
  }
}
