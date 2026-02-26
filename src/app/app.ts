import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import ProductsGrid from './pages/products-grid/products-grid';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header ],
  template: `
    <app-header class="z-10"></app-header>
    <div class="h-[calc(100%-64px) overflow-auto">
      <router-outlet />
    </div>
  `,
  styles: [], 
})
export class App {
  
}
