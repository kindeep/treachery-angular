import {TgGame, TgGuess, TgPlayer} from '../../../shared/api/models/models';
import {GameApiService} from '../../../shared/api/game/game-api.service';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {PlayerApiService} from '../../../shared/api/player/player-api.service';
import {randomUuid} from '../../../shared/api/util';

@Component({
  selector: 'app-investigator',
  templateUrl: './investigator.component.html',
  styleUrls: ['./investigator.component.scss']
})
export class InvestigatorComponent implements OnInit {
  gameInstance$: Observable<TgGame>;
  player$: Observable<TgPlayer>;
  guess = {
    id: randomUuid(),
    processed: false,
  } as TgGuess;

  constructor(private ga: GameApiService, private playerApiService: PlayerApiService) {
    this.gameInstance$ = ga.gameReference.valueChanges() as Observable<TgGame>;
    this.player$ = playerApiService.getCurrentPlayer();
    this.player$.subscribe(pl => {
      this.guess.guesserPlayer = pl.playerName;
    });
  }

  ngOnInit() {
  }
}
