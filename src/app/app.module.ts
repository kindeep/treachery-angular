import { GameInstanceService } from './game-instance.service';
import { GameApiService } from './game-api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponentComponent } from './player-component/player-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardHeader, MatCardActions, MatCard, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { GameComponent } from './game/game.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { ForensicComponent } from './forensic/forensic.component';
import { AllGamesComponent } from './all-games/all-games.component';
import { CardComponent } from './card/card.component';
import { ActiveGamesListItemComponent } from './active-games-list-item/active-games-list-item.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { JoinGameComponent } from './join-game/join-game.component';
import { JoinedPlayersListComponent } from './joined-players-list/joined-players-list.component';
import { JoinedPlayerListItemComponent } from './joined-player-list-item/joined-player-list-item.component';
import { RippleMatCardComponent } from './ripple-mat-card/ripple-mat-card.component';
import { InvestigatorComponent } from './investigator/investigator.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayerComponentComponent,
    MatCardHeader,
    MatCardActions,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    GameComponent,
    ForensicComponent,
    AllGamesComponent,
    CardComponent,
    ActiveGamesListItemComponent,
    JoinGameComponent,
    JoinedPlayersListComponent,
    JoinedPlayerListItemComponent,
    RippleMatCardComponent,
    InvestigatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatToolbarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatInputModule
  ],
  providers: [GameApiService, GameInstanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
