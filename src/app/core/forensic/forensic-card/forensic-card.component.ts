import { TgForensicCard } from '../../../shared/api/models/models';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-forensic-card',
  templateUrl: './forensic-card.component.html',
  styleUrls: ['./forensic-card.component.scss']
})
export class ForensicCardComponent implements OnInit {
  @Input() forensicCard: TgForensicCard;
  @Input() disabled: boolean;
  @Input() selected: boolean;
  
  constructor() {}

  ngOnInit() {}

  isSelected(choice: string) {
    return choice === this.forensicCard.selectedChoice;
  }

  choiceClick(choice: string) {
    this.forensicCard.selectedChoice = choice;
  }
}
