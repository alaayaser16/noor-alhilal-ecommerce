import { ProductInfo } from './product-info/product-info';
import { EcommerceStore } from './../../ecommerce-store';
import { Component, computed, effect, inject, input } from '@angular/core';
import { BackButton } from "../../components/back-button/back-button";
import { ViewReviews } from './view-reviews/view-reviews';
import { WriteReview } from './write-review/write-review';
@Component({
  selector: 'app-view-product-detail',
  imports: [BackButton , ProductInfo, ViewReviews],
  template: `
    <div class="mx-auto max-w-[1200px] py-6">
      <app-back-button class="mb-6" [navigateTo]="backRoute()">متابعة التسوق</app-back-button>
      @if(store.selectedProduct(); as product){
        <div class="flex gap-8 mb-8">
          <img [src]="product.imageUrl" class="w-[500px] h-[550px] object-cover rounded-lg" [style.view-transition-name]="'product-image-'+ product.id">
          <div class="flex-1">
            <app-product-info [product]="product"></app-product-info>

          </div>

        </div>
        <app-view-reviews [product]="product"></app-view-reviews>
      }

    </div>
  `,
  styles: ``,
})
export default class ViewProductDetail {
  productId = input.required<string>();
  store= inject(EcommerceStore);

  constructor(){
  effect(() => {
    this.store.setProductId(this.productId());
  });
}

  backRoute = computed(()=> `/products/${this.store.category()}`);
}
