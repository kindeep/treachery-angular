import { ChatApiService } from 'src/app/shared/api/chat/chat-api.service';
import { TgPartialGuess } from './../../shared/api/models/models';
import { AuthService } from './../../shared/api/auth/auth.service';
import { Subscription } from 'rxjs';
import { GameApiService } from '../../shared/api/game/game-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MurdererSelectDialogComponent } from './murderer-select-dialog/murderer-select-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
    private router: Router,
    public chatApi: ChatApiService
  ) {}

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
        });
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
