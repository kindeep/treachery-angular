import { TgPlayer, TgGuess, TgPartialGuess } from './../../shared/api/models/models';
import { AuthService } from './../../shared/api/auth/auth.service';
import { auth } from 'firebase/app';
import { Observable, Subscription } from 'rxjs';
import { GameApiService } from '../../shared/api/game/game-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AppModule } from '../../app.module';
import { MurdererSelectDialogComponent } from './murderer-select-dialog/murderer-select-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TgPlayerPrivateData, TgGame } from 'src/app/shared/api/models/models';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  guess: TgPartialGuess = {} as TgPartialGuess;
  subscription: Subscription;
  subscription2: Subscription;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public gameApi: GameApiService,
    private auth: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(async ({ gameId }) => {
      this.gameApi.setGameId(gameId);
      if (!(await this.gameApi.gameExists(gameId))) {
        this.router.navigateByUrl('/');
      } else {
        this.subscription = this.gameApi.players$.subscribe(players => {
          this.subscription2 = this.gameApi.game$.subscribe(game => {
            if (players && game) {
              if (players.find(player => player.uid === this.auth.user.uid)) {
                // correct page
              } else if (game.creatorUid === this.auth.user.uid) {
                this.router.navigateByUrl(`/forensic/${gameId}`);
              } else {
                this.router.navigateByUrl(`/join/${gameId}`);
              }
            }
          });
        })
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  openDialog() {
    this.dialog.open(MurdererSelectDialogComponent, {});
  }
}
