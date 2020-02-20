import { TgGame } from '../../../shared/api/firebase/GameSnapshot';
import { GameApiService } from '../../../shared/api/game/game-api.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-investigator',
  templateUrl: './investigator.component.html',
  styleUrls: ['./investigator.component.scss']
})
export class InvestigatorComponent implements OnInit {
  gameInstance$: Observable<TgGame>;
  constructor(public ga: GameApiService) {
    this.gameInstance$ = ga.gameReference.valueChanges() as Observable<TgGame>;
  }

  ngOnInit() {}

  toString(obj) {
    return JSON.stringify(obj);
  }
}
