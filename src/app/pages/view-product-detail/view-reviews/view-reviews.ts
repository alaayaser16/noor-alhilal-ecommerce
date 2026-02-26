import { EcommerceStore } from './../../../ecommerce-store';
import { MatButton } from '@angular/material/button';
import { RatingSummary } from './../rating-summary/rating-summary';
import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../../models/products';
import { ViewReviewItem } from "../view-review-item/view-review-item";
import { WriteReview } from "../write-review/write-review";

@Component({
  selector: 'app-view-reviews',
  imports: [RatingSummary, ViewReviewItem, MatButton, WriteReview],
  template: `
    <div class="mt-10 space-y-8">

      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">
        تقييمات العملاء
      </h2>
      @if(store.user()){

        <button matButton="filled" (click)="store.showWriteReview()">اكتب تقييمك</button>
      }
      </div>

      @if(store.showReview()){
        <app-write-review class="mb-6"></app-write-review>
      }


      <app-rating-summary [product]="product()"></app-rating-summary>

      @if(sortedReviews().length === 0){
        <div class="text-center text-gray-500 py-10">
          لا توجد تقييمات حتى الآن
        </div>
      } @else {
        <div class="space-y-6">
          @for (review of sortedReviews(); track review.id) {
            <app-view-review-item [review]="review"></app-view-review-item>
          }
        </div>
      }

    </div>
  `
})
export class ViewReviews {

  product = input.required<Product>();
  store = inject(EcommerceStore);

  sortedReviews = computed(() => {
    const reviews = this.product().reviews ?? [];
    return [...reviews].sort(
      (a, b) => new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime()
    );
  });
}
