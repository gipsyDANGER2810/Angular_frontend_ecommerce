import { Component } from '@angular/core';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerce';
  // cartItemCount: number = 0;
  // cartItems: any[] = [];
  // subscription: Subscription = new Subscription();
  // main_categories : any[] = [];

  // page : number = 0
  // pageSize : number = 10
  constructor(private productService:ProductService , private cartService: CartService){
  //   this.cartService.getCartItemCount().subscribe(count => {
  //     this.cartItemCount = count;
  //   });
  //   this.cartService.getCartItems().subscribe(items => {
  //     this.cartItems = items;
  //   });


  // }

  // ngOnInit(): void {
  //   this.subscription = this.productService.getAllCategories().subscribe(
  //     (data: any) => {
  //       console.log(Object.keys(data.categories))
  //       this.main_categories = Object.keys(data.categories)
  //       console.log(this.main_categories)
  //     }
  //     );
    
  // }

  // onAllProductsClick() {
  //   this.productService.getAllProducts(this.page , this.pageSize).subscribe((data)=>{
  //     this.productService.fetchAllProducts(data);
  //   })
    
  // }

}
}
