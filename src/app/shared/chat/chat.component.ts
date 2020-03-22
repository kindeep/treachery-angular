import {Component, OnInit} from '@angular/core';
import {ChatApiService} from '../api/chat/chat-api.service';
import {Observable} from 'rxjs';
import {TgMessage} from '../api/models/models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages$: Observable<TgMessage[]>;

  constructor(private chatApi: ChatApiService) {
    this.messages$ = chatApi.getMessages();
  }

  ngOnInit() {
  }
}
