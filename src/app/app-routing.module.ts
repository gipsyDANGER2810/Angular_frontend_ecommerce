import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { AboutProductComponent } from './components/about-product/about-product.component';

const routes: Routes = [
  
  {
    path:"products",
    component:HomeComponent
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
    path:"",
    component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
