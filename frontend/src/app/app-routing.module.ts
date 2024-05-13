import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodpageComponent } from './components/pages/foodpage/foodpage.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { CartPageComponent } from './components/pages/cart/cart.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';


const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'search/:searchTerm',component:HomeComponent},
  {path:'food/:id',component:FoodpageComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'perfil',component:ProfileComponent},
  {path:'cart',component:CartPageComponent},
  {path:'checkout', component: CheckoutComponent},
  {path:'',redirectTo:'home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
