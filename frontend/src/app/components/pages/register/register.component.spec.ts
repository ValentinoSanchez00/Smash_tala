import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RegisterComponent } from './register.component';
import { LoginService } from 'src/app/services/login.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

class MockLoginService {
  crearUsuario(formData: any) {
    return of({ message: 'Cliente agregado correctamente' });
  }
}

class MockRouter {
  navigate(url: string) {
    return url;
  }
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let loginService: LoginService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [
        { provide: LoginService, useClass: MockLoginService },
        { provide: Router, useClass: MockRouter },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate the form correctly', () => {
    component.formData = {
      nombre: 'Test',
      apellido: 'User',
      email: 'test@example.com',
      password: 'password',
      rol: 0,
    };
    component.confirmPassword = 'password';

    expect(component.isFormValid()).toBe(true);

    component.confirmPassword = 'differentPassword';
    expect(component.isFormValid()).toBe(false);

    component.formData.email = '';
    expect(component.isFormValid()).toBe(false);
  });

  it('should call loginService.crearUsuario and navigate on successful submission', () => {
    spyOn(loginService, 'crearUsuario').and.callThrough();
    spyOn(router, 'navigate');

    component.formData = {
      nombre: 'Test',
      apellido: 'User',
      email: 'test@example.com',
      password: 'password',
      rol: 0,
    };
    component.confirmPassword = 'password';

    component.onSubmit();

    expect(loginService.crearUsuario).toHaveBeenCalledWith(component.formData);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should not call loginService.crearUsuario if form is invalid', () => {
    spyOn(loginService, 'crearUsuario');
    spyOn(console, 'log');

    component.formData = {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
      rol: 0,
    };
    component.confirmPassword = '';

    component.onSubmit();

    expect(loginService.crearUsuario).not.toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(
      'Formulario inválido, por favor completa todos los campos y asegúrate de que las contraseñas coincidan.'
    );
  });
});
