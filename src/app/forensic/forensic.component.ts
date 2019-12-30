import { GameApiService } from '../game-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-forensic',
  templateUrl: './forensic.component.html',
  styleUrls: ['./forensic.component.scss']
})
export class ForensicComponent implements OnInit {
  gameId;

  constructor(
    private route: ActivatedRoute,
    public cardApi: GameApiService
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.gameId = routeParams['gameId'];
    });
  }

  startGame() {
    
  }

}
