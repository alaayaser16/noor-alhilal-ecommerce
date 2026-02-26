import { ViewPanel } from './../../../directives/view-panel';
import { Component, input } from '@angular/core';
import { UserReview } from '../../../models/user-review';
import { StarRating } from "../../../components/star-rating/star-rating";
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-view-review-item',
  imports: [StarRating, DatePipe, MatButtonModule],
  template: `
    <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">

      <div class="flex items-start gap-4">

        <img
          [src]="review().userImageUrl"
          [alt]="review().userName"
          class="w-12 h-12 rounded-full object-cover"
        />

        <div class="flex-1">

          <!-- Header -->
          <div class="flex justify-between items-center mb-2">

            <div>
              <div class="font-semibold text-gray-900">
                {{ review().userName }}
              </div>

              <div class="text-xs text-gray-500">
                {{ review().reviewDate | date:'d MMM yyyy' }}
              </div>
            </div>

            <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              شراء موثق
            </span>

          </div>

          <!-- Stars -->
          <app-star-rating
            class="mb-2"
            [rating]="review().rating">
          </app-star-rating>

          <!-- Title -->
          <div class="font-semibold text-gray-800 mb-1">
            {{ review().title }}
          </div>

          <!-- Comment -->
          <div class="text-sm text-gray-600 leading-relaxed mb-3">
            {{ review().comment }}
          </div>

          <!-- Helpful Button -->
          <button mat-stroked-button class="text-xs">
            👍 هل كان هذا التقييم مفيد؟
          </button>

        </div>
      </div>

    </div>
  `
})
export class ViewReviewItem {
  review = input.required<UserReview>();
}
