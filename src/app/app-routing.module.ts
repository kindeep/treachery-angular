import { TestComponent } from './test/test.component';
import { InvestigatorComponent } from './core/game/investigator/investigator.component';
import { JoinGameComponent } from './core/join-game/join-game.component';
import { AllGamesComponent } from './core/all-games/all-games.component';
import { ForensicComponent } from './core/forensic/forensic.component';
import { GameComponent } from './core/game/game.component';
import { PlayerComponentComponent } from './core/game/player-component/player-component.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'games/:gameId', component: GameComponent },
  { path: 'forensic/:gameId', component: ForensicComponent },
  { path: 'join/:gameId', component: JoinGameComponent },
  { path: '', component: AllGamesComponent },
  { path: 'play', component: InvestigatorComponent },
  { path: 'test', component: TestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
