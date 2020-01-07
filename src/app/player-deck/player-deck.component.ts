import { CardSnapshot, GameInstanceSnapshot } from './../firebase/GameSnapshot';
import { GameApiService } from './../game-api.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-player-deck',
  templateUrl: './player-deck.component.html',
  styleUrls: ['./player-deck.component.scss']
})
export class PlayerDeckComponent implements OnInit {
  @Input() playerName: string;
  clueCards: Observable<CardSnapshot[]>;
  meansCards: Observable<CardSnapshot[]>;
  @Input() disableSelection = false;
  @Input() onClueSelect: (cardName: string) => void;
  @Input() onMeansSelect: (cardName: string) => void;
  @Input() selectedClue: string = null;
  @Input() selectedMeans: string = null;

  constructor(public gameApi: GameApiService) {
  }

  meansClick(cardName) {
    if (!this.disableSelection) {
      // this.selectedMeans = cardName;
      this.onMeansSelect(cardName);
    }
  }

  clueClick(cardName) {
    if (!this.disableSelection) {
      // this.selectedClue = cardName;
      this.onClueSelect(cardName);
    }
  }

  ngOnInit() {
    this.clueCards = this.gameApi.gameReference.snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as GameInstanceSnapshot;
        return data.players.find(el => el.playerName === this.playerName).clueCards;
      }));
    this.meansCards = this.gameApi.gameReference.snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as GameInstanceSnapshot;
        return data.players.find(el => el.playerName === this.playerName).meansCards;
      }));
  }

}
