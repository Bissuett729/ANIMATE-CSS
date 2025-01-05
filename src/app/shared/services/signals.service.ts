import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalsService {

  public openSidebar$ = signal<boolean>(true)
  public loadingPage$ = signal<boolean>(true)
  public currentAnimationLabel$ = signal<string>('scale up')

  constructor() {
    this.checkMediaQuery();
    window.addEventListener('resize', this.checkMediaQuery.bind(this));
  }

  public setCurrentAnimationLabel(label: string) {
    this.currentAnimationLabel$.set(label)
  }

  private checkMediaQuery() {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    this.setSidebar(mediaQuery.matches);
  }

  public setLoadingPage(state: boolean) {
    this.loadingPage$.set(state)
  }

  public setSidebar(state: boolean) {
    this.openSidebar$.set(state)
  }
}
