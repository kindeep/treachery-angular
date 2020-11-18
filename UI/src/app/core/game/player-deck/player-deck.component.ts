import {TgPlayer} from '../../../shared/api/models/models';
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-player-deck',
  templateUrl: './player-deck.component.html',
  styleUrls: ['./player-deck.component.scss']
})
export class PlayerDeckComponent implements OnInit {
  @Input() player: TgPlayer;
  @Input() disableSelection = false;
  @Input() selectedClue: string;
  @Output() selectedClueChange = new EventEmitter<string>();
  @Input() selectedMeans: string;
  @Output() selectedMeansChange = new EventEmitter<string>();
  @Input() disableSelectionDisplay = false;

  constructor() {
  }

  clueClick(cardName) {
    this.selectedClue = cardName;
    this.selectedClueChange.emit(this.selectedClue);
  }

  meansClick(cardName) {
    this.selectedMeans = cardName;
    this.selectedMeansChange.emit(this.selectedMeans);
  }


  ngOnInit() {
  }
}
