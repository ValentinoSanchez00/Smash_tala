import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
private apiUrl = 'http://localhost:3000/pedido'
  constructor(private http: HttpClient) { }

  crearPedido(pedido: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, pedido);
  }

  getAllPedidos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getPedidosByCliente(id_cliente: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cliente/${id_cliente}`);
  }

}
