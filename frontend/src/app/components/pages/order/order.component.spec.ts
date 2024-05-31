import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { OrderComponent } from './order.component';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Chart, DoughnutController, ArcElement } from 'chart.js';

// Registrando el controlador Doughnut y los elementos necesarios
Chart.register(DoughnutController, ArcElement);

// Mock Data
const mockPedidos = [
  { coste: 10, tipo_pago: 'Efectivo', fecha: '2023-01-01', hamburguesa: 'Cheeseburger', entregado: true },
  { coste: 15, tipo_pago: 'Tarjeta', fecha: '2023-01-02', hamburguesa: 'Veggie Burger', entregado: false },
  { coste: 12, tipo_pago: 'Efectivo', fecha: '2023-01-03', hamburguesa: 'Chicken Burger', entregado: true }
];

// Mock Services
class MockPedidoService {
  getPedidosByCliente(id: number) {
    return of(mockPedidos);
  }
}

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let pedidoService: PedidoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderComponent],
      imports: [],
      providers: [
        { provide: PedidoService, useClass: MockPedidoService },
        LocalstorageService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    pedidoService = TestBed.inject(PedidoService);

    // Mock sessionStorage
    spyOn(sessionStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'user') {
        return JSON.stringify({ id_cliente: 1 });
      }
      return null;
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch orders on init', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(component.pedidos.length).toBe(3);
    expect(component.dataSource.data.length).toBe(3);
  }));

  it('should return the total number of orders', () => {
    component.pedidos = mockPedidos;
    expect(component.gettotalPedidos()).toBe(3);
  });

  it('should return all burgers', () => {
    component.pedidos = mockPedidos;
    const allBurgers = component.getAllBurgers();
    expect(allBurgers).toEqual(['Cheeseburger', 'Veggie Burger', 'Chicken Burger']);
  });

  // Agrega más pruebas según sea necesario
});
