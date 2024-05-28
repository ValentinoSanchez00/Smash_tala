import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodpageComponent } from './components/pages/foodpage/foodpage.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { CartPageComponent } from './components/pages/cart/cart.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { OrderComponent } from './components/pages/order/order.component';
import { PedidosComponent } from './components/pages/pedidos/pedidos.component';
import { LogComponent } from './components/pages/log/log.component';



const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'search/:searchTerm',component:HomeComponent},
  {path:'food/:id',component:FoodpageComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'perfil',component:ProfileComponent},
  {path:'cart',component:CartPageComponent},
  {path:'orders',component:OrderComponent},
  {path:'checkout', component: CheckoutComponent},
  {path:'pedidos', component: PedidosComponent},
  {path:'log', component: LogComponent},
  {path:'',redirectTo:'home',pathMatch:'full'}
];
const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'top',  
  
};


@NgModule({
  imports: [RouterModule.forRoot(routes,routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
