import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems = [];
  cartTotal = 0;
  productSubscription: Subscription = new Subscription;
  item: any
  userId: string = ''
  collabProducts: any[] = []; 

  constructor(private cartService: CartService , private productService : ProductService) { }

  ngOnInit(): void {
    
    //  this.cartTotal = this.calculateTotal();
    this.productSubscription = this.cartService.cartItem.subscribe((data) => {
      this.item = data
      this.userId = localStorage.getItem('userID')?.toString() || ''
      if(this.userId == ''){
        console.log("no collab cz no login")
      }else{
        this.productService.getCollabRecommendations(this.userId).subscribe((data : any) =>{
          // console.log("recommendations from collab :" ,data)
          this.collabProducts = data.Collab_products;
        })
      }
      console.log(this.item)
    })
  }



}
