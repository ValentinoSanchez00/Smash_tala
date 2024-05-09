import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

// Función para cifrar la contraseña utilizando SHA-256

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/cliente';
  constructor(private http: HttpClient) { }

  obtenerUsuario(correo: string, contraseña: string): Observable<any> {
    let hashcontr=this.hashPassword(contraseña);

    let data= this.http.get<any>(`${this.apiUrl}/comprobar?correo=${correo}&contraseña=${hashcontr}`);
    return data;
  }
  private hashPassword(password: string): string {
    return CryptoJS.SHA256(password).toString();
}


}
