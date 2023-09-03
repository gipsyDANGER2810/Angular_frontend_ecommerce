import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartItemCount: number = 0;
  cartItems: any[] = [];
  subscription: Subscription = new Subscription();
  main_categories : any[] = [];
  searchControl = new FormControl();
  suggestions: string[] = [];

  constructor(private productService:ProductService , private cartService: CartService, private router : Router){
    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });


  }

  ngOnInit(): void {
    this.subscription = this.productService.getAllCategories().subscribe(
      (data: any) => {
        console.log(Object.keys(data.categories))
        this.main_categories = Object.keys(data.categories)
        console.log(this.main_categories)
      }
      );
    
  }

  productDetails(product_id : any){
    this.productService.changeProduct(product_id)
    this.router.navigate(['aboutProduct']);
  }
}
