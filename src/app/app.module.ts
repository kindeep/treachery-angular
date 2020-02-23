import {GameInstanceService} from './shared/api/game-instance/game-instance.service';
import {GameApiService} from './shared/api/game/game-api.service';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {GameComponent} from './core/game/game.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {ForensicComponent} from './core/forensic/forensic.component';
import {AllGamesComponent} from './core/all-games/all-games.component';
import {CardComponent} from './shared/card/card.component';
import {ActiveGamesListItemComponent} from './core/all-games/active-games-list-item/active-games-list-item.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRippleModule} from '@angular/material/core';
import {JoinGameComponent} from './core/join-game/join-game.component';
import {JoinedPlayersListComponent} from './core/join-game/joined-players-list/joined-players-list.component';
import {JoinedPlayerListItemComponent} from './core/join-game/joined-player-list-item/joined-player-list-item.component';
import {RippleMatCardComponent} from './shared/ripple-mat-card/ripple-mat-card.component';
import {InvestigatorComponent} from './core/game/investigator/investigator.component';
import {PlayerDeckComponent} from './core/game/player-deck/player-deck.component';
import {ForensicDeckComponent} from './core/forensic/forensic-deck/forensic-deck.component';
import {ChatComponent} from './shared/chat/chat.component';
import {PlayerDeckPagerComponent} from './core/game/player-deck-pager/player-deck-pager.component';
import {GuessComponent} from './core/game/guess/guess.component';
import {ForensicCardComponent} from './core/forensic/forensic-card/forensic-card.component';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {MurdererSelectDialogComponent} from './core/game/murderer-select-dialog/murderer-select-dialog.component';
import {TestComponent} from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
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
    PlayerDeckComponent,
    ForensicDeckComponent,
    ChatComponent,
    PlayerDeckPagerComponent,
    GuessComponent,
    ForensicCardComponent,
    MurdererSelectDialogComponent,
    TestComponent
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
    MatInputModule,
    MatListModule,
    MatDialogModule,
    MatCardModule
  ],
  providers: [GameApiService, GameInstanceService, {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent],
  entryComponents: [MurdererSelectDialogComponent]
})
export class AppModule {
}
