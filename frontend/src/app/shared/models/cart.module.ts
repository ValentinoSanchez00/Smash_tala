import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemModule } from './cart-item.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CartModule {
  items: CartItemModule[] = [];
  totalPrice: number = 0;
  totalCount: number = 0;
 }
