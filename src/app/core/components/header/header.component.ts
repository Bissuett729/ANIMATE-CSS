import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignalsService } from '../../../shared/services/signals.service';

@Component({
  selector: 'app-header',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  public _signals = inject(SignalsService);
}
