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

    this.createChart();
  }


  createChart(): void {

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
  const burgerCountsByMonth: { [key: string]: number } = {};


  const dates = this.pedidos.map((order: any) => new Date(order.fecha));


  const firstDate = new Date(Math.min(...dates));
  const lastDate = new Date(Math.max(...dates));

  const currentDate = new Date(firstDate);
  while (currentDate <= lastDate) {
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const monthYear = `${year}-${month < 10 ? '0' + month : month}`;
    burgerCountsByMonth[monthYear] = 0;
    currentDate.setMonth(currentDate.getMonth() + 1);
  }


  this.pedidos.forEach((order: any) => {
    const date = new Date(order.fecha);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const monthYear = `${year}-${month < 10 ? '0' + month : month}`;

    const burgers = order.hamburguesa.split(',');
    burgerCountsByMonth[monthYear] += burgers.length;
  });

  const labels = Object.keys(burgerCountsByMonth).sort(); 
  const values = Object.values(burgerCountsByMonth);

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
