import { TgPlayerPrivateData, TgGuess, TgPartialGuess } from './../models/models';
import { Router } from '@angular/router';
import { TgPlayer, TgGame, TgForensicCard } from '../models/models';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { take, switchMap, map, shareReplay } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions';
import { SnackBarService } from '../snack-bar/snack-bar.service';

const GAME_COMPLETE_EXPIRE_TIME = 10 * 60 * 1000;

@Injectable({
  providedIn: 'root'
})
export class GameApiService {
  public game$: Observable<TgGame>;
  public players$: Observable<TgPlayer[]>;
  public me$: Observable<TgPlayer>;
  public gameId$: BehaviorSubject<string>;
  public guesses$: Observable<TgGuess[]>;
  public playerPrivateData$: Observable<TgPlayerPrivateData>;
  public gameDoc$: Observable<AngularFirestoreDocument<TgGame>>;
  public playersDict$: Observable<Map<string, TgPlayer>>;
  public joinLink$: Observable<string>;

  constructor(
    private db: AngularFirestore,
    private auth: AuthService,
    private fns: AngularFireFunctions,
    private router: Router,
    private snack: SnackBarService
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
    )).pipe(shareReplay(1));

    this.players$ = this.gameId$.pipe(switchMap(gameId => {
      if (gameId) {
        return this.getDocForGame(gameId).collection('players').valueChanges();
      } else {
        return of(null);
      }
    })).pipe(shareReplay(1));

    this.me$ = this.players$.pipe(map(players => {
      if (players) {
        return players.find(player => player.uid === this.auth.user.uid);
      } else {
        return null;
      }
    })).pipe(shareReplay(1));

    this.guesses$ = this.gameId$.pipe(switchMap(gameId => {
      if (gameId) {
        return this.getDocForGame(gameId).collection('guesses').valueChanges();
      } else {
        return of(null);
      }
    })).pipe(shareReplay(1));

    this.playerPrivateData$ = this.gameId$.pipe(switchMap(gameId => {
      if (gameId) {
        return this.getDocForGame(gameId).collection('users').doc(this.auth.user.uid).valueChanges();
      }
      else {
        return of(null);
      }
    })).pipe(map(value => value ? value : {})).pipe(shareReplay(1));

    this.gameDoc$ = this.gameId$.pipe(map(gameId => {
      if (gameId) {
        return this.getDocForGame(gameId);
      } else {
        return null;
      }
    }
    )).pipe(shareReplay(1));

    this.playersDict$ = this.players$.pipe(map(players => {
      if (players) {
        const result = new Map();
        players.forEach(player => {
          result.set(player.uid, player);
        })
        return result;
      } else {
        return null;
      }
    })).pipe(shareReplay(1));

    this.gameId$.next(null);

    this.joinLink$ = this.gameId$.pipe(map(value => {
      if (value) {
        return `${window.location.origin}/join/${value}`
      } else {
        return `${window.location.origin}`;
      }
    })).pipe(shareReplay(1));
  }

  getDocForGame(gameId: string): AngularFirestoreDocument<TgGame> {
    return this.db.collection('games').doc(gameId);
  }

  setGameId(gameId: string) {
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
    if (!card || !card.selectedChoice) {
      this.snack.error('Please select an option from the cards!');
      return;
    }
    this.gameId$.pipe(take(1)).subscribe(gameId => {
      this.getDocForGame(gameId).set({ causeCard: card } as any, { merge: true })
    })
  }

  async selectForensicLocationCard(card: TgForensicCard) {
    if (!card || !card.selectedChoice) {
      this.snack.error('Please select an option from the cards!');
      return;
    }
    this.gameId$.pipe(take(1)).subscribe(gameId => {
      this.getDocForGame(gameId).set({ locationCard: card } as any, { merge: true })
    })
  }

  countSelectedOtherCards(game: TgGame): number {
    return game.otherCards.filter(card => card.selectedChoice).length;
  }

  async selectNextForensicOtherCard(card: TgForensicCard, replaceCardName?: string) {
    if (!card || !card.selectedChoice) {
      this.snack.error('Please select an option from the card!');
      return;
    }
    this.getCurrentGame().pipe(take(1)).subscribe((game: TgGame) => {
      const count = this.countSelectedOtherCards(game)
      const otherCards = game.otherCards;
      const newCardIndex = otherCards.findIndex(value => value.cardName === card.cardName);
      if (count >= 4) {
        console.log('Should replace');
        if (replaceCardName) {
          console.log('Should replace', replaceCardName)
          const replaceIndex = otherCards.findIndex(value => value.cardName === replaceCardName);
          otherCards[replaceIndex].replaced = true;
        } else {
          this.snack.error('Select a card to replace!');
          return;
        }
      }
      otherCards[newCardIndex] = card;
      this.gameId$.pipe(take(1)).subscribe(gameId => {
        console.log('Setting doc', { otherCards })
        this.getDocForGame(gameId).set({ otherCards } as any, { merge: true })
      });
    })
  }

  findPlayer(players: TgPlayer[], uid: string): TgPlayer {
    return players.find(player => player.uid === uid);
  }

  async gameExists(gameId: string): Promise<string> {
    const game = (await this.db.doc(`games/${gameId}`).get().toPromise()).data() as TgGame;
    return game && game.creatorUid;
  }
}
