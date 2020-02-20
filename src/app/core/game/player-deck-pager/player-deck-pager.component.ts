import {TgCard, TgPlayer} from '../../../shared/api/firebase/GameSnapshot';
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
  selectedMeans: string = 'fuck';
  // @Output() selectedMeansChange = new EventEmitter<string>();
  selectedClue: string = 'me';
  // @Output() selectedClueChange = new EventEmitter<string>();

  players: Observable<TgPlayer[]>;

  constructor(private gameApi: GameApiService, private playerApiService: PlayerApiService) {
    this.players = playerApiService.getAllPlayers();
  }

  ngOnInit() {
  }
}
