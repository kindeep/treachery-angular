import { GameInstanceSnapshot } from './../firebase/GameSnapshot';
import { GameApiService } from './../game-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-investigator',
  templateUrl: './investigator.component.html',
  styleUrls: ['./investigator.component.scss']
})
export class InvestigatorComponent implements OnInit {

  constructor(public ga: GameApiService) {
  }

  ngOnInit() {

  }

  toString(obj) {
    return JSON.stringify(obj);
  }

}
