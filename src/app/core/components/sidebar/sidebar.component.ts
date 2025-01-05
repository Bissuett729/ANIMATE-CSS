import { Component, inject } from '@angular/core';
import { SignalsService } from '../../../shared/services/signals.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  
  public _signals = inject(SignalsService)

  public menus: {menu: string, url: string, ariaLabel: string}[] = [
    {menu: 'Scale up', url: 'animations/scale-up', ariaLabel: ''},
    {menu: 'Scale down', url: 'animations/scale-down', ariaLabel: ''},
    {menu: 'Rotate', url: 'animations/rotate', ariaLabel: ''},
    {menu: 'Rotate and scale', url: 'animations/rotate-and-scale', ariaLabel: ''},
    {menu: 'Swing', url: 'animations/swing', ariaLabel: ''},
    {menu: 'Slide', url: 'animations/slide', ariaLabel: ''},
    {menu: 'Shadow', url: 'animations/shadow', ariaLabel: ''},
    {menu: 'Tracking in/out', url: 'animations/tracking-in-out', ariaLabel: ''},
    {menu: 'Blur', url: 'animations/blur', ariaLabel: ''},
    {menu: 'Special', url: 'animations/special', ariaLabel: ''},
  ]

  constructor() {}

}
