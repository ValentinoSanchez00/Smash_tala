import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [
        { provide: LocalstorageService, useValue: {} },
        { provide: PedidoService, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    // Configura el espía antes de crear el componente
    spyOn(sessionStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'user') {
        return JSON.stringify({ id: 1, name: 'Test User' });
      }
      return null;
    });

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize perfil with user data from sessionStorage', () => {
    expect(component.perfil).toEqual({ id: 1, name: 'Test User' });
  });

  it('should have called sessionStorage.getItem with "user"', () => {
    expect(sessionStorage.getItem).toHaveBeenCalledWith('user');
  });
});
