import { BehaviorSubject, Observable } from 'rxjs';
import { Hamburguer } from '../shared/models/Food';
import { CartModule } from '../shared/models/cart.module';
import { CartItemModule } from '../shared/models/cart-item.module';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartModule = this.getCartFromLocalStorage();
  private cartSubjet: BehaviorSubject<CartModule> = new BehaviorSubject<CartModule>(this.cart);
  constructor() { }
  addToCart(food: Hamburguer): void {
    let cartItem = this.cart.items.find((item) => item.food.id_hamburguesa === food.id_hamburguesa);
    if (cartItem) {
      return;
  
    } else {
      this.cart.items.push(new CartItemModule(food));
      this.setCartToLocalStorage();
    }

  }


  removeFromCart(foodId: number): void {
    this.cart.items = this.cart.items.filter((item) => item.food.id_hamburguesa != foodId);
    this.setCartToLocalStorage();



  }


changeCuantity(foodId: number, quantity: number) {
  let cartItem = this.cart.items.find((item) => item.food.id_hamburguesa === foodId);
  if (!cartItem) return;
  cartItem.quantity = quantity;
  cartItem.price = quantity * cartItem.food.valor;
  this.setCartToLocalStorage();


}


clearCart() {
  this.cart = new CartModule();
  this.setCartToLocalStorage();

 
}

getCartObservable(): Observable<CartModule> {
  return this.cartSubjet.asObservable();

}

private setCartToLocalStorage(): void {
this.cart.totalPrice = this.cart.items.reduce((prev, curr) => prev + curr.price, 0);  
this.cart.totalCount = this.cart.items.reduce((prev, curr) => prev + curr.quantity, 0);


const cartJSon = JSON.stringify(this.cart);
localStorage.setItem('Cart', cartJSon);
this.cartSubjet.next(this.cart);
}



private getCartFromLocalStorage(): CartModule {
  const cartJson = localStorage.getItem('Cart');

  return cartJson ? JSON.parse(cartJson) : new CartModule();
}


}
