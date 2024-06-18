import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  validationMessage = '';
  formData = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    rol: 0,
  };
  confirmPassword = '';
  messageError = '';

  constructor(private loginService: LoginService, private router: Router) {}

  isFormValid(): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    if (
      this.formData.nombre === '' ||
      this.formData.email === '' ||
      this.formData.password === '' ||
      this.formData.password !== this.confirmPassword
    ) {
      this.validationMessage = 'Todos los campos son obligatorios y las contraseñas deben coincidir.';
      return false;
    }
  
    if (!passwordRegex.test(this.formData.password)) {
      this.validationMessage = 'La contraseña debe tener al menos 8 caracteres, una letra minúscula, una letra mayúscula, un número y un carácter especial.';
      return false;
    }
  
    this.validationMessage = ''; // Clear any previous messages
    return true;
  }
  

  onSubmit(): void {
    if (this.isFormValid()) {
      this.loginService.crearUsuario(this.formData).subscribe(

        (data) => {
          if (data.message === 'Cliente agregado correctamente') {
            this.router.navigate(['/login']);
          } else {
            console.log(data);
            if (data.error === 'Error: ya existe un usuario con ese correo') {
              this.messageError = 'El email ingresado ya está en uso';
            }else{
              this.messageError = 'Hubo un problema al crear el usuario. Por favor, inténtalo de nuevo.';
            }
            
          }
        },
        (error) => {
          console.error(error);
          this.messageError = "Ha ocurrido un error, pruebe de nuevo o intentelo más tarde";
        }
      );
    } else {
      this.messageError = 'Formulario inválido, por favor completa todos los campos y asegúrate de que las contraseñas coincidan.';
    }
  }
}
