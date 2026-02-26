  import { Component, inject, signal } from '@angular/core';
  import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
  import { MatButton, MatIconButton } from '@angular/material/button';
  import { MatDialogClose, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
  import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
  import { MatIconModule } from '@angular/material/icon';
  import { MatInputModule } from '@angular/material/input';
  import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';
  import { SignUpParams } from '../../models/user';
  import { EcommerceStore } from '../../ecommerce-store';

  @Component({
    selector: 'app-sign-up-dialog',
    imports: [
      MatIconModule,
      MatIconButton,
      MatDialogClose,
      MatFormField,
      MatPrefix,
      MatSuffix,
      MatInputModule,
      ReactiveFormsModule,
      MatButton
    ],
    template: `
      <div class="p-8 min-w-[420px] flex flex-col bg-white rounded-2xl">

        <div class="flex justify-between items-start">
          <div>
            <h2 class="text-2xl font-bold mb-1">إنشاء حساب جديد</h2>
            <p class="text-sm text-gray-500">أنشئ حسابك الآن لتتمكن من التسوق بسهولة ومتابعة طلباتك</p>
          </div>

          <button mat-icon-button mat-dialog-close>
            <mat-icon>close</mat-icon>
          </button>
        </div>

        <form [formGroup]="signUpForm"
              class="mt-6 flex flex-col"
              (ngSubmit)="signUp()"

              >

          <!-- Name -->
          <mat-form-field appearance="outline" class="mb-4 w-full">
            <mat-icon matPrefix>person</mat-icon>
            <input formControlName="name"
                  matInput
                  autocomplete="new-name"
                  placeholder="الاسم الكامل">
          </mat-form-field>

          <!-- Email -->
          <mat-form-field appearance="outline" class="mb-4 w-full">
            <mat-icon matPrefix>email</mat-icon>
            <input formControlName="email"
                  matInput
                  type="email"
                  autocomplete="new-email"
                  placeholder=" البريد الإلكترونى">
          </mat-form-field>

          <!-- Password -->
          <mat-form-field appearance="outline" class="mb-4 w-full">
            <mat-icon matPrefix>lock</mat-icon>
            <input formControlName="password"
                  matInput
                  autocomplete="new-password"
                  [type]="hidePassword() ? 'password' : 'text'"
                  placeholder=" كلمة المرور">

            <button mat-icon-button
                    matSuffix
                    type="button"
                    class="ml-2"
                    (click)="hidePassword.set(!hidePassword())">
              <mat-icon>
                {{ hidePassword() ? 'visibility_off' : 'visibility' }}
              </mat-icon>
            </button>
          </mat-form-field>

          <!-- Confirm Password -->
          <mat-form-field appearance="outline" class="mb-6 w-full">
            <mat-icon matPrefix>lock</mat-icon>
            <input formControlName="confirmPassword"
                  matInput
                  [type]="hideConfirm() ? 'password' : 'text'"
                  placeholder="تأكيد  كلمة المرور">

            <button mat-icon-button
                    matSuffix
                    type="button"
                    class="ml-2"
                    (click)="hideConfirm.set(!hideConfirm())">
              <mat-icon>
                {{ hideConfirm() ? 'visibility_off' : 'visibility' }}
              </mat-icon>
            </button>
          </mat-form-field>
          <div class="mb-4">
            <label class="block mb-2 font-medium">صورة الحساب</label>
            <input type="file"
                  accept="image/*"
                  (change)="onImageSelected($event)"
                  class="block w-full text-sm" />
          </div>

          @if(previewImage()){
            <img [src]="previewImage()"
                class="w-20 h-20 rounded-full object-cover mt-2">
}

          <!-- Submit -->
          <button
            type="submit"
            mat-flat-button ="filled"
            class="w-full py-3 text-base font-semibold rounded-xl  bg-blue-600 text-white hover:bg-blue-700 transition"
            [disabled]="signUpForm.invalid">
            إنشاء الحساب
          </button>

        </form>

        <p class="text-sm text-gray-500 mt-4 text-center">
          هل لديك حساب بالفعل؟
          <a class="text-blue-600 font-medium cursor-pointer"
            (click)="openSignInDialog()">
            تسجيل الدخول
          </a>
        </p>

      </div>
    `,
  })
  export class SignUpDialog {

    fb = inject(NonNullableFormBuilder);
    dialogRef = inject(MatDialogRef);
    store = inject(EcommerceStore);
    matDialog = inject(MatDialog);
    data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);

    hidePassword = signal(true);
    hideConfirm = signal(true);

    signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
      );

    signUp() {
      if (!this.signUpForm.valid) {
        this.signUpForm.markAllAsTouched();
        return;
      }

      const { name, email, password } = this.signUpForm.getRawValue();

      this.store.signUp({
        name,
        email,
        password,
        dialogId: this.dialogRef.id,
        imageUrl: this.selectedImageBase64 || undefined,
        checkout: this.data?.checkout
      } as SignUpParams);
    }

    openSignInDialog() {
      this.dialogRef.close();
      this.matDialog.open(SignInDialog, {
        disableClose: true,
        data: {
          checkout: this.data?.checkout,
        }
      });
    }

    previewImage = signal<string | null>(null);
selectedImageBase64: string | null = null;

onImageSelected(event: Event) {
  const input = event.target as HTMLInputElement;

  if (!input.files || input.files.length === 0) return;

  const file = input.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    this.selectedImageBase64 = reader.result as string;
    this.previewImage.set(this.selectedImageBase64);
  };

  reader.readAsDataURL(file);
}
  }
