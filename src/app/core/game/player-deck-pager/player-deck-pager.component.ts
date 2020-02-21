import {TgCard, TgPlayer} from '../../../shared/api/models/GameSnapshot';
import {GameApiService} from '../../../shared/api/game/game-api.service';
import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {PlayerApiService} from '../../../shared/api/player/player-api.service';

@Component({
  selector: 'app-player-deck-pager',
  templateUrl: './player-deck-pager.component.html',
  styleUrls: ['./player-deck-pager.component.scss']
})
export class PlayerDeckPagerComponent implements OnInit {
  @Input() disableSelection = false;
  players$: Observable<TgPlayer[]>;
  @Input() selectedMeans: string;
  @Output() selectedMeansChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() selectedClue: string;
  @Output() selectedClueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(playerApiService: PlayerApiService) {
    this.players$ = playerApiService.getAllPlayers();
  }

  ngOnInit() {
  }
}
