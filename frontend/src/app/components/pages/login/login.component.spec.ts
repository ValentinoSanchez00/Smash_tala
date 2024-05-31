import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { LoginService } from './../../../services/login.service';
import { FormsModule } from '@angular/forms';
import { Component, NgModule } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';

// Mock LoginService
class MockLoginService {
  obtenerUsuario(email: string, password: string) {
    if (email === 'test@example.com' && password === 'password') {
      return of([{ id: 1, name: 'Test User' }]);
    } else {
      return of([]);
    }
  }
}

// Mock Router
class MockRouter {
  navigate(path: any) {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, HeaderComponent],
      imports: [FormsModule],
      providers: [
        { provide: LoginService, useClass: MockLoginService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home on successful login', fakeAsync(() => {
    spyOn(router, 'navigate');

    component.login('test@example.com', 'password');
    tick(); // Simula el paso del tiempo

    expect(router.navigate).toHaveBeenCalledWith(['/']);
    expect(sessionStorage.getItem('isLoad')).toBe('true');
    expect(sessionStorage.getItem('user')).toBe(JSON.stringify({ id: 1, name: 'Test User' }));
  }));

  it('should display error message on failed login', fakeAsync(() => {
    component.login('wrong@example.com', 'wrongpassword');
    tick(); // Simula el paso del tiempo
    
    expect(component.messageError).toBe('Usuario o contraseña incorrectos');
  }));
});
