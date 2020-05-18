import {Component, OnInit} from '@angular/core';
import {ChatApiService} from '../../api/chat/chat-api.service';
import {Observable} from 'rxjs';
import {TgMessage} from '../../api/models/models';
import { GameApiService } from './../../api/game/game-api.service';
import { AuthService } from './../../../core/auth.service';
import { AvatarService } from './../../api/avatar/avatar.service';
import { TgGame } from 'src/app/shared/api/models/models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  playerNamesDict$: any;
  constructor(public chatApi: ChatApiService, public gameApi: GameApiService, public auth: AuthService, public avatar: AvatarService) {
  }

  getAvatarUrl(message: TgMessage, game: TgGame) {
    return this.avatar.getAvatar(message.playerUid ? message.playerUid : game.creatorUid)
  }

  mine(message: TgMessage) {
    return message.playerUid === this.auth.user.uid;
  }

  ngOnInit() {
  }

}
