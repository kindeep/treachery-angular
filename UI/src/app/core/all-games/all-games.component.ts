import { ForensicApiService } from './../../shared/api/forensic/forensic-api.service';
import { TgGame } from '../../shared/api/models/models';
import { GameApiService } from '../../shared/api/game/game-api.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.scss']
})
export class AllGamesComponent implements OnInit {
  games$: Observable<TgGame[]>;
  empty: boolean;
  loading: boolean;
  gamesCollection: any;
  constructor(public cardApi: GameApiService, public forensicApi: ForensicApiService, public gameApi: GameApiService, private router: Router) {
    this.loading = true;
    this.empty = false;
    const query = this.cardApi.activeGamesQuery();
    this.games$ = query.valueChanges() as Observable<TgGame[]>;
    
    query.ref.get().then(querySnapshot => {
      this.handleQuery(querySnapshot);
    });

    query.ref.onSnapshot(querySnapshot => {
      this.handleQuery(querySnapshot);
    });
  }

  handleQuery(querySnapshot) {
    this.loading = false;
    this.empty = querySnapshot.docs.size > 0;
  }

  ngOnInit() { }

  joinGame(gameId) {
    this.router.navigateByUrl(`/join/${gameId}`)
  }
}
