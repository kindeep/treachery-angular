import { GameApiService } from '../../shared/api/game/game-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../shared/api/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent implements OnInit {
  gameId: string;
  subscription: Subscription;
  subscription2: Subscription;
  constructor(private route: ActivatedRoute, public gameApi: GameApiService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(({ gameId }) => {
      this.gameId = gameId;
      this.gameApi.setGameId(this.gameId);
      this.subscription = this.gameApi.players$.subscribe(players => {
        this.subscription2 = this.gameApi.game$.subscribe(game => {
          if (players && game) {
            if (players.find(player => player.uid === this.auth.user.uid)) {
              this.router.navigateByUrl(`/play/${gameId}`);
            } else if (game.creatorUid === this.auth.user.uid) {
              this.router.navigateByUrl(`/forensic/${gameId}`);
            } else {
              // correct page
            }
          }
        });
      });
    });
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  joinGame(playerName: string) {
    this.gameApi.joinGame(this.gameId, playerName);
  }
}
