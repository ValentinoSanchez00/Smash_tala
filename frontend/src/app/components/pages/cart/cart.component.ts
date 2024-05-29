
import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartModule } from 'src/app/shared/models/cart.module';
import { CartItemModule } from 'src/app/shared/models/cart-item.module';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartPageComponent  {
  cart!: CartModule;
  constructor(private cartService: CartService) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
   }



  removeFromCart(cartItem:CartItemModule){
    this.cartService.removeFromCart(cartItem.food.id_hamburguesa);
  }

  changeQuantity(cartItem:CartItemModule,quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeCuantity(cartItem.food.id_hamburguesa, quantity);
  }

}