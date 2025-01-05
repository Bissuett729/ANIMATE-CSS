export interface ANIMATION_GROUP {
  [key: string]: ANIMATION[];
}

export interface ANIMATION {
  label: string;
  currentDuration: string;
  animationClass: string;
  isActive: boolean;
}
