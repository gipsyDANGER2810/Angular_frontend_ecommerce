import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent implements OnInit{
  user : any 
  showPastPurchases = false;
  userId : string =''
  products: any;


  constructor( 
    private loginService:LoginServiceService,
    private router:Router,
    private customerService : CustomerService,
    private productService : ProductService
    ) { }

  ngOnInit(): void {

    const userID = localStorage.getItem('userID')
    if( userID == null){
      console.log('please login')
      
    }else{
        this.customerService.getUserById(userID).subscribe((data)=>{
          console.log(" user details : " , data)
          this.user =data
          
        })
    }
    
  }

  togglePastPurchases() {
    debugger
    this.showPastPurchases = !this.showPastPurchases;
    if (this.showPastPurchases && this.user && this.user.reviews) {
      // Extract product IDs from user reviews
      const productIds = this.user.reviews.map((review: { productId: any; }) => review.productId);
  
      // Fetch product details using the extracted product IDs
      this.productService.getProductDetails(productIds).subscribe(products => {
        this.products = products;
        console.log(this.products)
      });
    }
    
  }



  logout(){
    this.loginService.logout()
    this.router.navigate(['/products'])
  }
  login(){
    this.router.navigate(['/login'])
  }
}
