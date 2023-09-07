import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  category: any;
  

  

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('category')
    this.productService.currentView = 'ALL';
    if(this.category){
      // filter products by category 
      this.filterProducts(this.category)
    }else{
      this.loadProducts()
    }
    
    // this.subscription = this.productService.refreshProducts.subscribe(
    //   (data: any) => {
    //     this.productList = data;
    //     this.isLoading = false;
    //     this.allProduct = true
    //     this.productService.currentView = 'ALL';
    //   }
    // );
  }
  filterProducts(category:string) {
    console.log("Category selected : ", category)
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

  navigateToCheckout(product : any){
    console.log('Navigating to checkout', product);
    this.cartService.addToCart(product);
    this.router.navigate(['/checkout']);
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
    this.productService.changeProduct(product_id)
    this.router.navigate(['aboutProduct']);
  }


  addToCart(product: any) {
    this.cartService.addToCart(product);
  }


}
