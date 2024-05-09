import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formData = {
    name: '',
    email: '',
    password: ''
  };
  confirmPassword = '';

  isFormValid(): boolean {
    return this.formData.name !== '' &&
           this.formData.email !== '' &&
           this.formData.password !== '' &&
           this.formData.password === this.confirmPassword;
  }

  onSubmit() {
    if (this.isFormValid()) {
      // Aquí iría tu lógica para enviar los datos al servidor
      console.log('Formulario válido, enviando datos al servidor...');
    } else {
      console.log('Formulario inválido, por favor completa todos los campos y asegúrate de que las contraseñas coincidan.');
    }
  }
}
