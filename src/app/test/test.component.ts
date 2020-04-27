import { GameApiService } from '../shared/api/game/game-api.service';
import { MurdererSelectDialogComponent } from '../core/game/murderer-select-dialog/murderer-select-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {TgPlayer} from '../shared/api/models/models';
import {Observable} from 'rxjs';
import {PlayerApiService} from '../shared/api/player/player-api.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  selectedMeans = null;
  selectedClue = null;
  players$: Observable<TgPlayer[]>;
  constructor(public dialog: MatDialog, private gameApi: GameApiService, private playerApiService: PlayerApiService) {
    // gameApi.setGameId('7gpi56uobw');
    // gameApi.setPlayerName('fdsgdsfg');
    // this.players$ = playerApiService.getAllPlayers();
  }

  ngOnInit() {}

  openDialog() {
    this.dialog.open(MurdererSelectDialogComponent, {
      data: {
        animal: 'panda'
      }
    });
  }
}
