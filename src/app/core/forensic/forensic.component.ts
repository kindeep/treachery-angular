import { TgGame, TgForensicPrivateData } from './../../shared/api/models/models';
import { ForensicApiService } from './../../shared/api/forensic/forensic-api.service';
import { GameApiService } from '../../shared/api/game/game-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-forensic',
  templateUrl: './forensic.component.html',
  styleUrls: ['./forensic.component.scss']
})
export class ForensicComponent implements OnInit {
  gameId: string;
  game$: Observable<TgGame>;
  privateData$: Observable<TgForensicPrivateData>;

  constructor(
    private route: ActivatedRoute,
    public cardApi: GameApiService,
    public forensicApi: ForensicApiService,
    public gameApi: GameApiService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.gameId = routeParams.gameId;
      this.forensicApi.updateGame(this.gameId);
      this.game$ = this.forensicApi.getGame();
      this.privateData$ = this.forensicApi.getPrivateData();
      this.privateData$.subscribe(value => { console.log(value) })
    });
  }

  startGame() {
    this.forensicApi.startGame();
  }
}
