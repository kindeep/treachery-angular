import { GameApiService } from '../game-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.scss']
})
export class AllGamesComponent implements OnInit {
  games: any;
  constructor(
    public cardApi: GameApiService
  ) {
    this.cardApi.activeGamesQuery(query => {
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
