import { GameApiService } from './../../../shared/api/game/game-api.service';
import { Component, Input, OnInit } from '@angular/core';
import { PlayerApiService } from '../../../shared/api/player/player-api.service';
import { TgGuess } from '../../../shared/api/models/models';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.scss']
})
export class GuessComponent implements OnInit {
  @Input() guess: TgGuess;

  constructor(private gameApi: GameApiService) {
  }

  ngOnInit() {
  }

  makeGuess() {
    // this.playerApi.makeGuess(this.guess);
    
  }

}
