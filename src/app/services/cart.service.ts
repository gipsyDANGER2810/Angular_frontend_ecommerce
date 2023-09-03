import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: any[] = [];
  
  private cartItemCount = new BehaviorSubject(0);
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItem = this.cartItemsSubject.asObservable()
  

  constructor() { this.cartItemsSubject.next(this.cartItems);}

  getCartItemCount(): Observable<number> {
    return this.cartItemCount.asObservable();
  }

  getCartItems(): Observable<any[]> {
    return this.cartItemsSubject.asObservable();
  }

  addToCart(product: any) {
    this.cartItems.push(product);
    this.cartItemCount.next(this.cartItems.length);
    this.cartItemsSubject.next(this.cartItems); 
  }
}
