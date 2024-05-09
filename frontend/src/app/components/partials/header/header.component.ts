import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/services/cart.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  load: any;
  datos: any;
  loadItems:any;
  countCart:number = 0;

  constructor( private local: LocalstorageService, private cart:CartService) {  
    this.load= sessionStorage.getItem('isLoad');
    let datosSesion= sessionStorage.getItem('user');
    this.datos= JSON.parse(datosSesion || '{}');
  }

  ngOnInit(): void {
    this.getCartItems();
    }

  logout() {
    sessionStorage.clear();
  
    window.location.reload();
  }

  reloadPage() {
    if (sessionStorage.getItem('isLoad') !== 'false') {
      sessionStorage.setItem('isLoad', 'false');
      window.location.reload();
    }
  }



  getCartItems() {
   this.cart.getCartObservable().subscribe((cart) => {
      this.loadItems = cart;
      this.countCart = this.loadItems.totalCount;
     
      
    });

  }
}
