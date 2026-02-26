import { Component, inject } from '@angular/core';
import { EcommerceStore } from '../../../ecommerce-store';
import { ShowCartItem } from "../../show-cart-item/show-cart-item";

@Component({
  selector: 'app-list-cart-items',
  imports: [ShowCartItem],
  template: `
    @if(store.cartCount() > 0){
      <div class="flex flex-col gap-6">
        @for(item of store.cartItems(); track item.product.id){
          <app-show-cart-item [item]="item"></app-show-cart-item>
        }
      </div>
    } @else {
      <p class="text-gray-500 text-lg">السلة فارغة</p>
    }
  `
})
export class ListCartItems {
  store = inject(EcommerceStore);
}
