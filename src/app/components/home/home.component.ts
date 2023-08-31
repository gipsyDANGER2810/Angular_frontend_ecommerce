import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { retry } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoading : boolean = true
  productList: any 
  productRecommended : any 
  subscription: Subscription = new Subscription();
  allProduct :boolean = true
  content_list : any

  

  

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService

  ) { }

  ngOnInit(): void {
    this.productService.currentView = 'ALL';
    this.subscription = this.productService.refreshProducts.subscribe(
      (data: any) => {
        this.productList = data;
        this.isLoading = false;
        this.allProduct = true
        this.productService.currentView = 'ALL';
      }
    );
    this.loadProducts()
    
  }

  getAllProducts(){
    this.productService.currentView = 'POPULAR';
      this.subscription = this.productService.refreshProducts.subscribe(() => {
        this.productService.getAllProducts().subscribe((data)=>{
          this.productList = data
          this.isLoading = false;
          
        })
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
      );
    
  }

  loadProducts() {
    this.productService.getPopularProducts().pipe(retry(3)).subscribe(
      (result: any) => {
        this.productList = result.first_set;
        this.content_list = result.second_set;
          this.isLoading = false;

      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  sendProductName(product_name : string, product_id:string){

    console.log(product_name)
    console.log(product_id)
    this.productService.changeProduct(product_id)
    // this.productService.getProductByName(product_name).subscribe((result) =>{
    //   this.productRecommended= result
    //   console.log(this.productRecommended)

    // })
    this.router.navigate(['aboutProduct']);
  }


  addToCart(product: any) {
    this.cartService.addToCart(product);
  }




}
