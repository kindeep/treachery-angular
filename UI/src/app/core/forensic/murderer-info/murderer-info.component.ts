import { Component, OnInit, Input } from '@angular/core';
import { GameApiService } from 'src/app/shared/api/game/game-api.service';
import { ForensicApiService } from './../../../shared/api/forensic/forensic-api.service';
import { TgPlayer, TgCard, TgMurdererInfo } from './../../../shared/api/models/models';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { findClueCard, findMeansCard } from 'src/app/shared/utils/find';

@Component({
  selector: 'tg-murderer-info',
  templateUrl: './murderer-info.component.html',
  styleUrls: ['./murderer-info.component.scss']
})
export class MurdererInfoComponent implements OnInit {
  murderer$: Observable<TgMurdererInfo>;

  constructor(public forensicApi: ForensicApiService, public gameApi: GameApiService) {
    this.murderer$ = forensicApi.forensicPrivateData$.pipe(switchMap(forensicPrivateData => {
      if (forensicPrivateData && forensicPrivateData.murderer) {
        return of({
          murderer: forensicPrivateData.murderer,
          clueCard: findClueCard(forensicPrivateData.murderer, forensicPrivateData.murdererClueCardName),
          meansCard: findMeansCard(forensicPrivateData.murderer, forensicPrivateData.murdererMeansCardName)
        });
      } else {
        return this.gameApi.game$.pipe(switchMap(game => {
          if (game.murdererUid) {
            return this.gameApi.players$.pipe(map(players => {
              const murderer = players.find(p => p.uid === game.murdererUid);
              console.log({murderer})
              return {
                murderer,
                clueCard: findClueCard(murderer, game.murdererClueCardName),
                meansCard: findMeansCard(murderer, game.murdererMeansCardName)
              }
            }))
          } else {
            return of(null);
          }
        }))
      }

    }))
  }

  ngOnInit(): void {
  }


}
