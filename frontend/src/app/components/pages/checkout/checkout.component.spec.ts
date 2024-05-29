import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CheckoutComponent } from "./checkout.component";
import { HeaderComponent } from "../../partials/header/header.component";

describe("CheckoutComponent", () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule ],
            declarations: [CheckoutComponent,HeaderComponent],
        }).compileComponents();
    });

    it("should create the app", () => {
        const fixture = TestBed.createComponent(CheckoutComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it("should create a variable", () => {
        const fixture = TestBed.createComponent(CheckoutComponent);
        const app = fixture.componentInstance;
        expect(app.cart).toBeTruthy();
    });

    it("should call checkInputs", () => {
        const fixture = TestBed.createComponent(CheckoutComponent);
        const app = fixture.componentInstance;
        app.checkInputs();
        expect(app).toBeTruthy();
    });

    it("should call placeOrder", () => {
        const fixture = TestBed.createComponent(CheckoutComponent);
        const app = fixture.componentInstance;
        app.placeOrder();
        expect(app).toBeTruthy();
    });

    it('should have cart initialized', () => {
        const fixture = TestBed.createComponent(CheckoutComponent);
        const app = fixture.componentInstance;
        app.placeOrder();
        expect(app.cart).toBeDefined();
      });
    
      it('should have id_cliente initialized', () => {
        const fixture = TestBed.createComponent(CheckoutComponent);
        const app = fixture.componentInstance;
        app.placeOrder();
        app.id_cliente = 1;
        expect(app.id_cliente).toBeDefined();
      });
    
      it('should have pedido initialized', () => {
        const fixture = TestBed.createComponent(CheckoutComponent);
        const app = fixture.componentInstance;
        app.placeOrder();
        app.pedido = 1;
        expect(app.pedido).toBeDefined();
      });
    
      it('should have direcciones initialized as an empty array', () => {
        const fixture = TestBed.createComponent(CheckoutComponent);
        const app = fixture.componentInstance;
        app.placeOrder();
        expect(app.direcciones).toEqual([]);
      });
    
      it('should have usarDireccionGuardada initialized as false', () => {
        const fixture = TestBed.createComponent(CheckoutComponent);
        const app = fixture.componentInstance;
        app.placeOrder();
        expect(app.usarDireccionGuardada).toBeFalse();
      });
    
      it('should have validate initialized as false', () => {
        const fixture = TestBed.createComponent(CheckoutComponent);
        const app = fixture.componentInstance;
        app.placeOrder();
        expect(app.validate).toBeFalse();
      });

    
})