import { GameApiService } from '../../shared/api/game/game-api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent implements OnInit {
  gameId: string;
  constructor(private route: ActivatedRoute, public gameApi: GameApiService) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.gameId = routeParams.gameId;
      this.gameApi.setGameId(this.gameId);
    });
  }

  joinGame(playerName: string) {
    this.gameApi.joinGame(this.gameId, playerName);
  }
}