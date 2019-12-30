import { GameApiService } from '../game-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.scss']
})
export class AllGamesComponent implements OnInit {
  games: any;
  loading: boolean;
  constructor(
    public cardApi: GameApiService
  ) {
    this.loading = true;
    this.cardApi.activeGamesQuery(query => {
      query.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
        console.log(querySnapshot);
        this.games = querySnapshot.docs;
        this.loading = false;
      });
      query.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
        console.log(querySnapshot);
        this.games = querySnapshot.docs;
      }
      );
    });
  }

  ngOnInit() {
  }

}
