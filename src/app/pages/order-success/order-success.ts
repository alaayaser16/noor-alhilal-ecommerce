import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-order-success',
  imports: [MatButton, MatIcon, RouterLink],
  template: `
    <div class="flex justify-center items-center h-[calc(100vh-64px)] py-6">
      <div
      class="flex flex-col items-center justify-center text-center bg-white rounded-xl shadow p-8 gap-6">
      <mat-icon class="!text-green-500 !h-[56px] !w-[56px]">check_circle</mat-icon>
      <h2 class="font-semibold text-green-600 text-2xl font-bold">تم تأكيد طلبك بنجاح 🎉</h2>
      <p class="text-base">
        شكرًا لثقتك بنا، تم تأكيد طلبك وسيتم شحنه قريبًا.
      </p>
      <p class="text-gray-600">
        سيصلك بريد إلكتروني يحتوي على تفاصيل الطلب ومعلومات التتبع.
      </p>
      <button matButton="filled" color= "primary" class="w-full max-w-xs mt-2" routerLink="/">متابعة التسوق</button>
    </div>
  `,
  styles: ``,
})
export default class OrderSuccess {

}
