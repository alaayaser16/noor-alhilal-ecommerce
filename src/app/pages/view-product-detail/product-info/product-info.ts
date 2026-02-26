import { StockStatus } from './../stock-status/stock-status';
import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../../../models/products';
import { TitleCasePipe } from '@angular/common';
import { QuantitySelector } from "../../../components/quantity-selector/quantity-selector";
import { MatIcon } from "@angular/material/icon";
import { ToggleWishlistButton } from '../../../components/toggle-wishlist-button/toggle-wishlist-button';
import { MatIconButton, MatButton } from '@angular/material/button';
import { EcommerceStore } from '../../../ecommerce-store';
import { StarRating } from "../../../components/star-rating/star-rating";

@Component({
  selector: 'app-product-info',
  imports: [
    TitleCasePipe,
    StockStatus,
    QuantitySelector,
    MatIcon,
    ToggleWishlistButton,
    MatIconButton,
    StarRating
],
  template: `
    <div class="text-xs rounded-full bg-gray-100 px-3 py-1 w-fit mb-3 font-medium text-gray-600">
      {{product().category | titlecase}}
    </div>

    <h1 class="text-3xl font-bold mb-2">
      {{product().name}}
    </h1>
    <app-star-rating class="mb-3 block" [rating]="product().rating">{{product().rating}} ({{product().reviewCount}} تقييم)</app-star-rating>
    <p class="text-3xl font-extrabold text-primary mb-4">
      {{product().price}} ج.م
    </p>

    <app-stock-status
      class="mb-4"
      [inStock]="product().inStock">
    </app-stock-status>

    <p class="font-semibold mb-2">الوصف</p>
    <p class="text-gray-600 border-b border-gray-200 pb-4 leading-relaxed">
      {{product().description}}
    </p>

    <div class="flex items-center gap-4 mb-4 pt-4">
      <span class="font-semibold">الكمية</span>
      <app-quantity-selector
        [quantity]="quantity()"
        (quantityUpdated)="quantity.set($event)">
      </app-quantity-selector>
    </div>

    <div class="flex gap-4 items-center">
      <button
        mat-flat-button
        class="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg
              bg-blue-600 text-white hover:bg-blue-700 transition"
        (click)="store.addToCart(product(), quantity())"
        [disabled]="!product().inStock">

        <mat-icon>shopping_cart</mat-icon>
        {{product().inStock ? 'إضافة إلى السلة' : 'غير متوفر حالياً'}}
      </button>

      <app-toggle-wishlist-button
        [product]="product()">
      </app-toggle-wishlist-button>

      <button mat-icon-button>
        <mat-icon>share</mat-icon>
      </button>
    </div>
    <div class="pt-6 flex flex-col gap-2 text-gray-700 text-xs">
      <div class="flex items-center gap-3">
        <mat-icon class="small">local_shipping</mat-icon>
        <span>شحن مجاني للطلبات فوق 5000 ج.م</span>
      </div>
      <div class="flex items-center gap-3">
        <mat-icon class="small">autorenew</mat-icon>
        <span>إمكانية الاسترجاع خلال 30 يوم</span>
      </div>
      <div class="flex items-center gap-3">
        <mat-icon class="small">shield</mat-icon>
        <span>ضمان لمدة سنتين</span>
      </div >
    </div>
  `,
})
export class ProductInfo {
  product = input.required<Product>();
  store = inject(EcommerceStore);
  quantity = signal(1);
}
