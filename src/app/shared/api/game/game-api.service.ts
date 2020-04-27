import { TgPlayerPrivateData } from './../models/models';
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
  private playerName: string;

  constructor(
    private db: AngularFirestore,
    private auth: AuthService,
    private fns: AngularFireFunctions,
    private router: Router
  ) {
    this.gameId = null;
  }

  // getGame(): Observable<TgGame> {
  //   return this.game;
  // }

  getPrivateData(): Observable<TgPlayerPrivateData> {
    console.log(`Emm get player data for ${this.auth.user.uid}`);
    return this.getGameDoc().collection('users').doc(this.auth.user.uid).valueChanges() as Observable<TgPlayerPrivateData>;
  }

  getCurrentGamePlayer(): Observable<TgPlayer> {
    return this.getCurrentGame().pipe(map(value => value.players.find(player => player.uid === this.auth.user.uid)));
  }

  getGameDoc(gameId?: string): AngularFirestoreDocument<TgGame> {
    return this.db.collection('games').doc(gameId ? gameId : this.gameId);
  }

  getCurrentGame(): Observable<TgGame> {
    return this.getGameDoc(this.gameId).valueChanges() as Observable<TgGame>;
  }

  getJoinedPlayers(gameId: string): Observable<TgPlayer[]> {
    return this.getGameDoc(gameId).valueChanges().pipe(map(game => game.players));
  }

  getCurrentGamePlayers() {
    return this.getJoinedPlayers(this.gameId);
  }

  async joinGame(gameId: string, playerName: string) {
    this.gameId = gameId;
    this.playerName = playerName;
    const addPlayer = this.fns.httpsCallable('addPlayer');

    const response = await addPlayer({ gameId, playerName }).toPromise();

    console.log(response);

    if (response.success) {
      this.router.navigateByUrl(`/play/${gameId}`)
    }
  }

  // getCurrentGameDoc(): AngularFirestoreDocument {
  //   return this.getGameDoc(this.gameId);
  // }

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
    if(response.success) {
      console.log("Yaay cards selected");
    }
  }
  // setGameId(gameId) {
  //   if (this.gameId !== gameId) {
  //     this.gameId = gameId;
  //     console.log(`Set game id to: ${this.gameId}`);
  //     this.gameDocument = this.getGameDoc(this.gameId);
  //     this.game = this.gameDocument.valueChanges() as Observable<TgGame>;
  //     // this.gameInstance = gameDoc.valueChanges();
  //     this.gameDocument.ref.get().then(snapshot => {
  //       this.gameInstance = snapshot.data() as TgGame;
  //       console.log('Game api instance set');
  //     });
  //     this.gameDocument.ref.onSnapshot(snapshot => {
  //       this.gameInstance = snapshot.data() as TgGame;
  //       console.log('Game api instance update');
  //     });
  //   }
  // }

  // getGameObservable() {
  //   return this.game;
  // }

  // setPlayerName(value) {
  //   this.playerName = value;
  // }

  // getPlayerName() {
  //   return this.playerName;
  // }

  // addPlayer(playerName) {
  //   const newPlayer = getPlainObject(new DefaultTgPlayer());
  //   newPlayer.playerName = playerName;
  //   this.db.firestore
  //     .runTransaction(transaction =>
  //       // This code may get re-run multiple times if there are conflicts.
  //       transaction.get(this.gameDocument.ref).then(sfDoc => {
  //         // const newPopulation = sfDoc.data().population + 1;
  //         const gameInstance: TgGame = sfDoc.data() as TgGame;
  //         console.log(gameInstance.players);
  //         gameInstance.players.push(newPlayer);
  //         console.log(gameInstance.players);
  //         transaction.update(this.gameDocument.ref, { players: classToPlain(gameInstance.players) });
  //       })
  //     )
  //     .then(() => {
  //       this.gameDocument.collection('users').doc(this.auth.user.uid).set({});
  //       console.log('Player transaction successfully committed!');
  //     })
  //     .catch(error => console.log('Player transaction failed: ', error));
  // }

}
