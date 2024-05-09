import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hamburguer } from './Food';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CartItemModule {
  constructor(public food:Hamburguer){ 
  }

  quantity:number=1;
  price:number=this.food.valor;
  
 }
