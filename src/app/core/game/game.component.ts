import {GameApiService} from '../../shared/api/game/game-api.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AppModule} from '../../app.module';
import {MurdererSelectDialogComponent} from './murderer-select-dialog/murderer-select-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  gameId;

  constructor(private route: ActivatedRoute, private cardApi: GameApiService, public dialog: MatDialog,) {
  }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.gameId = routeParams.gameId;
    });
  }

  openDialog() {
    this.dialog.open(MurdererSelectDialogComponent, {
      data: {
        animal: 'panda'
      }
    });
  }
}
