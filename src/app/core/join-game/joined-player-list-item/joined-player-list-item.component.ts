import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-joined-player-list-item',
  templateUrl: './joined-player-list-item.component.html',
  styleUrls: ['./joined-player-list-item.component.scss']
})
export class JoinedPlayerListItemComponent implements OnInit {
  @Input() playerName: string;
  @Input() gameId: string;
  constructor() { }

  ngOnInit() {
  }

}
