import {Injectable} from '@angular/core';
import {GameApiService} from '../game/game-api.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {TgCard, TgPlayer} from '../firebase/GameSnapshot';

@Injectable({
  providedIn: 'root'
})
export class PlayerApiService {

  constructor(private gameApiService: GameApiService) {
  }

  getPlayer(playerName: string): Observable<TgPlayer> {
    return this.getAllPlayers().pipe(map(players => {
      return players.find(player => player.playerName = playerName);
    })) as Observable<TgPlayer>;
  }

  getCurrentPlayer(): Observable<TgPlayer> {
    return this.getPlayer(this.gameApiService.getPlayerName());
  }

  getAllPlayers(): Observable<TgPlayer[]> {
    return this.gameApiService.getGame().pipe(map(game => {
      return game.players;
    })) as Observable<TgPlayer[]>;
  }
}
