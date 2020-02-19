import { GameApiService } from '../../../game-api.service';
import { PlayerSnapshot, GameInstanceSnapshot } from '../../../shared/api/firebase/GameSnapshot';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-joined-players-list',
  templateUrl: './joined-players-list.component.html',
  styleUrls: ['./joined-players-list.component.scss']
})
export class JoinedPlayersListComponent implements OnInit {
  @Input() gameId: string;

  players: PlayerSnapshot[];
  gameDoc: any;
  gameInstance: GameInstanceSnapshot;
  constructor(private gameApi: GameApiService) { }

  ngOnInit() {
    this.gameDoc = this.gameApi.getGameDoc(this.gameId);

    this.gameDoc.ref.get().then(snapshot => {
      this.gameInstance = snapshot.data();
      this.players = this.gameInstance.players;
      console.log(snapshot);
      console.log(this.players);
    });

    this.gameDoc.ref.onSnapshot(snapshot => {
      this.initWithSnapshot(snapshot);
    });
  }

  initWithSnapshot(snapshot: any) {
    this.gameInstance = snapshot.data();
    this.players = this.gameInstance.players;
    console.log(snapshot);
    console.log(this.players);
  }

}
