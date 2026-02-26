import { MatIcon } from '@angular/material/icon';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stock-status',
  imports: [MatIcon],
  template: `
    @if(inStock()){
      <div class="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-3 bg-white w-full">
        <mat-icon class="small">check_circle</mat-icon>
        <span class="text-xs text-gray-800">متوفر وجاهز للشحن</span>
      </div>
    }@else{
      <div class="flex items-center gap-2 border border-red-700 rounded-lg px-3 py-3 bg-white w-full danger">
        <mat-icon class="small">warning</mat-icon>
        <span class="text-xs">
          هذا المنتج غير متوفر حالياً. أضفه إلى المفضلة ليصلك إشعار عند توفره.
        </span>
      </div>

      }

  `,
  styles: ``,
  host:{
    class:'block',

  },
})
export class StockStatus {
  inStock = input(false);
}
