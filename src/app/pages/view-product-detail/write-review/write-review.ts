import { EcommerceStore } from './../../../ecommerce-store';
import { ViewPanel } from './../../../directives/view-panel';
import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { OptionItem } from '../../../models/option-item';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-write-review',
  imports: [
    ViewPanel,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  template: `
    <div appViewPanel>
      <h2 class="text-xl font-semibold mb-6">
        اكتب تقييمك
      </h2>

      <form [formGroup]="reviewForm" (ngSubmit)="saveReview()">

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">

          <!-- عنوان التقييم -->
          <mat-form-field appearance="outline">
            <mat-label>عنوان التقييم</mat-label>
            <input
              formControlName="title"
              placeholder="اكتب عنوانًا مختصرًا لتقييمك"
              matInput
              type="text">
          </mat-form-field>

          <!-- التقييم بالنجوم -->
          <mat-form-field appearance="outline">
            <mat-label>عدد النجوم</mat-label>
            <mat-select formControlName="rating">
              @for (option of ratingOptions(); track option.value) {
                <mat-option [value]="option.value">
                  {{ option.label }}
                </mat-option>
              }
            </mat-select>
          </mat-form-field>

          <!-- التعليق -->
          <mat-form-field appearance="outline" class="col-span-2">
            <mat-label>تفاصيل التقييم</mat-label>
            <textarea
              placeholder="شاركنا تجربتك مع هذا المنتج"
              formControlName="comment"
              matInput
              rows="4">
            </textarea>
          </mat-form-field>

        </div>

        <div class="flex gap-4">

          <!-- زر الإرسال -->
          <button
            mat-flat-button
            color="primary"
            type="submit"
            [disabled]="reviewForm.invalid || store.loading()">

            {{ store.loading() ? 'جارٍ الإرسال...' : 'إرسال التقييم' }}

          </button>

          <!-- زر إلغاء -->
          <button
            mat-stroked-button
            type="button"
            (click)="store.hideWriteReview()">

            إلغاء

          </button>

        </div>

      </form>
    </div>
  `,
})
export class WriteReview {

  fb = inject(NonNullableFormBuilder);
  store = inject(EcommerceStore);

  ratingOptions = signal<OptionItem[]>([
    { label: '5 نجوم - ممتاز', value: 5 },
    { label: '4 نجوم - جيد جدًا', value: 4 },
    { label: '3 نجوم - جيد', value: 3 },
    { label: 'نجمتان - مقبول', value: 2 },
    { label: 'نجمة واحدة - ضعيف', value: 1 },
  ]);

  reviewForm = this.fb.group({
    title: ['', Validators.required],
    comment: ['', Validators.required],
    rating: [5, Validators.required],
  });

  saveReview() {
    if (this.reviewForm.invalid) return;

    const reviewData = this.reviewForm.getRawValue();

    this.store.addReview(reviewData);

    this.reviewForm.reset({
      title: '',
      comment: '',
      rating: 5
    });
    
  }
}
