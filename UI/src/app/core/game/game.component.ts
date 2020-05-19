import { TgPlayer, TgGuess, TgPartialGuess } from './../../shared/api/models/models';
import { AuthService } from './../../shared/api/auth/auth.service';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { GameApiService } from '../../shared/api/game/game-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AppModule } from '../../app.module';
import { MurdererSelectDialogComponent } from './murderer-select-dialog/murderer-select-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TgPlayerPrivateData, TgGame } from 'src/app/shared/api/models/models';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  // gameId;
  // game$: Observable<TgGame>;
  // privateData$: Observable<TgPlayerPrivateData>;
  // player$: Observable<TgPlayer>;
  guess: TgPartialGuess = {} as TgPartialGuess;
  // guesses$: Observable<TgGuess[]>;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public gameApi: GameApiService,
    private auth: AuthService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(({ gameId }) => {
      this.gameApi.setGameId(gameId);
    });
  }

  openDialog() {
    this.dialog.open(MurdererSelectDialogComponent, {});
  }
}
