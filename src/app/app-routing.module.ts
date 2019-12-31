import { JoinGameComponent } from './join-game/join-game.component';
import { AllGamesComponent } from './all-games/all-games.component';
import { ForensicComponent } from './forensic/forensic.component';
import { GameComponent } from './game/game.component';
import { PlayerComponentComponent } from './player-component/player-component.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'games/:gameId', component: GameComponent },
  { path: 'forensic/:gameId', component: ForensicComponent },
  { path: 'join/:gameId', component: JoinGameComponent },
  { path: '', component: AllGamesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
