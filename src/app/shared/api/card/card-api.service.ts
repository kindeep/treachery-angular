import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

const GAME_COMPLETE_EXPIRE_TIME = 10 * 60 * 100;
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;
import {GameApiService} from '../game/game-api.service';
import {TgCard} from '../firebase/GameSnapshot';
import {map} from 'rxjs/operators';
import {PlayerApiService} from '../player/player-api.service';

@Injectable({
  providedIn: 'root'
})
export class CardApiService {
  constructor(private db: AngularFirestore, private gameApiService: GameApiService, private playerApiService: PlayerApiService) {
  }

  getMeansCards(playerName: string): Observable<TgCard[]> {
    return this.playerApiService.getPlayer(playerName).pipe(map(player => {
      return player.meansCards;
    })) as Observable<TgCard[]>;
  }

  getClueCards(playerName: string): Observable<TgCard[]> {
    return this.playerApiService.getPlayer(playerName).pipe(map(player => {
      return player.clueCards;
    })) as Observable<TgCard[]>;
  }
}
