import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { AboutProductComponent } from './components/about-product/about-product.component';
import { UserProfilePageComponent } from './components/user-profile-page/user-profile-page.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';

const routes: Routes = [
  
  {
    path:"products",
    component:HomeComponent
  },
  {
    path : "profile",
    component:UserProfilePageComponent
  },
  {
    path:"checkout",
    component:CheckoutComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"cart",
    component:CartComponent
  },
  {
    path:"aboutProduct",
    component:AboutProductComponent
  },
  {
    path:"orderdetails",
    component:OrderDetailsComponent
  },
  { path: 'products/:category', component: HomeComponent },
  {
    path:"",
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
