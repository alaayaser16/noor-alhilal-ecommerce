import { ToggleWishlistButton } from '../../components/toggle-wishlist-button/toggle-wishlist-button';
import { MatIconButton, MatButton } from '@angular/material/button';
import { EcommerceStore } from '../../ecommerce-store';
import { Component, inject } from '@angular/core';
import { BackButton } from "../../components/back-button/back-button";
import { ProductCard } from "../../components/product-card/product-card";
import { MatIconModule } from "@angular/material/icon";
import { EmptyWishlist } from "./empty-wishlist/empty-wishlist";

@Component({
  selector: 'app-my-whishlist',
  imports: [BackButton, ProductCard, MatIconModule, MatIconButton, EmptyWishlist, MatButton],
  template: `
    <div class="mx-auto max-w-[1200px] py-6 px-4">
      <app-back-button class="mb-6"  navigateTo="/products/الكل"> متابعة التسوق</app-back-button>
      @if(store.wishlistCount() > 0){
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold">قائمة المفضلة</h1>
          <span class="text-gray-500 text-xl">{{store.wishlistCount()}} عناصر</span>
        </div>

        <div class="responsive-grid">
          @for(product of store.wishlistItems(); track product.id ){
            <app-product-card [product]="product">
              <button
                  class="!absolute top-3 right-3 z-10 !bg-white rounded-full border-0 items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-lg shadow-md flex"
                  matIconButton
                  (click)="store.removeFromWishlist(product)"
                  >
                  <mat-icon >delete</mat-icon>

              </button>
            </app-product-card>

          }

        </div>

        <div class= "mt-8 flex justify-center">
          <button matButton="outlined" class="danger" (click)="store.clearWishlist()">
            احذف الكل
          </button>
        </div>

      }@else {
        <app-empty-wishlist></app-empty-wishlist>
      }

    </div>
  `,
  styles: ``,
})
export default class MyWhishlist {
  store = inject(EcommerceStore)

}
