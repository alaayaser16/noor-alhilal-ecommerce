import { EcommerceStore } from './../../ecommerce-store';
import { Component, computed, inject } from '@angular/core';
import { ViewPanel } from '../../directives/view-panel';

@Component({
  selector: 'app-summarize-order',
  imports: [ViewPanel],
  template: `
    <div appViewPanel>
      <h2 class="text-2xl font-bold mb-4">ملخص الطلب</h2>
      <div class="space-y-2 pb-4">
        <ng-content select=[checkoutItems]></ng-content>
      </div>
      <div class="space-y-3 text-lg pt-4 border-t">
        <div class="flex justify-between">
          <span>إجمالي المنتجات</span>
          <span>{{subtotal()}} ج.م</span>

        </div>
        <div class="flex justify-between">
          <span>الضريبة</span>
          <span>{{tax()}} ج.م</span>

        </div>
        <div class="flex justify-between border-t pt-3 font-bold text-lg">
          <span>الإجمالى الكلى</span>
          <span>{{total()}} ج.م</span>

        </div>
      </div>
      <ng-content select="[actionButtons]"></ng-content>
    </div>
  `,
  styles: ``,
})
export class SummarizeOrder {
  store=inject(EcommerceStore)

  subtotal = computed(()=>
    Math.round(this.store.cartItems().reduce((acc,item)=>acc+ item.product.price * item.quantity,0)))

  tax = computed(() =>Math.round( 0.05 * this.subtotal()));
  total = computed(()=>Math.round(this.subtotal() + this.tax()))

}
