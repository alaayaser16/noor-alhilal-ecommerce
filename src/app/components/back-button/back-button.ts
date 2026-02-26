import { RouterLink } from '@angular/router';
import { Component, input } from '@angular/core';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
@Component({
  selector: 'app-back-button',
  imports: [MatButtonModule, RouterLink, MatIconModule],
  template: `
    <button matButton="text" [routerLink]="navigateTo() ?? null" class="-ms-2 flex items-center gap-1 ">
      <mat-icon class="rtl-rotate">arrow_back</mat-icon>
      <ng-content></ng-content>
    </button>
  `,
  styles: `
  :host{
    display:block;
  }
  .rtl-rotate {
    transform: rotate(180deg); 
  }

  `,
})
export class BackButton {
  navigateTo = input<string>();
}
