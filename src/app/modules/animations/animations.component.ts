import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ANIMATIONS_DATA } from '../../shared/data/animations.data';
import { ANIMATION } from '../../shared/interfaces/animations.inteface';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CssCopyModalComponent } from './css-copy-modal/css-copy-modal.component';

@Component({
  selector: 'app-animations',
  imports: [CommonModule, FormsModule, MatTooltipModule],
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.scss']
})
export class AnimationsComponent implements OnInit, OnDestroy {

  readonly dialog = inject(MatDialog);

  public currentRouteSegment: string = '';
  private routeSubscription!: Subscription;
  public globalDuration: number = 0.4;
  public globalAnimationActive: boolean = false;
  public animationsData: ANIMATION[] = [];

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.url.subscribe(urlSegments => {
      const segment = urlSegments[urlSegments.length - 1]?.path || '';
      this.getAnimationsData(segment);
      this.triggerAllAnimations()
      if (this.globalAnimationActive) {
        this.stopAllAnimations();
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  public updateDuration(index: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const newValue = inputElement?.value;
    if (newValue && this.animationsData[index]) {
      this.animationsData[index].currentDuration = newValue;
    }
  }

  public triggerAnimation(index: number, animationClass: string, duration: string): void {
    const element = document.getElementById(`animation-${index}`) as HTMLElement;
    if (element) {
      element.classList.add(animationClass);
      element.style.animationDuration = `${duration}s`;
      this.animationsData[index].isActive = true;
      element.style.animationPlayState = 'running';

      setTimeout(() => {
        element.classList.remove(animationClass);
        element.style.animationDuration = '';
        this.animationsData[index].isActive = false;
        element.style.animationPlayState = '';
      }, parseFloat(duration) * 1000);
    }
  }

  public stopAnimation(index: number): void {
    const element = document.getElementById(`animation-${index}`) as HTMLElement;
    const animation = this.animationsData[index];
    
    if (element && animation) {
      animation.isActive = false;
      element.classList.remove(animation.animationClass);
      const animationElement = element.querySelector('.circle-border');
      if (animationElement) {
        animationElement.classList.remove('rotate-center');
        animationElement.classList.add('stop');
      }
    }
  }

  public getAnimationsData(id: string): void {
    this.animationsData = ANIMATIONS_DATA[id] || [];
    this.animationsData.forEach((animation, index) => {
      const element = document.getElementById(`animation-${index}`) as HTMLElement;
      if (element) {
        element.classList.remove(...element.classList);
        element.classList.add(animation.animationClass);
      }
    });
  }

  public updateGlobalDuration(newValue: number): void {
    this.globalDuration = newValue || 0;
    if (this.globalAnimationActive) {
      this.triggerAllAnimations();
    }
  }

  public triggerAllAnimations(): void {
    this.globalAnimationActive = true;
    this.animationsData.forEach((animation, index) => {
      const element = document.getElementById(`animation-${index}`) as HTMLElement;
      if (element) {
        element.style.animationIterationCount = 'infinite';
        // element.style.animationPlayState = 'running';
        const duration = this.globalDuration.toString()
        element.classList.add(animation.animationClass);
        element.style.animationDuration = `${duration}s`;
        this.animationsData[index].isActive = true;
        this.animationsData[index].currentDuration = duration;
      }
    });
  }
  
  public stopAllAnimations(): void {
    this.globalAnimationActive = false;
    this.animationsData.forEach((animation, index) => {
      const element = document.getElementById(`animation-${index}`) as HTMLElement;
      if (element && animation) {
        animation.isActive = false;

        element.style.animationIterationCount = '';
        element.classList.remove(...element.classList);
  
        const animationElement = element.querySelector('.circle-border');
        if (animationElement) {
          animationElement.classList.remove('rotate-center');
          animationElement.classList.add('stop');
        }
      }
    });
  }
  
  public resumeAllAnimations(): void {
    this.globalAnimationActive = true;
    this.animationsData.forEach((animation, index) => {
      const element = document.getElementById(`animation-${index}`) as HTMLElement;
      if (element) {
        element.style.animationPlayState = 'running';
        element.classList.add(animation.animationClass);
        const duration = this.globalDuration.toString();
        this.triggerAnimation(index, animation.animationClass, duration);
      }
    });
  }

  public openCssCopyModal(styleId: string): void {
    const styleElement = document.getElementById(styleId) as HTMLStyleElement;
    if (styleElement) {
      const dialogRef = this.dialog.open(CssCopyModalComponent, {
        data: styleElement.innerHTML
      });
  
      dialogRef.afterClosed().subscribe();
    }
  }
}
