import { TgGame } from '../../../shared/api/models/models';
import { GameApiService } from '../../../shared/api/game/game-api.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-active-games-list-item',
  templateUrl: './active-games-list-item.component.html',
  styleUrls: ['./active-games-list-item.component.scss']
})
export class ActiveGamesListItemComponent {
  @Input() game: TgGame;
  constructor() { }
}
