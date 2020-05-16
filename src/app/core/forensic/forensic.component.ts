import { TgGame, TgForensicPrivateData, TgForensicCard, TgCard } from './../../shared/api/models/models';
import { ForensicApiService } from './../../shared/api/forensic/forensic-api.service';
import { GameApiService } from '../../shared/api/game/game-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { CardApiService } from './../../shared/api/card/card-api.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-forensic',
  templateUrl: './forensic.component.html',
  styleUrls: ['./forensic.component.scss']
})
export class ForensicComponent implements OnInit {
  // gameId: string;
  // game$: Observable<TgGame>;
  // privateData$: Observable<TgForensicPrivateData>;
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
    this.route.params.subscribe(({ gameId }) => {
      this.gameApi.setGameId(gameId);
    });
  }

  getChosenMeansCard(privateObj: TgForensicPrivateData) {
    return privateObj.murderer.clueCards.find((card: TgCard) => card.name === privateObj.murdererClueCardName)
  }

  getChosenClueCard(privateObj: TgForensicPrivateData) {
    return privateObj.murderer.meansCards.find((card: TgCard) => card.name === privateObj.murdererMeansCardName)
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

  async selectCauseCard() {

    this.gameApi.selectForensicCauseCard(
      await this.cardApi.getCauseCard(this.selectedCauseCardName, this.selectedCauseCardOption)
    );
  }

  async selectLocationCard() {
    this.gameApi.selectForensicLocationCard(
      await this.cardApi.getLocationCard(this.selectedLocationCardName, this.selectedLocationCardOption)
    )
  }

  async selectNextOtherCard() {
    this.gameApi.game$.pipe(take(1)).subscribe(game => {
      this.gameApi.selectNextForensicOtherCard({
        ...this.nextCard(game),
        selectedChoice: this.selectedOtherCardOption
      })
    })
  }
}
