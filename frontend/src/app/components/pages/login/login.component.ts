import { Router } from '@angular/router';
import { LoginService } from './../../../services/login.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private LoginService: LoginService,private router: Router) { }

  submitForm(): void {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    this.login(email, password);
  }
  login(email: string, password: string): void {
    this.LoginService.obtenerUsuario(email, password)
      .subscribe(data => {
        console.log(data); 
        if (data.length > 0) {
          sessionStorage.setItem('isLoad', 'true');
          sessionStorage.setItem('user', JSON.stringify(data[0]));
          console.log("sesion storage cambiado");
          this.router.navigate(['/']);
        } else {

        }
      });
  }
   
}


