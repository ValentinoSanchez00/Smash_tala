import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { Chart } from 'chart.js';

interface Order {
  coste: number;
  tipo_pago: string;
  fecha: string;
  hamburguesa: string;
  entregado: boolean;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  pedidos: Order[] = [];
  perfil: any;
  dataSource: MatTableDataSource<Order> = new MatTableDataSource<Order>();
  displayedColumns: string[] = ['fecha', 'coste', 'tipo_pago', 'hamburguesa', 'entregado'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private local: LocalstorageService, private PedidoService: PedidoService) {
    this.perfil = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.sort = new MatSort(); 
  }

  async ngOnInit(): Promise<void> {
    this.pedidos = await new Promise<Order[]>((resolve) => {
      this.PedidoService.getPedidosByCliente(this.perfil.id_cliente).subscribe(
        (data: Order[]) => {
          console.log(data);
          resolve(data);
        }
      );
    });

    this.dataSource = new MatTableDataSource(this.pedidos);
    this.dataSource.sort = this.sort;
    this.createBurgerChart();
  }

  gettotalPedidos(): number {
    if (!this.pedidos) {
      return 0;
    }
    return this.pedidos.length;
  }

  getAllBurgers(): string[] {
    let allBurgers: string[] = [];
    this.pedidos.forEach((order: Order) => {
      const burgers = order.hamburguesa.split(',');
      allBurgers = allBurgers.concat(burgers.map((burger) => burger.trim()));
    });
    return allBurgers;
  }

  createBurgerChart() {
    const burgers = this.getAllBurgers();
    const burgerCounts: { [key: string]: number } = {};

    // Contar las ocurrencias de cada tipo de hamburguesa
    burgers.forEach(burger => {
      if (burgerCounts[burger]) {
        burgerCounts[burger]++;
      } else {
        burgerCounts[burger] = 1;
      }
    });

    // Preparar los datos para el gráfico
    const labels = Object.keys(burgerCounts);
    const data = Object.values(burgerCounts);

    const ctx = document.getElementById('burgerChart') as HTMLCanvasElement;

    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            label: 'Cantidad de Hamburguesas',
            data: data,
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40'
            ],
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  return `${label}: ${value}`;
                }
              }
            }
          }
        }
      });
    }
  }
}
