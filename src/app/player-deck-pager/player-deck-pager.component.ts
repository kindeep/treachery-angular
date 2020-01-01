import { CardSnapshot } from './../firebase/GameSnapshot';
import { GameApiService } from './../game-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-deck-pager',
  templateUrl: './player-deck-pager.component.html',
  styleUrls: ['./player-deck-pager.component.scss']
})
export class PlayerDeckPagerComponent implements OnInit {
  constructor(public gameApi: GameApiService) {

  }

  ngOnInit() {

  }

}
