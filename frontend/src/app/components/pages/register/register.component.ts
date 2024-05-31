import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  formData = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    rol: 0,
  };
  confirmPassword = '';

  constructor(private loginService: LoginService, private router: Router) {}

  isFormValid(): boolean {
    return (
      this.formData.nombre !== '' &&
      this.formData.email !== '' &&
      this.formData.password !== '' &&
      this.formData.password === this.confirmPassword
    );
  }

  onSubmit() {
    if (this.isFormValid()) {
      this.loginService.crearUsuario(this.formData).subscribe((data) => {
        if (data.message === 'Cliente agregado correctamente') {
          this.router.navigate(['/login']);
        }
      });
    } else {
      console.log(
        'Formulario inválido, por favor completa todos los campos y asegúrate de que las contraseñas coincidan.'
      );
    }
  }
}
