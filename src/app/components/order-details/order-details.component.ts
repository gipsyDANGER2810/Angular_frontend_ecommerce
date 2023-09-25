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
  stars: number[] = [1, 2, 3, 4, 5];
  orderStatus: string = 'Pending';
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
        this.orderStatus = 'Order Processing';
    }, 3000);

    setTimeout(() => {
        this.orderStatus = 'Pre-Production';
    }, 6000);

    setTimeout(() => {
        this.orderStatus = 'In Production';
    }, 9000);

    setTimeout(() => {
        this.orderStatus = 'Shipped';
    }, 12000);

    setTimeout(() => {
        this.orderStatus = 'Delivered';
        this.tracking = false;
    }, 15000);
}



  requestReview() {
    this.showReview = true;
  }

  toggleReviewForProduct(product : any) {
    product.showReview = !product.showReview; // toggle the review form for the given product
  }

  submitReview(productId : string , reviewTitle : string , reviewContent : string ){
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
