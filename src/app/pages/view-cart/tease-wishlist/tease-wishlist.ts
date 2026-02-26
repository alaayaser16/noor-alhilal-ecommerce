import { MatButton } from '@angular/material/button';
import { Component, inject } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { ViewPanel } from '../../../directives/view-panel';
import { EcommerceStore } from '../../../ecommerce-store';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-tease-wishlist',
  imports: [ViewPanel,MatIconModule, RouterLink,MatButton],
  template: `
    <div appViewPanel class="flex items-center justify-between">
      <div class="flex items-center gap-3">
          <mat-icon class="!text-red-500">favorite_border</mat-icon>
          <div>
            <h2 class="text-xl font-bold">المفضلة ({{store.wishlistCount()}})</h2>
            <p class="text-gray-500 text-sm">لديك {{store.wishlistCount()}} عناصر محفوظة لوقت لاحق</p>
          </div>
      </div>
      <div class="flex items-center gap-3">
        <button matButton routerLink="/whishlist">عرض الكل</button>
        <button matButton="filled" class="flex items-center gap-2"(click)="store.addAllWishlistToCart()">
          <mat-icon>shopping_cart</mat-icon>
          إضافة الكل إلى السلة
        </button>

      </div>
    </div>
  `,
  styles: ``,
})
export class TeaseWishlist {
  store = inject(EcommerceStore)

}
