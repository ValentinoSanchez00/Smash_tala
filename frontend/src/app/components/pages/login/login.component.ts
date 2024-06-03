import { Router } from '@angular/router';
import { LoginService } from './../../../services/login.service';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  messageError:string='';
  constructor(private LoginService: LoginService,private router: Router) { }

  submitForm(): void {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    this.login(email, password);
  }
  login(email: string, password: string): void {
    this.LoginService.obtenerUsuario(email, password)
      .subscribe(
        data => {
          if (data.length > 0) {
            sessionStorage.setItem('isLoad', 'true');
            sessionStorage.setItem('user', JSON.stringify(data[0]));
            this.router.navigate(['/']);
          } else {
            this.messageError = "Usuario o contraseña incorrectos";
          }
        },
        error => {
          this.messageError = "Ha oucrido un error, pruebe de nuevo o intentelo más tarde";
        }
      );
  }
   
}


