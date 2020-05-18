import { Component, OnInit, Input } from '@angular/core';
import { TgPlayer } from './../../../shared/api/models/models';
import { AvatarService } from './../../../shared/api/avatar/avatar.service';

@Component({
  selector: 'app-joined-player-list-item',
  templateUrl: './joined-player-list-item.component.html',
  styleUrls: ['./joined-player-list-item.component.scss']
})
export class JoinedPlayerListItemComponent implements OnInit {
  @Input() player: TgPlayer;
  constructor(public avatar: AvatarService) {}

  ngOnInit() {}
}
