# Fix Code Issues - Todo List

## Issues to Fix:

### 1. products-grid.ts
- [ ] Fix template to show product name, price, rating, stock status, description
- [ ] Fix filteredProducts computed to handle 'all' category
- [ ] Add proper imports for RouterLink, CurrencyPipe

### 2. app.ts
- [ ] Remove direct usage of ProductsGrid component (since it's loaded via router)
- [ ] Keep only router-outlet for routing

## Priority:
1. Fix app.ts - Remove duplicate ProductsGrid rendering
2. Fix products-grid.ts - Add missing product details and fix category filter
