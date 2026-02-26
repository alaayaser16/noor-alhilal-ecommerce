import { appConfig } from './../../app.config';
import { EcommerceStore } from './../../ecommerce-store';
import { SignInParams } from './../../models/user';
import { MatIconButton, MatButton } from '@angular/material/button';
import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import {MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef} from '@angular/material/dialog'
import { NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { SignUpDialog } from '../sign-up-dialog/sign-up-dialog';

@Component({
  selector: 'app-sign-in-dialog',
  imports: [MatIconModule, MatIconButton, MatDialogClose, MatFormField, MatPrefix, MatSuffix, MatInputModule, ReactiveFormsModule , MatButton],
  template: `
    <div class="p-8 max-w-[400px] flex flex-col">
      <div class="flex justify-between">
        <div>
          <h2 class="text-xl font-medium mb-1">تسجيل الدخول</h2>
          <p class="text-sm text-gray-500">سجل دخولك للوصول إلى حسابك ومتابعة طلباتك</p>
        </div>
        <button tabindex="-1" matIconButton class="-mt-2 -m-2" mat-dialog-close>
          <mat-icon>close</mat-icon>
        </button>

      </div>
      <form class="mt-6" [formGroup]="signInForm" (ngSubmit) = "signIn()">
        <mat-form-field class="w-full mb-4">
          <input matInput formControlName="email" autocomplete="email" placeholder="أدخل بريدك الإلكترونى">
          <mat-icon matPrefix>email</mat-icon>
        </mat-form-field>

        <mat-form-field class="w-full mb-6 ">
          <input
          matInput
          formControlName="password"
          type="password"
          autocomplete="current-password"
          [type]="passwordVisible()?'text':'password'"
          placeholder="أدخل كلمة المرور"
          >
          <mat-icon matPrefix >lock</mat-icon>
          <button
          matSuffix
          matIconButton
          type="button"
          class="m-2"
          (click) = "passwordVisible.set(!passwordVisible())"
            >
            <mat-icon [fontIcon]="passwordVisible() ? 'visibility_off' : 'visibility'"></mat-icon>
        </button>
        </mat-form-field>
        <button type="submit" matButton="filled" class="w-full">تسجيل الدخول</button>

      </form>

      <p class="text-sm text-gray-500 mt-2 text-center">
        ليس لديك حساب؟
        <a class="text-blue-600 cursor-pointer" (click)="openSignUpDialog()">إنشاء حساب جديد</a>
      </p>

    </div>
  `,
  styles: ``,
})
export class SignInDialog {
passwordVisible= signal(false)
  fb = inject(NonNullableFormBuilder)
  store = inject(EcommerceStore)

  matDialog = inject(MatDialog)


  data = inject<{checkout:boolean}>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);

  signInForm = this.fb.group({
    email:['', Validators.required],
    password:['',Validators.required]
  })


  signIn(){
    if(!this.signInForm.valid){
      this.signInForm.markAllAsTouched();
      return;
    }
    const {email , password} = this.signInForm.value;
    this.store.signIn({email,password,checkout:this.data?.checkout , dialogId: this.dialogRef.id} as SignInParams);
  }

  openSignUpDialog(){
    this.dialogRef.close();
    this.matDialog.open(SignUpDialog,{
      disableClose:true,
      data:{
        checkout:this.data?.checkout,
      }
    })
  }

}
