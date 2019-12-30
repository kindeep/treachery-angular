import { GameApiService } from './../game-api.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-active-games-list-item',
  templateUrl: './active-games-list-item.component.html',
  styleUrls: ['./active-games-list-item.component.scss']
})
export class ActiveGamesListItemComponent implements OnInit {
  @Input() gameId: string;
  private gameDoc: any;
   game: any;
  constructor(
    private gameApi: GameApiService
  ) {

  }

  ngOnInit() {
    console.log(this.gameId);
    this.gameDoc = this.gameApi.getGameDoc(this.gameId);
    console.log(this.gameDoc);
    this.gameDoc.ref.get().then((snapshot) => {
      this.game = snapshot.data();
      console.log(snapshot.data());
    });
    this.gameDoc.ref.onSnapshot((snapshot) => {
      console.log(snapshot.data());
      this.game = snapshot.data();
    });
  }

}
