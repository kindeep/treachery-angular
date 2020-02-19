import { GameApiService } from './../game-api.service';
import { MurdererSelectDialogComponent } from '../core/game/murderer-select-dialog/murderer-select-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(public dialog: MatDialog, public gameApi: GameApiService) {

    gameApi.setGameId("7gpi56uobw");
    gameApi.setPlayerName("fdsgdsfg");

  }

  ngOnInit() {

  }

  openDialog() {
    this.dialog.open(MurdererSelectDialogComponent, {
      data: {
        animal: 'panda'
      }
    });
  }
}
