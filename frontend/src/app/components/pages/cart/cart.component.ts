import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartModule } from 'src/app/shared/models/cart.module';
import { CartItemModule } from 'src/app/shared/models/cart-item.module';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartPageComponent implements OnInit {
  cart!: CartModule;
  constructor(private cartService: CartService, private Router: Router) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
   }

  ngOnInit(): void {
    this.comprobar();
  }
   comprobar(){
    let isLoaded = sessionStorage.getItem('isLoad');
    console.log(isLoaded);

    if(isLoaded === null || isLoaded === 'false') {
      this.Router.navigate(['/home']);
    }

  }


  removeFromCart(cartItem:CartItemModule){
    this.cartService.removeFromCart(cartItem.food.id_hamburguesa);
  }

  changeQuantity(cartItem:CartItemModule,quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeCuantity(cartItem.food.id_hamburguesa, quantity);
  }

}