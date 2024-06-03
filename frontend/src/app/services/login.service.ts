import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/cliente';

  constructor(private http: HttpClient) { }

  obtenerUsuario(correo: string, contraseña: string): Observable<any> {
    let hashcontr = this.hashPassword(contraseña);
    return this.http.get<any>(`${this.apiUrl}/comprobar?correo=${correo}&contraseña=${hashcontr}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private hashPassword(password: string): string {
    return CryptoJS.SHA256(password).toString();
  }

  crearUsuario(user: any): Observable<any> {
    user.password = this.hashPassword(user.password);
    return this.http.post<any>(this.apiUrl, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Backend error
      if (error.status === 0) {
        errorMessage = 'Unable to connect to the server. Please check your network connection.';
      } else {
        errorMessage = `Server-side error: ${error.status} - ${error.message}`;
      }
    }
    return throwError(errorMessage);
  }
}
