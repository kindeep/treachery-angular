import { CardSnapshot } from '../../../shared/api/firebase/GameSnapshot';
import { GameApiService } from '../../../shared/api/game/game-api.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player-deck-pager',
  templateUrl: './player-deck-pager.component.html',
  styleUrls: ['./player-deck-pager.component.scss']
})
export class PlayerDeckPagerComponent implements OnInit {
  @Input() disableSelection = false;
  selectedMeans: string;
  selectedClue: string;
  constructor(public gameApi: GameApiService) {}

  onClueSelect(cardName: string) {
    this.gameApi.setSelectedClue(cardName);
    this.selectedClue = cardName;
  }

  onMeansSelect(cardName: string) {
    this.gameApi.setSelectedMeans(cardName);
    this.selectedMeans = cardName;
  }

  ngOnInit() {}
}
