import {Injectable} from '@angular/core';
import {GameApiService} from '../game/game-api.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {TgGame, TgGuess, TgMessage, TgMessageType} from '../models/models';
import {classToPlain} from 'class-transformer';
import {PlayerApiService} from '../player/player-api.service';
import {firestore} from 'firebase';
import Timestamp = firestore.Timestamp;
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatApiService {
  messages$: Observable<TgMessage[]>
  constructor(
    private db: AngularFirestore,
    private gameApi: GameApiService,
  ) {

  }

}
