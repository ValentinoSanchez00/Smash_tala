import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { FoodpageComponent } from './foodpage.component';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../partials/header/header.component';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { RouterTestingModule } from '@angular/router/testing';

class MockFoodService {
  getFoodById(id: string) {
    return of({ id, name: 'Test Food' });
  }
  getAlergenos(id: string) {
    return of([{ alergeno: 'Peanuts' }, { alergeno: null }]);
  }
}

class MockCartService {
  addToCart(food: any) {}
  getCartObservable() {
    return of([]);
  }
}

describe('FoodpageComponent', () => {
  let component: FoodpageComponent;
  let fixture: ComponentFixture<FoodpageComponent>;
  let mockActivatedRoute;
  let sessionStorageSpy: jasmine.Spy;

  beforeEach(async () => {
    mockActivatedRoute = {
      params: of({ id: '1' })
    };

    await TestBed.configureTestingModule({
      declarations: [FoodpageComponent, HeaderComponent, NotFoundComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: FoodService, useClass: MockFoodService },
        { provide: CartService, useClass: MockCartService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    sessionStorageSpy = spyOn(sessionStorage, 'getItem');
  });

  afterEach(() => {
    sessionStorageSpy.and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch food details and alergenos on init', () => {
    expect(component.food).toEqual({ id: '1', name: 'Test Food' });
    expect(component.alergenos).toEqual([{ alergeno: 'Peanuts' }]);
  });



  it('should toggle modal visibility', () => {
    expect(component.openModal).toBeFalse();
    component.abrirModal();
    expect(component.openModal).toBeTrue();
    component.abrirModal();
    expect(component.openModal).toBeFalse();
  });

  it('should navigate back on goBack call', () => {
    spyOn(window.history, 'back');
    component.goBack();
    expect(window.history.back).toHaveBeenCalled();
  });

  it('should add food to cart and navigate to home', () => {
    const mockCartService = TestBed.inject(CartService);
    const mockRouter = TestBed.inject(Router);
    spyOn(mockCartService, 'addToCart');
    spyOn(mockRouter, 'navigateByUrl');

    component.addToCart();

    expect(mockCartService.addToCart).toHaveBeenCalledWith(component.food);
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/home');
  });
});
