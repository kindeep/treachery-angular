import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

import {GameApiService} from '../game/game-api.service';
import {TgCard} from '../models/models';
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
