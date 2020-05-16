import { TgPlayerPrivateData, TgGuess, TgPartialGuess } from './../models/models';
import { Router } from '@angular/router';
import { TgPlayer, TgGame, TgForensicCard } from '../models/models';
import { AuthService } from './../../../core/auth.service';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { take, switchMap, map } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions';

const GAME_COMPLETE_EXPIRE_TIME = 10 * 60 * 1000;

@Injectable({
  providedIn: 'root'
})
export class GameApiService {
  // private gameId: string;
  public game$: Observable<TgGame>;
  public players$: Observable<TgPlayer[]>;
  public me$: Observable<TgPlayer>;
  public gameId$: BehaviorSubject<string>;
  public guesses$: Observable<TgGuess[]>;
  public playerPrivateData$: Observable<TgPlayerPrivateData>;
  public gameDoc$: Observable<AngularFirestoreDocument<TgGame>>

  constructor(
    private db: AngularFirestore,
    private auth: AuthService,
    private fns: AngularFireFunctions,
    private router: Router
  ) {
    this.gameId$ = new BehaviorSubject<string>(null);

    this.gameId$.next(null);

    this.game$ = this.gameId$.pipe(switchMap(gameId => {
      if (gameId) {
        return this.getDocForGame(gameId).valueChanges();
      } else {
        return of(null);
      }
    }
    ));

    this.players$ = this.gameId$.pipe(switchMap(gameId => {
      if (gameId) {
        return this.getDocForGame(gameId).collection('players').valueChanges();
      } else {
        return of(null);
      }
    }));

    this.me$ = this.players$.pipe(map(players => {
      if (players) {
        return players.find(player => player.uid === this.auth.user.uid);
      } else {
        return null;
      }
    }))

    this.guesses$ = this.gameId$.pipe(switchMap(gameId => {
      if (gameId) {
        return this.getDocForGame(gameId).collection('guesses').valueChanges();
      } else {
        return of(null);
      }
    }))

    this.playerPrivateData$ = this.gameId$.pipe(switchMap(gameId => {
      if (gameId) {
        return this.getDocForGame(gameId).collection('users').doc(this.auth.user.uid).valueChanges();
      }
      else {
        return of(null);
      }
    }))

    this.gameDoc$ = this.gameId$.pipe(map(gameId => {
      console.log('at least map for gameDoc triggers');
      if (gameId) {
        return this.getDocForGame(gameId);
      } else {
        return null;
      }
    }
    ))

    this.gameId$.next(null);


  }

  getDocForGame(gameId: string): AngularFirestoreDocument<TgGame> {
    return this.db.collection('games').doc(gameId);
  }

  setGameId(gameId: string) {
    console.log('Set game id called');
    this.gameId$.next(gameId);
  }

  getGameGuesses(): Observable<TgGuess[]> {
    return this.guesses$;
  }

  getPrivateData(): Observable<TgPlayerPrivateData> {
    return this.playerPrivateData$;
  }

  getCurrentGamePlayer(): Observable<TgPlayer> {
    return this.me$;
  }

  getCurrentGame(): Observable<TgGame> {
    return this.game$;
  }

  getJoinedPlayers(gameId: string): Observable<TgPlayer[]> {
    return this.getDocForGame(gameId).collection('players').valueChanges() as Observable<TgPlayer[]>
  }

  getCurrentGamePlayers(): Observable<TgPlayer[]> {
    return this.players$;
  }

  async joinGame(gameId: string, playerName: string) {
    this.gameId$.next(gameId);
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

  async selectMurdererCards(clueCardName, meansCardName) {
    this.gameId$.pipe(take(1)).subscribe(async (gameId) => {
      const _selectMurdererCards = this.fns.httpsCallable('selectMurdererCards');

      const response = await _selectMurdererCards({ gameId, clueCardName, meansCardName }).toPromise();
      console.log(response);
      if (response.success) {
        console.log("Yaay cards selected");
      }
    });
  }

  async makeGuess(guess: TgPartialGuess) {
    this.gameId$.pipe(take(1)).subscribe(async (gameId) => {
      const _makeGuess = this.fns.httpsCallable('makeGuess');
      const response = await _makeGuess({ ...guess, gameId }).toPromise();
      console.log(response);
    });
  }

  async selectForensicCauseCard(card: TgForensicCard) {
    this.gameId$.pipe(take(1)).subscribe(gameId => {
      this.getDocForGame(gameId).set({ causeCard: card } as any, { merge: true })
    })
  }

  async selectForensicLocationCard(card: TgForensicCard) {
    this.gameId$.pipe(take(1)).subscribe(gameId => {
      this.getDocForGame(gameId).set({ locationCard: card } as any, { merge: true })
    })
  }

  async selectNextForensicOtherCard(card: TgForensicCard) {
    this.getCurrentGame().pipe(take(1)).subscribe((game: TgGame) => {
      const otherCards = game.otherCards;
      const newCardIndex = otherCards.findIndex(value => value.cardName === card.cardName);

      otherCards[newCardIndex] = card;
      this.gameId$.pipe(take(1)).subscribe(gameId => {
        this.getDocForGame(gameId).set({ otherCards } as any, { merge: true })
      });
    })
  }
}
