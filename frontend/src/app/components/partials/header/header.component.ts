import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  ver: boolean = false;
  load: any;
  datos: any;
  loadItems: any;
  countCart: number = 0;

  constructor(private cart: CartService, private router: Router) {
    this.load = sessionStorage.getItem('isLoad');
    this.ver = this.load === 'true';


    let datosSesion = sessionStorage.getItem('user') || '{}';
    this.datos = JSON.parse(datosSesion);

  }

  ngOnInit(): void {
    this.getCartItems();
  }

  logout() {
    sessionStorage.setItem('isLoad', 'false');
    sessionStorage.setItem('user', '{}');
    this.ver = false;
    this.router.navigate(['/login']);
  }

  getCartItems() {
    this.cart.getCartObservable().subscribe((cart) => {
      this.loadItems = cart;
      this.countCart = this.loadItems.totalCount;
    });
  }
}
