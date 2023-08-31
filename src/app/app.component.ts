import { Component } from '@angular/core';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerce';
  cartItemCount: number = 0;
  cartItems: any[] = [];

  

  constructor(private productService:ProductService , private cartService: CartService){
    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  onAllProductsClick() {
    this.productService.getAllProducts().subscribe((data)=>{
      this.productService.fetchAllProducts(data);
    })
    
  }

}
