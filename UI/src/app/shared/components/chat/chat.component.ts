import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ChatApiService } from '../../api/chat/chat-api.service';
import { Observable } from 'rxjs';
import { TgMessage } from '../../api/models/models';
import { GameApiService } from './../../api/game/game-api.service';
import { AuthService } from './../../api/auth/auth.service';
import { AvatarService } from './../../api/avatar/avatar.service';
import { TgGame } from 'src/app/shared/api/models/models';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() disableChat = false;
  @ViewChild('messages') messagesEl: ElementRef;
  playerNamesDict$: any;
  message: string;
  constructor(public chatApi: ChatApiService, public gameApi: GameApiService, public auth: AuthService, public avatar: AvatarService) {}

  getUid(message: TgMessage, game: TgGame): string {
    return message.playerUid ? message.playerUid : game.creatorUid;
  }

  mine(message: TgMessage, game: TgGame) {
    return message.playerUid === this.auth.user.uid || (!message.playerUid && game.creatorUid === this.auth.user.uid);
  }

  ngOnInit() {}

  sendMessage() {
    this.chatApi.sendMessage(this.message);
    this.message = '';
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      this.messagesEl.nativeElement.scrollTop = this.messagesEl.nativeElement.scrollHeight;
    }, 200);
  }
}
