import { Observable } from 'rxjs';
import { GameApiService } from '../../../shared/api/game/game-api.service';
import { TgPlayer, TgGame } from '../../../shared/api/models/models';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-joined-players-list',
  templateUrl: './joined-players-list.component.html',
  styleUrls: ['./joined-players-list.component.scss']
})
export class JoinedPlayersListComponent implements OnInit {
  @Input() gameId: string;

  players$: Observable<TgPlayer[]>;
  game$: Observable<TgGame>;
  
  constructor(private gameApi: GameApiService) { }

  ngOnInit() {
    // this.gameDoc = this.gameApi.getGameDoc(this.gameId);
    this.players$ = this.gameApi.getJoinedPlayers(this.gameId);
    this.game$ = this.gameApi.getGameDoc(this.gameId).valueChanges();
  }

}
