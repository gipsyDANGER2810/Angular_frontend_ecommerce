import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  productSubscription: Subscription = new Subscription;
  item : any
  cartTotal !: number
  constructor( private cartService : CartService){}
  totalPrice : number = 0


  ngOnInit(): void {
    //  this.cartTotal = this.calculateTotal();
    this.productSubscription = this.cartService.cartItem.subscribe((data) =>{
      this.item=data
      this.cartTotal = this.calculateTotal();
  
    })
    }

    calculateTotal(): number {
      return this.item.reduce((total: number, currentItem: { actual_price: number; quantity: any; }) => {
        return total + (currentItem.actual_price * (currentItem.quantity || 1));
      }, 0);
}

sendToOrderDetails(){
  
}



}

