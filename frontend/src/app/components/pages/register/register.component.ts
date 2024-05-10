import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formData = {
    nombre: '',
    apellido:'',
    email: '',
    password: '',
    rol:0,
  };
  confirmPassword = '';

  constructor(private loginService: LoginService) { }
  isFormValid(): boolean {
    return this.formData.nombre !== '' &&
           this.formData.email !== '' &&
           this.formData.password !== '' &&
           this.formData.password === this.confirmPassword;
  }

  onSubmit() {
    if (this.isFormValid()) {
      console.log('Formulario válido, enviando datos al servidor...');
      let response=this.loginService.crearUsuario(this.formData).subscribe(data => {
        console.log(data)
      })
      console.log(response)

    } else {
      console.log('Formulario inválido, por favor completa todos los campos y asegúrate de que las contraseñas coincidan.');
    }
  }
}
