import { TgGame } from '../../../shared/api/firebase/GameSnapshot';
import { GameApiService } from '../../../shared/api/game/game-api.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-active-games-list-item',
  templateUrl: './active-games-list-item.component.html',
  styleUrls: ['./active-games-list-item.component.scss']
})
export class ActiveGamesListItemComponent implements OnInit {
  @Input() gameId: string;
  private gameDoc: any;
  game: TgGame;
  constructor(private gameApi: GameApiService) {}

  ngOnInit() {
    console.log(this.gameId);
    this.gameDoc = this.gameApi.getGameDoc(this.gameId);
    console.log(this.gameDoc);
    this.gameDoc.ref.get().then(snapshot => {
      this.game = snapshot.data();
    });
    this.gameDoc.ref.onSnapshot(snapshot => {
      this.game = snapshot.data();
    });
  }
}
