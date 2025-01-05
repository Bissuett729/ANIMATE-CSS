import { Routes } from '@angular/router';
// Layout
import { LayoutComponent } from './core/layout/layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'animateCss/v1', pathMatch: 'full' },
  { 
    path: 'animateCss/v1', 
    component: LayoutComponent, 
    loadChildren: () => import('./modules/modules.routes').then(m => m.ModulesRoutes) 
  }
];