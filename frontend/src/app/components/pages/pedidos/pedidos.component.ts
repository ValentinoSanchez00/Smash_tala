import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PedidoService } from './../../../services/pedido.service';
import { SuccessModalComponent } from '../../partials/success-modal/success-modal.component';
import io from 'socket.io-client';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit, OnDestroy {
  private socket: any;
  allPedidos: any;
  pedidosFilter: any;

  constructor(
    private pedidoService: PedidoService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.socket = io('http://localhost:3000'); // Establecer la conexión con el servidor de Socket.IO
  }

  ngOnInit(): void {
    this.comprobar();
    this.getPedidos();

    // Escuchar el evento 'updatePedidos' emitido por el servidor
    this.socket.on('updatePedidos', () => {
      this.getPedidos();
    });
  }

  ngOnDestroy(): void {
    // Desconectar el socket al destruir el componente
    this.socket.disconnect();
  }

  comprobar(): void {
    let isLoaded = sessionStorage.getItem('isLoad');
    console.log(isLoaded);

    if (isLoaded === null || isLoaded === 'false') {
      this.router.navigate(['/home']);
    } else {
      let user = JSON.parse(sessionStorage.getItem('user') || '{}');
      if (user.rol !== 1) {
        this.router.navigate(['/home']);
      }
    }
  }

  async getPedidos(): Promise<void> {
    try {
      const data = await this.pedidoService.getAllPedidos().toPromise();
      this.allPedidos = data.map((pedido: any) => ({
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
    this.pedidoService.entregarPedido(pedido.id_pedido).subscribe(
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
