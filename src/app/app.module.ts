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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule 
  ],
  providers: [GameApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
