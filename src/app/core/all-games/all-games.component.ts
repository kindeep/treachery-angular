import { TgGame } from '../../shared/api/models/GameSnapshot';
import { GameApiService } from '../../shared/api/game/game-api.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.scss']
})
export class AllGamesComponent implements OnInit {
  games: Observable<TgGame[]>;
  empty: boolean;
  loading: boolean;
  gamesCollection: any;
  constructor(public cardApi: GameApiService) {
    this.loading = true;
    this.empty = false;
    const query = this.cardApi.activeGamesQuery();
    this.games = query.valueChanges() as Observable<TgGame[]>;
    this.games.forEach(el => {
      console.log(el);
    });
    console.log(this.games);

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

  ngOnInit() {}
}
