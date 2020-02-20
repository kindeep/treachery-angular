import { TgForensicCard, SampleForensicCardSnapshot } from '../../../shared/api/firebase/GameSnapshot';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-forensic-card',
  templateUrl: './forensic-card.component.html',
  styleUrls: ['./forensic-card.component.scss']
})
export class ForensicCardComponent implements OnInit {
  @Input() forensicCard: TgForensicCard = new SampleForensicCardSnapshot();
  constructor() {}

  ngOnInit() {}

  isSelected(choice) {
    return choice === this.forensicCard.choices[this.forensicCard.selectedChoice];
  }
}
