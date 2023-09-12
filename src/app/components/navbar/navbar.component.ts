import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
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
  category_list: any;
  userID : string = 'null'

  constructor(
    private productService:ProductService,
    private cartService: CartService, 
    private router : Router,
    private customerService : CustomerService
    )
  {
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
        this.category_list = data.categories
        this.main_categories = Object.keys(data.categories)
        console.log(this.main_categories)
        console.log(this.category_list)
        
      }
      );
      this.searchControl.valueChanges.subscribe(value => {
        this.search(value);
      });
  }

  productDetails(product_id : any){
    this.productService.changeProduct(product_id)
    this.router.navigate(['aboutProduct']);
  }

  getCategory(category:string){
    debugger
    console.log(category);
    console.log(this.category_list[category])
    this.productService.filteredProducts(category).subscribe((data)=>{
      console.log("in navbar" , data)
      this.productService.fetchAllProducts(data)
    })
    this.router.navigate(['products', category])
  }
  search(value : string){
    this.productService.searchProduct(value).subscribe((data)=>{
      console.log(data)
    })
    
  }

  userProfile(){
    this.router.navigate(['/profile'])
  }
}
