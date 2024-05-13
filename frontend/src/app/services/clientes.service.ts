import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  getCasaClientes(id_cliente: number): Observable<any>{

    return this.http.get(`http://localhost:3000/cliente/casa/${id_cliente}`);
  }
}
