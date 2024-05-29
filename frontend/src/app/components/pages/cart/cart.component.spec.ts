import {TestBed} from '@angular/core/testing';
import {CartPageComponent} from './cart.component';
import { HeaderComponent } from '../../partials/header/header.component';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import{CartItemModule} from '../../../shared/models/cart-item.module';
import { Hamburguer } from 'src/app/shared/models/Food';

const food: Hamburguer = {
    id_hamburguesa: 1,
    nombre: 'Test Hamburguer',
    tipo: 'Test Type',
    valor: 10.99,
    cookTime:0,
    coste: 12.99,
};

describe('CartComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CartPageComponent,HeaderComponent,NotFoundComponent],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(CartPageComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

   

    it('should create a variable', () => {
        const fixture = TestBed.createComponent(CartPageComponent);
        const app = fixture.componentInstance;
        expect(app.cart).toBeTruthy();
    });

    it('should call removeFromCart', () => {
        const fixture = TestBed.createComponent(CartPageComponent);
        const app = fixture.componentInstance;
        const cartItem = new CartItemModule(food);
        app.removeFromCart(cartItem);
        expect(app).toBeTruthy();
    });

    it('should call changeQuantity', () => {
        const fixture = TestBed.createComponent(CartPageComponent);
        const app = fixture.componentInstance;
        const cartItem = new CartItemModule(food);
        app.changeQuantity(cartItem,'1');
        expect(app).toBeTruthy();
    });

    it('initalitate in the constructor the cart', () => {
        const fixture = TestBed.createComponent(CartPageComponent);
        const app = fixture.componentInstance;
        expect(app.cart).toBeTruthy();
    });


});
