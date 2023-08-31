import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  cartItems = [];
  cartTotal = 0;
  productSubscription: Subscription = new Subscription;

  constructor( private cartService : CartService){}

  ngOnInit(): void {
  //  this.cartTotal = this.calculateTotal();
  }




  // calculateTotal() {
  //   return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  // }

  // addItem(item) {
  //   const foundItem = this.cartItems.find(cartItem => cartItem.id === item.id);
  //   if (foundItem) {
  //     foundItem.quantity += 1; // Update the quantity
  //   } else {
  //     this.cartItems.push({ ...item, quantity: 1 }); // Add new item
  //   }
  //   this.cartTotal = this.calculateTotal();
  // }

  // removeItem(id: number) {
  //   this.cartItems = this.cartItems.filter(item => item.id !== id);
  //   this.cartTotal = this.calculateTotal();
  // }

  // updateQuantity(id: number, quantity: number) {
  //   const foundItem = this.cartItems.find(cartItem => cartItem.id === id);
  //   if (foundItem) {
  //     foundItem.quantity = quantity;
  //   }
  //   this.cartTotal = this.calculateTotal();
  // }
}
