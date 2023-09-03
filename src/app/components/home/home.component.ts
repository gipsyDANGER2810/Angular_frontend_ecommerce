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
  page: number = 0;
  size: number = 10;


  

  

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
      this.subscription = this.productService.refreshProducts.subscribe((data) => {
        // this.productService.getAllProducts(this.page, this.size).subscribe((data)=>{
          this.productList = data
          

          this.isLoading = false;
          
          console.log(this.productList)
        // )
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
      );
  }
  nextPage() {
    this.page = this.page + 1;
    this.getAllProducts();
  }
  
  previousPage() {
    this.page = this.page - 1;
    this.getAllProducts();
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
