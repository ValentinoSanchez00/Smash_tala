import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ClientesService } from './../../../services/clientes.service';
import { CartModule } from 'src/app/shared/models/cart.module';
import { PedidoService } from 'src/app/services/pedido.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


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
  usarDireccionGuardada: boolean = false;
  validate: boolean = false;


  metodoPago: string = '';
  direccionEnvio: any = '';
  constructor(private cartService: CartService, private clientesService: ClientesService, private pedidoService: PedidoService, private router: Router) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });

    let user = sessionStorage.getItem('user');
    if (user) {
      this.id_cliente = JSON.parse(user).id_cliente;
    }

    this.clientesService.getCasaClientes(this.id_cliente).subscribe((data) => {
      this.direcciones = data;
    });
  }

  checkInputs(): void {
    if (this.direccionEnvio.trim() !== ''&& this.metodoPago.trim() !== '') {
      this.validate = true;
    } else {
      this.validate = false;
    }
}


placeOrder() {
  let pedido = {
    id_cliente: this.id_cliente,
    direccion: this.direccionEnvio,
    tipo_pago: this.metodoPago,
    contenido: this.cart,
  }
  this.pedidoService.crearPedido(pedido).subscribe((data) => {
    
    if (data) {
      this.cartService.clearCart();
      Swal.fire({
        title: 'Pedido realizado con éxito',
        text: 'El pedido se entregará en el tiempo estimado. Haz clic en el botón para volver a la página de inicio',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'Ir a Home'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/home']);
        }
      });
    }
  });
}

}
