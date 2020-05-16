import { GameApiService } from '../../../shared/api/game/game-api.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PlayerApiService } from '../../../shared/api/player/player-api.service';
import { TgCard, TgPlayer } from '../../../shared/api/models/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-murderer-select-dialog',
  templateUrl: './murderer-select-dialog.component.html',
  styleUrls: ['./murderer-select-dialog.component.scss']
})
export class MurdererSelectDialogComponent implements OnInit {
  @Input() player: TgPlayer;
  selectedClue: string;
  selectedMeans: string;

  constructor(private gameApi: GameApiService) {
    // this.player$ = playerApiService.getCurrentPlayer();
  }

  ngOnInit() {
  }

  selectCards() {
    this.gameApi.selectMurdererCards(this.selectedClue, this.selectedMeans);
    // this.playerApiService.selectMurdererCards(this.selectedClue, this.selectedMeans);
  }
}
