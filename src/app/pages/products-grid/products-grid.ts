import { Component, computed, input, signal, provideBrowserGlobalErrorListeners, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductCard } from "../../components/product-card/product-card";
import { Product } from '../../models/products';
import { MatSidenavContainer , MatSidenavContent , MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { EcommerceStore } from '../../ecommerce-store';
import { effect } from '@angular/core';
import { ToggleWishlistButton } from "../../components/toggle-wishlist-button/toggle-wishlist-button";
@Component({
  selector: 'app-products-grid',
  imports: [ProductCard, MatSidenavContainer, MatSidenavContent, MatSidenav, MatNavList, MatListItem, MatListItemTitle, RouterLink, TitleCasePipe, ToggleWishlistButton],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
  <mat-sidenav-container >
    <mat-sidenav mode="side" [opened]="true" >
      <div class="p-6">
        <h2 class="text-lg text-gray-900">الفئة</h2>
        <mat-nav-list>
          @for (cat of categories(); track cat) {
            <mat-list-item [activated]="cat === category()" class="my-2" [routerLink]="['/products',cat]">
              <span matListItemTitle class="font-medium " [class]="cat === category() ? '!text-white' : null">
                {{cat}}
              </span>

            </mat-list-item>

          }

        </mat-nav-list>
      </div>
    </mat-sidenav>
    <mat-sidenav-content class="bg-gray-100 p-6 h-full ">
      <h1 class="text-2xl font-bold text-gray-900 mb-1 capitalize">{{category() | titlecase}}</h1>
      <p class="text-base text-gray-600 mb-6">{{store.filteredProducts().length}} منتجات</p>
      <div class="responsive-grid p-6">
        @for (product of store.filteredProducts(); track product.id) {
        <app-product-card [product]="product" >
          <app-toggle-wishlist-button class="!absolute z-10 top-3 right-3 !bg-white shadow-md rounded-md transition-all duration-200 hover:scale-110 hover:shadow-lg" [product]="product" [style.view-transition-name]="'wishlist-button-'+product.id"></app-toggle-wishlist-button>
        </app-product-card>
      }
    </div>
    </mat-sidenav-content>
  </mat-sidenav-container>
    <div class="bg-gray-100 p-6 h-full">

    </div>

  `,
  styles: ``,
})
export default class ProductsGrid {
toggleWishlist(arg0: any) {
throw new Error('Method not implemented.');
}
isInWishlist() {
throw new Error('Method not implemented.');
}
  category = input<string>('الكل');

  store = inject(EcommerceStore);

  categories = signal<string[]>(['الكل', 'زينة وفوانيس', 'مستلزمات السفرة', 'مذاق رمضان','هدايا رمضانية']);
  constructor() {
  effect(() => {
    this.store.setCategory(this.category());
  });
  }}
