import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/cliente';
  constructor(private http: HttpClient) { }

  obtenerUsuario(correo: string, contraseña: string): Observable<any> {
    let data= this.http.get<any>(`${this.apiUrl}/comprobar?correo=${correo}&contraseña=${contraseña}`);
    return data;
  }
}
