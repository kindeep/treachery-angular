import { TgGame, TgForensicPrivateData, TgForensicCard, TgCard } from './../../shared/api/models/models';
import { ForensicApiService } from './../../shared/api/forensic/forensic-api.service';
import { GameApiService } from '../../shared/api/game/game-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { CardApiService } from './../../shared/api/card/card-api.service';

@Component({
  selector: 'app-forensic',
  templateUrl: './forensic.component.html',
  styleUrls: ['./forensic.component.scss']
})
export class ForensicComponent implements OnInit {
  gameId: string;
  game$: Observable<TgGame>;
  privateData$: Observable<TgForensicPrivateData>;
  selectedCauseCardName: string;
  selectedLocationCardName: string;
  selectedCauseCardOption: string;
  selectedLocationCardOption: string;
  selectedOtherCardOption: string;

  constructor(
    private route: ActivatedRoute,
    public cardApi: CardApiService,
    public forensicApi: ForensicApiService,
    public gameApi: GameApiService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.gameId = routeParams.gameId;
      this.forensicApi.updateGame(this.gameId);
      this.game$ = this.forensicApi.getGame();
      this.privateData$ = this.forensicApi.getPrivateData();
      this.privateData$.subscribe(value => { console.log(value) })
    });
  }

  startGame() {
    this.forensicApi.startGame();
  }

  causeCardClick(card: TgForensicCard) {
    this.selectedCauseCardName = card.cardName;
  }

  locationCardClick(card: TgForensicCard) {
    this.selectedLocationCardName = card.cardName;
  }

  nextCard(game: TgGame) {
    return game.otherCards.find(value => !value.selectedChoice);
  }
}
