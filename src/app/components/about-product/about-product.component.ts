import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-about-product',
  templateUrl: './about-product.component.html',
  styleUrls: ['./about-product.component.css']
})
export class AboutProductComponent implements OnInit {
getRoundedRating(): any {
throw new Error('Method not implemented.');
}
  productDetails : any

  constructor(private productService : ProductService){}

  product_id: string = '';
  productSubscription: Subscription = new Subscription;

  ngOnInit(): void {
    this.productSubscription = this.productService.currentProduct.subscribe(
        productId => {
            this.product_id = productId;
            this.getProductDetails(this.product_id);
        }
    );
    // this.productService.getHybridRecommendation().subscribe((data)=>{})
}
getProductDetails(product_id: string) {
  const key = 'productDetails_' + product_id;
  const storedProductDetails = sessionStorage.getItem(key);
  const parsedDetails = storedProductDetails ? JSON.parse(storedProductDetails) : null;
  

  // Check if the product details in the session storage is for the current product
  if (parsedDetails) {
    this.productDetails = parsedDetails;
    console.log(this.productDetails)
  } else {
    this.productService.getProductById(product_id).subscribe(
      data => {
        console.log(data);
        this.productDetails = data;
        sessionStorage.setItem(key, JSON.stringify(this.productDetails));
        this.productDetails.rating = Math.round(this.productDetails.rating);        
        console.log(this.productDetails)
      },
      error => {
        console.error('Error fetching product details:', error);
      }
    );
  }


}


  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }

}

