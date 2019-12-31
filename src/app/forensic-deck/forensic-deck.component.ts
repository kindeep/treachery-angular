import { GameApiService } from './../game-api.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-forensic-deck',
  templateUrl: './forensic-deck.component.html',
  styleUrls: ['./forensic-deck.component.scss']
})
export class ForensicDeckComponent implements OnInit {
  constructor(gameApi: GameApiService) { }

  ngOnInit() {
  }

}
