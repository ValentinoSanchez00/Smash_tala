import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SearchComponent } from './components/partials/search/search.component';
import { FoodpageComponent } from './components/pages/foodpage/foodpage.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { CartPageComponent } from './components/pages/cart/cart.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { ChartComponent } from './components/partials/chart/chart.component';
import { OrderComponent } from './components/pages/order/order.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PedidosComponent } from './components/pages/pedidos/pedidos.component';
import { SuccessModalComponent } from './components/partials/success-modal/success-modal.component';
import { LogComponent } from './components/pages/log/log.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { FooterComponent } from './components/partials/footer/footer.component';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    FoodpageComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CartPageComponent,
    NotFoundComponent,
    CheckoutComponent,
    ChartComponent,
    OrderComponent,
    PedidosComponent,
    SuccessModalComponent,
    LogComponent,
    AboutUsComponent,
    FooterComponent,

  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OAuthModule.forRoot(),
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
