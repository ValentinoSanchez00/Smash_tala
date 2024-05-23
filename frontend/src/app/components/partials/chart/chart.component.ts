import { LocalstorageService } from 'src/app/services/localstorage.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  perfil: any;
  pedidos: any;
  
  constructor(
    private local: LocalstorageService,
    private PedidoService: PedidoService
  ) {
    this.perfil = JSON.parse(sessionStorage.getItem('user') || '{}');
  }

  async ngOnInit(): Promise<void> {
    this.pedidos = await new Promise<any>((resolve) => {
      this.PedidoService.getPedidosByCliente(this.perfil.id_cliente).subscribe(
        (data: any) => {
          resolve(data);
        }
      );
    });
    console.log(this.pedidos);

    this.createChart();
  }


  createChart(): void {
    console.log(this.pedidos);

    if (!this.pedidos) {
      return; // Si this.pedidos no está definido, no hagas nada
    }
  
    Chart.register(...registerables);
    const labels = this.pedidos.map((pedido: any) => `Pedido ${pedido.id_pedido}`);
    const data = this.pedidos.map((pedido: any) => pedido.coste);
  
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels, 
          datasets: [{
            label: 'Coste por pedido',
            data: data, 
            borderWidth: 1,
            backgroundColor: '#ae17217f',
            borderColor: '#ae1721',
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }


    const ctx2 = document.getElementById('myChart2') as HTMLCanvasElement;

    if (ctx2) {

      const burgerCountsByDate: { [key: string]: number } = {};

      this.pedidos.forEach((order:any) => {
          const date = order.fecha;
          const burgers = order.hamburguesa.split(',');
          if (!burgerCountsByDate[date]) {
              burgerCountsByDate[date] = 0;
          }
          burgerCountsByDate[date] += burgers.length;
      });

      const labels = Object.keys(burgerCountsByDate);
      const values = Object.values(burgerCountsByDate);

      const burgersChart = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Cantidad de Hamburguesas Comidas',
                data: values,
                backgroundColor: 'transparent',
                borderColor: '#ae1721',
                borderWidth: 1,
                fill: true
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return Number.isInteger(value) ? value : null;
                        }
                    }
                }
            }
        }
    });
    }

  }
  
}
