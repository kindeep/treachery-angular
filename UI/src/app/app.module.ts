import { GameApiService } from './shared/api/game/game-api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { GameComponent } from './core/game/game.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { environment } from '../environments/environment';
import { ForensicComponent } from './core/forensic/forensic.component';
import { AllGamesComponent } from './core/all-games/all-games.component';
import { CardComponent } from './shared/components/card/card.component';
import { ActiveGamesListItemComponent } from './core/all-games/active-games-list-item/active-games-list-item.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { JoinGameComponent } from './core/join-game/join-game.component';
import { JoinedPlayersListComponent } from './core/join-game/joined-players-list/joined-players-list.component';
import { JoinedPlayerListItemComponent } from './core/join-game/joined-player-list-item/joined-player-list-item.component';
import { RippleMatCardComponent } from './shared/components/ripple-mat-card/ripple-mat-card.component';
import { PlayerDeckComponent } from './core/game/player-deck/player-deck.component';
import { ChatComponent } from './shared/components/chat/chat.component';
import { PlayerDeckPagerComponent } from './core/game/player-deck-pager/player-deck-pager.component';
import { GuessComponent } from './core/game/guess/guess.component';
import { ForensicCardComponent } from './core/forensic/forensic-card/forensic-card.component';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MurdererSelectDialogComponent } from './core/game/murderer-select-dialog/murderer-select-dialog.component';
import { TestComponent } from './test/test.component';
import 'firebase/firestore';
import { CardWrapperComponent } from './shared/components/card-wrapper/card-wrapper.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CenteringFlexComponent } from './shared/components/centering-flex/centering-flex.component';
import { HttpClientModule } from '@angular/common/http';
import { AvatarComponent } from './shared/components/avatar/avatar.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { CopyLinkComponent } from './shared/copy-link/copy-link.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';
import { InfoComponent } from './shared/components/info/info.component';
import { MurdererInfoComponent } from './core/forensic/murderer-info/murderer-info.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmationButtonComponent } from './shared/components/confirmation-button/confirmation-button.component';
import { FormsModule } from '@angular/forms';

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
    PlayerDeckComponent,
    ChatComponent,
    PlayerDeckPagerComponent,
    GuessComponent,
    ForensicCardComponent,
    MurdererSelectDialogComponent,
    TestComponent,
    CardWrapperComponent,
    CenteringFlexComponent,
    AvatarComponent,
    NavbarComponent,
    CopyLinkComponent,
    InfoComponent,
    MurdererInfoComponent,
    ConfirmationButtonComponent
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
    AngularFireFunctionsModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatInputModule,
    MatListModule,
    MatDialogModule,
    MatCardModule,
    MatProgressBarModule,
    HttpClientModule,
    LazyLoadImageModule,
    ClipboardModule,
    MatIconModule,
    MatSnackBarModule,
    FormsModule
  ],
  providers: [GameApiService, { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }],
  bootstrap: [AppComponent],
  entryComponents: [MurdererSelectDialogComponent]
})
export class AppModule {}
