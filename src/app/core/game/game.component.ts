import { GameApiService } from '../../shared/api/game/game-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AppModule } from '../../app.module';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  gameId;
  constructor(private route: ActivatedRoute, private cardApi: GameApiService) {
  }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.gameId = routeParams.gameId;
    });
  }
}
