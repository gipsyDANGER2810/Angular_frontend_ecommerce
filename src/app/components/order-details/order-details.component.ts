import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  productSubscription: Subscription = new Subscription;
  item: any
  cartTotal !: number

  reviewTitle : string = ''
  reviewContent : string = ''

  orderStatus: string = 'Processing';
  showReview: boolean = false;
  tracking: boolean = false;
  productId: string = '';

  constructor(private cartService: CartService, private reviewService : ReviewService) { }

  ngOnInit(): void {
    //  this.cartTotal = this.calculateTotal();
    this.startTracking();
    this.productSubscription = this.cartService.cartItem.subscribe((data) => {
      this.item = data
      console.log(data)
      this.cartTotal = this.calculateTotal();

    })
  }
  calculateTotal(): number {
    return this.item.reduce((total: number, currentItem: { actual_price: number; quantity: any; }) => {
      return total + (currentItem.actual_price * (currentItem.quantity || 1));
    }, 0);
  }

  startTracking() {
    this.tracking = true;

    setTimeout(() => {
      this.orderStatus = 'Shipped';
    }, 3000); // Simulates the order being shipped after 3 seconds

    setTimeout(() => {
      this.orderStatus = 'Out for Delivery';
    }, 6000); // Simulates the order out for delivery after 6 seconds

    setTimeout(() => {
      this.orderStatus = 'Delivered';
      this.tracking = false;
    }, 10000); // Simulates the order being delivered after 10 seconds
  }

  requestReview() {
    this.showReview = true;
  }

  toggleReviewForProduct(product : any) {
    product.showReview = !product.showReview; // toggle the review form for the given product
  }

  submitReview(productId : string , reviewTitle : string , reviewContent : string){
    const userId = localStorage.getItem('userID')
    this.reviewTitle = reviewTitle
    this.reviewContent = reviewContent
    this.productId = productId
    const body = {
      productId,
      userId,
     reviewTitle,
      reviewContent
    }
    console.log(body)
    this.reviewService.addReview(body).subscribe((data)=>{
      console.log(data)
    })
  }

  
  
  
  
  
  


}
