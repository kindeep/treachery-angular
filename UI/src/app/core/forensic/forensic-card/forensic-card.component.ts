import { TgForensicCard } from '../../../shared/api/models/models';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-forensic-card',
  templateUrl: './forensic-card.component.html',
  styleUrls: ['./forensic-card.component.scss']
})
export class ForensicCardComponent implements OnInit {
  @Input() forensicCard: TgForensicCard;
  @Input() disabled: boolean;
  @Input() selected: boolean;
  @Input() selectedOptionName;
  @Output() selectedOptionNameChange = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  isSelected(choiceName: string) {
    return choiceName === this.forensicCard.selectedChoice || choiceName === this.selectedOptionName;
  }

  choiceClick(choice: string) {
    this.selectedOptionNameChange.emit(choice);
  }
}
