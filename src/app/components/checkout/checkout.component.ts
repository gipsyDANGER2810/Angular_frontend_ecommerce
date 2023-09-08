import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  productSubscription: Subscription = new Subscription;
  item : any
  cartTotal !: number

  constructor( 
    private cartService : CartService,
    private loginService : LoginServiceService,
    private router : Router
    ){}


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
checkLogin(){
const loginStatus = this.loginService.currentLoginState
console.log(loginStatus)
if(loginStatus == false){
  this.router.navigate(['login'])
}
}



}

