import {Component, OnInit} from '@angular/core';
import {ChatApiService} from '../../api/chat/chat-api.service';
import {Observable} from 'rxjs';
import {TgMessage} from '../../api/models/models';
import { GameApiService } from '../../api/game/game-api.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  playerNamesDict$: any;
  constructor(public chatApi: ChatApiService, public gameApi: GameApiService) {
  }

  ngOnInit() {
  }

}
