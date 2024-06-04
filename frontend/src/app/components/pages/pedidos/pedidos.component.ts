import { Router } from '@angular/router';
import { PedidoService } from './../../../services/pedido.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SuccessModalComponent } from '../../partials/success-modal/success-modal.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit, OnDestroy {
  private intervalId: any;
  allPedidos: any;
  pedidosFilter: any;

  constructor(private PedidoService: PedidoService, public dialog: MatDialog, private Router: Router) {}

  ngOnInit(): void {
    this.comprobar();
    this.getPedidos();
    this.intervalId = setInterval(() => {
      this.getPedidos();
    }, 5000);
    //Si va a la nube la bd se activa
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  comprobar(){
    let isLoaded = sessionStorage.getItem('isLoad');
    console.log(isLoaded);

    if(isLoaded === null || isLoaded === 'false') {
      this.Router.navigate(['/home']);
    }
    else{
      let user= JSON.parse(sessionStorage.getItem('user')! || '{}');
      if(user.rol != 1){
        this.Router.navigate(['/home']);
      }
    }

  }

  async getPedidos(): Promise<void> {
    try {
      const data = await this.PedidoService.getAllPedidos().toPromise();
      this.allPedidos = data.map((pedido:any) => ({
        ...pedido,
        fecha: this.formatDate(pedido.fecha)
      }));
      this.pedidosFilter = this.allPedidos.filter((pedido: any) => pedido.entregado === 0);
      console.log(this.pedidosFilter);
    } catch (error) {
      console.error('Error fetching pedidos:', error);
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  entregado(pedido: any, index: number): void {
    this.PedidoService.entregarPedido(pedido.id_pedido).subscribe(
      response => {


        // Ocultar el botón
        const button = document.getElementById(`pedido-${index}`);
        if (button) {
          button.classList.add('hidden');
        }

        // Mostrar el modal con el mensaje del response
        this.dialog.open(SuccessModalComponent, {
          data: { message: response.message }
        });
      },
      error => {
        console.error('Error al marcar el pedido como entregado:', error);
      }
    );
  }
}
