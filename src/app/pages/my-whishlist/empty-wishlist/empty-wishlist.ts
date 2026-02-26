import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-empty-wishlist',
  imports: [MatIconModule, MatButtonModule, RouterLink],
  template: `
    <div class="flex flex-col items-center justify-center py-16 text-center">
      <!-- Heart Icon -->
       <div class="w-20 h-20 mb-8 rounded-full bg-gray-100 flex items-center justify-center">
          <mat-icon class="text-gray-400 transform scale-150">favorite_border</mat-icon>
       </div>

      <!--Message-->
      <h2 class="text-2xl font-bold text-gray-900 mb-3">قائمة المفضلة فارغة</h2>
      <p class="text-gray-600 mb-8">احفظ المنتجات التي تعجبك للرجوع إليها لاحقًا</p>
      <button matButton="filled" routerLink="/products/الكل" class="min-w-[1200px]" py-3>
        ابدأ التسوق
      </button>
    </div>
  `,
  styles: ``,
})
export class EmptyWishlist {

}
