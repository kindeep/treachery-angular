import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tg-confirmation-button',
  templateUrl: './confirmation-button.component.html',
  styleUrls: ['./confirmation-button.component.scss']
})
export class ConfirmationButtonComponent implements OnInit {
  @Output() whenClicked = new EventEmitter();
  clicked = false;

  constructor() { }

  ngOnInit(): void {
  }

  handleClick($event) {
    if (this.clicked) {
      this.clicked = false;
      this.whenClicked.emit($event);
    }
    else {
      this.clicked = true;
    }
  }

}
