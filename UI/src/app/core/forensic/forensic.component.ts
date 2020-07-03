import { ChatApiService } from 'src/app/shared/api/chat/chat-api.service';
import { TgGame, TgForensicPrivateData, TgForensicCard, TgCard } from './../../shared/api/models/models';
import { ForensicApiService } from './../../shared/api/forensic/forensic-api.service';
import { GameApiService } from '../../shared/api/game/game-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { CardApiService } from './../../shared/api/card/card-api.service';
import { take } from 'rxjs/operators';
import { AuthService } from './../../shared/api/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forensic',
  templateUrl: './forensic.component.html',
  styleUrls: ['./forensic.component.scss']
})
export class ForensicComponent implements OnInit {
  selectedCauseCardName: string;
  selectedLocationCardName: string;
  selectedCauseCardOption: string;
  selectedLocationCardOption: string;
  selectedOtherCardOption: string;
  replaceCardName: string;
  loading = true;
  subscription: Subscription;
  subscription2: Subscription;

  constructor(
    private route: ActivatedRoute,
    public cardApi: CardApiService,
    public forensicApi: ForensicApiService,
    public gameApi: GameApiService,
    public router: Router,
    public auth: AuthService, 
    public chatApi: ChatApiService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 10000);
    this.route.params.subscribe(async ({ gameId }) => {
      this.gameApi.setGameId(gameId);
      this.subscription = this.gameApi.players$.subscribe(players => {
        this.subscription2 = this.gameApi.game$.subscribe(game => {
          if (players && game) {
            if (players.find(player => player.uid === this.auth.user.uid)) {
              this.router.navigateByUrl(`/play/${gameId}`);
            } else if (game.creatorUid === this.auth.user.uid) {
              // correct page
            } else {
              this.router.navigateByUrl(`/join/${gameId}`);
            }
          }
        });
      })
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
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

    if (this.selectedLocationCardName !== card.cardName) {
      this.selectedLocationCardName = card.cardName;
      this.selectedLocationCardOption = null;
    }
  }

  nextCard(game: TgGame) {
    return game.otherCards.find(value => !value.selectedChoice);
  }

  async selectCauseCard() {
    this.gameApi.selectForensicCauseCard(
      await this.cardApi.getCauseCard(this.selectedCauseCardName, this.selectedCauseCardOption)
    );
    this.selectedCauseCardName = null;
    this.selectedCauseCardOption = null;
  }

  async selectLocationCard() {
    this.gameApi.selectForensicLocationCard(
      await this.cardApi.getLocationCard(this.selectedLocationCardName, this.selectedLocationCardOption)
    )
    this.selectedLocationCardName = null;
    this.selectedLocationCardOption = null;
  }

  async selectNextOtherCard() {
    this.gameApi.game$.pipe(take(1)).subscribe(game => {
      const nextCard = this.nextCard(game);
      this.gameApi.selectNextForensicOtherCard({
        ...nextCard,
        selectedChoice: this.selectedOtherCardOption
      }, this.replaceCardName)
      this.selectedOtherCardOption = null;
      this.replaceCardName = null;
    })

  }

  selectReplaceCard = (card: TgForensicCard) => {
    this.replaceCardName = card.cardName;
  }

  toReplace(game: TgGame) {
    return game.otherCards.filter(card => card.selectedChoice).length >= 4 && game.otherCards.filter(card => card.replaced).length < 2;
  }

  showNextOtherCard(game: TgGame) {
    return game.causeCard && game.locationCard && game.otherCards.filter(card => card.selectedChoice).length < 6;
  }

  waitingToEnd(game: TgGame) {
    return game.causeCard && game.locationCard && game.otherCards.filter(card => card.selectedChoice).length >= 6;
  }

  endGame() {
    this.forensicApi.endGame();
  }
}
