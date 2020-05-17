import { Injectable } from '@angular/core';
import { GameApiService } from '../game/game-api.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { TgGame, TgGuess, TgMessage, TgMessageType } from '../models/models';
import { classToPlain } from 'class-transformer';
import { PlayerApiService } from '../player/player-api.service';
import { firestore } from 'firebase';
import Timestamp = firestore.Timestamp;
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { AuthService } from './../../../core/auth.service';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatApiService {
  messages$: Observable<TgMessage[]>;
  messagesCollection$: Observable<AngularFirestoreCollection<TgMessage>>
  constructor(
    private db: AngularFirestore,
    private gameApi: GameApiService,
    private auth: AuthService
  ) {
    this.messagesCollection$ = this.gameApi.gameDoc$.pipe(map(gameDoc => {
      if (gameDoc) {
        return gameDoc.collection<TgMessage>('messages');
      } else {
        return null;
      }
    }));
    this.messages$ = this.messagesCollection$.pipe(switchMap(messagesCollection => {
      if (messagesCollection) {
        return messagesCollection.valueChanges();
      } else {
        return of(null);
      }
    }))
  }

  sendMessage(message: string, type: TgMessageType = TgMessageType.CHAT) {
    this.messagesCollection$.pipe(take(1)).subscribe(messagesCollection => {
      messagesCollection.add({
        playerUid: this.auth.user.uid,
        message,
        timestamp: Timestamp.now(),
        type
      })
    })
  }

}
