import { Routes } from '@angular/router';
import { AnimationsComponent } from './animations/animations.component';

export const ModulesRoutes: Routes = [
  { path: '', redirectTo: 'animations/scale-up', pathMatch: 'full' },
  { path: 'animations/:animation', component: AnimationsComponent, pathMatch: 'full' },
];