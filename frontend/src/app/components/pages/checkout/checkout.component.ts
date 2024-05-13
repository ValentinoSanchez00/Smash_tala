import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ClientesService } from './../../../services/clientes.service';
import { CartModule } from 'src/app/shared/models/cart.module';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cart!: CartModule;
  id_cliente!: any;
  pedido!: any;
  direcciones: any[] = [];
  direccionEnvio: any = '';
  metodoEnvio: string = '';
  metodoPago: string = '';
  usarDireccionGuardada: boolean = false; // Variable para controlar la visibilidad del input y el select

  constructor(private cartService: CartService, private clientesService: ClientesService) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
      console.log(this.cart);
    });

    let user = sessionStorage.getItem('user');
    if (user) {
      this.id_cliente = JSON.parse(user).id_cliente;
      console.log(this.id_cliente);
    }

    this.clientesService.getCasaClientes(this.id_cliente).subscribe((data) => {
      this.direcciones = data;
      console.log(this.direcciones);
    });
  }


}
