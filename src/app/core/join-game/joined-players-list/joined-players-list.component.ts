import { Observable } from 'rxjs';
import { GameApiService } from '../../../shared/api/game/game-api.service';
import { TgPlayer, TgGame } from '../../../shared/api/models/models';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-joined-players-list',
  templateUrl: './joined-players-list.component.html',
  styleUrls: ['./joined-players-list.component.scss']
})
export class JoinedPlayersListComponent implements OnInit {
  @Input() gameId: string;

  
  constructor(public gameApi: GameApiService) { }

  ngOnInit() {
  }

}
