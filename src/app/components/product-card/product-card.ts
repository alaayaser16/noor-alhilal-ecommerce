import { EcommerceStore } from './../../ecommerce-store';
import { Component, input, output, inject } from '@angular/core';
import { Product } from '../../models/products';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { StarRating } from "../star-rating/star-rating";

@Component({
  selector: 'app-product-card',
  imports: [MatButtonModule, MatIconModule, RouterLink, CommonModule, StarRating],
  template: `
    <div
      class="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col h-full">

      <!-- Image -->
      <div class="relative overflow-hidden">
        <img
          [src]="product().imageUrl"
          class="w-full h-[260px] object-cover transition-transform duration-500 group-hover:scale-110"
          [routerLink]="['/product', product().id]"
          [style.view-transition-name]="'product-image-'+product().id"
          />

        <!-- Stock Badge -->
        <div
          class="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full"
          [ngClass]="product().inStock
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'">
          {{ product().inStock ? 'متوفر' : 'غير متوفر' }}
        </div>

        <!-- Quick Add Button (Hover) -->
        <button
          mat-mini-fab
          color="primary"
          class="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition duration-300"
          (click)="addToCart($event)">
          <mat-icon>add_shopping_cart</mat-icon>
        </button>
      </div>

      <!-- Content -->
      <div
        class="p-5 flex flex-col flex-1"
        [routerLink]="['/product', product().id]">

        <h3 class="text-lg font-semibold text-gray-900 mb-1 leading-tight">
          {{ product().name }}
        </h3>

        <p class="text-sm text-gray-500 mb-3 line-clamp-2">
          {{ product().description }}
        </p>

        <!-- Rating -->
        <app-star-rating class="mb-3" [rating]="product().rating">
          ({{ product().reviewCount}})
        </app-star-rating>

        <div class="flex items-center justify-between mt-auto">
          <span class="text-xl font-bold text-gray-900">
            {{ product().price }} ج.م
          </span>

          <button
            mat-flat-button
            color="primary"
            (click)="addToCart($event)"
            [disabled]="!product().inStock">
            <mat-icon>shopping_cart</mat-icon>أضف إلى السلة
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ProductCard {
  product = input.required<Product>();
  store = inject(EcommerceStore);

  stars = Array(5);
  addToCart(event: Event) {
    event.stopPropagation();
    this.store.addToCart(this.product());
  }
}
