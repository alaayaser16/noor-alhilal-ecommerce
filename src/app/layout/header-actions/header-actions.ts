import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatBadge } from '@angular/material/badge';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule, NgIf } from '@angular/common';
import { SignInDialog } from '../../components/sign-in-dialog/sign-in-dialog';
import { SignUpDialog } from '../../components/sign-up-dialog/sign-up-dialog';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-header-actions',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatBadge,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatDividerModule,
    CommonModule,
    NgIf
  ],
  template: `
    <div class="flex items-center gap-3">

      <!-- Wishlist -->
      <button mat-icon-button routerLink="/whishlist"
        [matBadge]="store.wishlistCount()"
        [matBadgeHidden]="store.wishlistCount() === 0"
        matTooltip="المفضلة" class="!w-10 !h-10">
        <mat-icon class="text-rose-500">favorite</mat-icon>
      </button>

      <!-- Cart -->
      <button mat-icon-button routerLink="/cart"
        [matBadge]="store.cartCount()"
        [matBadgeHidden]="store.cartCount() === 0"
        matTooltip="عربة التسوق" class="!w-10 !h-10">
        <mat-icon class="text-emerald-600">shopping_cart</mat-icon>
      </button>

      <!-- User Auth -->
      <ng-container *ngIf="store.user() as user; else guestActions">
        <button mat-icon-button [matMenuTriggerFor]="userMenu" matTooltip="الحساب">
          <img [src]="user.imageUrl" [alt]="user.name" class="w-8 h-8 rounded-full border border-gray-200">
        </button>
        <mat-menu #userMenu="matMenu" xPosition="before">
          <div class="flex flex-col px-3 py-2 min-w-[200px]">
            <span class="text-sm font-medium">{{user.name}}</span>
            <span class="text-xs text-gray-500">{{user.email}}</span>
          </div>
          <mat-divider></mat-divider>
          <button mat-menu-item (click)="store.signOut()">
            <mat-icon>logout</mat-icon> تسجيل الخروج
          </button>
        </mat-menu>
      </ng-container>

      <ng-template #guestActions>
        <button matButton class="px-4 py-1 text-sm" (click)="openSignInDialog()"> تسجيل الدخول </button>
        <button matButton="filled" class="px-4 py-1 text-sm bg-yellow-400 text-white hover:bg-yellow-500 transition" (click)="openSignUpDialog()"> إنشاء حساب </button>

      </ng-template>
    </div>
  `,
  styles: [`
    button[mat-button] {
      border-radius: 8px;
      font-weight: 600;
    }
    mat-icon {
      font-size: 24px;
    }
    mat-toolbar {
      background: white;
      border-bottom: 1px solid #eee;
      padding: 0 16px;
    }
  `]
})
export class HeaderActions {
  store = inject(EcommerceStore);
  matDialog = inject(MatDialog);
  router = inject(Router);

  openSignInDialog() {
    this.matDialog.open(SignInDialog, { disableClose: true });
  }

  openSignUpDialog() {
    this.matDialog.open(SignUpDialog, { disableClose: true });
  }
}
