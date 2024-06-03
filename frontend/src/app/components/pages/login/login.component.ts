import { Router } from '@angular/router';
import { LoginService } from './../../../services/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  messageError: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  submitForm(): void {
    if (this.email.length > 0 && this.password.length > 0) {
      this.login(this.email, this.password);
    } else {
      this.messageError = 'Por favor, complete todos los campos.';
    }
  }

  login(email: string, password: string): void {
    this.loginService.obtenerUsuario(email, password)
      .subscribe(
        data => {
          if (data.length > 0) {
            sessionStorage.setItem('isLoad', 'true');
            sessionStorage.setItem('user', JSON.stringify(data[0]));
            this.router.navigate(['/']);
          } else {
            this.messageError = 'Usuario o contraseña incorrectos';
          }
        },
        error => {
          this.messageError = 'Ha ocurrido un error, pruebe de nuevo o inténtelo más tarde';
        }
      );
  }
}
