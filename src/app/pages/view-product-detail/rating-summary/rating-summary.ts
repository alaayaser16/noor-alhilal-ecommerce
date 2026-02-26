import { StarRating } from './../../../components/star-rating/star-rating';
import { Component, computed, input } from '@angular/core';
import { Product } from '../../../models/products';

@Component({
  selector: 'app-rating-summary',
  imports: [StarRating],
  template: `
    <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">

      <div class="flex flex-col md:flex-row gap-10">

        <!-- Average Rating -->
        <div class="flex flex-col items-center justify-center min-w-[180px]">

          <div class="text-5xl font-bold text-gray-900">
            {{ product().rating.toFixed(1) }}
          </div>

          <app-star-rating
            class="my-2"
            [rating]="product().rating">
          </app-star-rating>

          <div class="text-sm text-gray-500">
            {{ totalReviews() }} تقييم
          </div>

        </div>

        <!-- Breakdown -->
        <div class="flex-1 space-y-3">

          @for (item of ratingBreakdown(); track item.stars) {
            <div class="flex items-center gap-3 text-sm">

              <span class="w-10 text-gray-600">
                {{ item.stars }} نجوم
              </span>

              <div class="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  class="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                  [style.width.%]="item.percentage">
                </div>
              </div>

              <span class="w-10 text-right text-gray-600">
                {{ item.count }}
              </span>

            </div>
          }

        </div>

      </div>
    </div>
  `
})
export class RatingSummary {
  product = input.required<Product>();

  totalReviews = computed(() => (this.product().reviews ?? []).length);

  ratingBreakdown = computed(() => {
    const reviews = this.product().reviews ?? [];
    const total = reviews.length;

    return [5,4,3,2,1].map(stars => {
      const count = reviews.filter(r => r.rating === stars).length;
      return {
        stars,
        count,
        percentage: total ? Math.round((count / total) * 100) : 0
      };
    });
  });
}
