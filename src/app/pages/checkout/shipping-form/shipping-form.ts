import { Component } from '@angular/core';
import { ViewPanel } from "../../../directives/view-panel";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-shipping-form',
  imports: [ViewPanel, MatIconModule, MatButtonModule, MatFormField, MatInputModule],
  template: `
  <div appViewPanel>
    <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
      <mat-icon>local_shipping</mat-icon>بيانات الشحن
    </h2>
    <form class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <mat-form-field>
        <input matInput type="text" placeholder="الاسم الأول">
      </mat-form-field>

      <mat-form-field>
        <input matInput type="text" placeholder="اسم العائلة">
      </mat-form-field>
      <mat-form-field class="col-span-2">
        <textarea matInput type="text" placeholder="العنوان"></textarea>
      </mat-form-field>
      <mat-form-field>
        <input matInput type="text" placeholder="المحافظة">
      </mat-form-field>
      <mat-form-field>
        <input matInput type="text" placeholder="الدولة">
      </mat-form-field>
      <mat-form-field class="col-span-2">
        <input matInput type="text" placeholder="الرمز البريدي">
      </mat-form-field>
    </form>
  </div>


  `,
  styles: ``,
})
export class ShippingForm {

}
