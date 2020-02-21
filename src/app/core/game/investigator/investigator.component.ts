import {TgGame, TgPlayer} from '../../../shared/api/models/GameSnapshot';
import { GameApiService } from '../../../shared/api/game/game-api.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {PlayerApiService} from '../../../shared/api/player/player-api.service';

@Component({
  selector: 'app-investigator',
  templateUrl: './investigator.component.html',
  styleUrls: ['./investigator.component.scss']
})
export class InvestigatorComponent implements OnInit {
  gameInstance$: Observable<TgGame>;
  player$: Observable<TgPlayer>;
  constructor(private ga: GameApiService, private playerApiService: PlayerApiService) {
    this.gameInstance$ = ga.gameReference.valueChanges() as Observable<TgGame>;
    this.player$ = playerApiService.getCurrentPlayer();
  }

  ngOnInit() {}

  toString(obj) {
    return JSON.stringify(obj);
  }
}
