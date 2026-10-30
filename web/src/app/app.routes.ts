import { Routes } from '@angular/router';
import { GamePage } from './pages/game-page';
import { HomePage } from './pages/home-page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'game/:code', component: GamePage },
  { path: '**', redirectTo: '' },
];
