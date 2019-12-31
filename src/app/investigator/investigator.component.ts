import { GameInstanceSnapshot } from './../firebase/GameSnapshot';
import { GameApiService } from './../game-api.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-investigator',
  templateUrl: './investigator.component.html',
  styleUrls: ['./investigator.component.scss']
})
export class InvestigatorComponent implements OnInit {
  gameInstance$: Observable<GameInstanceSnapshot>;
  constructor(public ga: GameApiService) {
    this.gameInstance$ = ga.gameReference.valueChanges() as Observable<GameInstanceSnapshot>;
  }

  ngOnInit() {

  }

  toString(obj) {
    return JSON.stringify(obj);
  }

}
