import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-page',
  imports: [CommonModule],
  templateUrl: './loading-page.component.html',
})
export class LoadingPageComponent implements OnInit {
  public isVisible: boolean = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.isVisible = false;
    }, 500);
  }
}
