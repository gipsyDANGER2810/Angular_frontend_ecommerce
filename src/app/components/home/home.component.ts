import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { retry } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoading: boolean = true
  productList: any[] = [];
  content_list: any[] = [];
  filteredProductList: any[] = [];
  productRecommended: any
  subscription: Subscription = new Subscription();
  allProduct: boolean = true
  recommended: any
  LoggedInState : boolean = false

  page: number = 0;
  size: number = 10;
  category: any;




  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private route: ActivatedRoute,
    private loginService: LoginServiceService
  ) { }

  ngOnInit(): void {
    
    this.category = this.route.snapshot.paramMap.get('category');
    this.productService.currentView = 'ALL';

    if (this.category) {
      // Filter products by category 
      this.filterProducts(this.category);
      // this.productService.refreshProducts.subscribe((data : any) =>{
      //   this.productList = data
      //   console.log("oninit this.category" , this.productList)
      // })
    } else {
      const productsForUser = sessionStorage.getItem('productsForUser');
      if (productsForUser !== null) {  // Check for a non-null value
        this.recommended = JSON.parse(productsForUser);
      } else {
        this.recommended = null;
      }
      
      if (this.recommended) {
        this.productList = this.recommended.Popular_products;
        this.content_list = this.recommended.content_based_products;
        console.log("productList :" ,this.productList)
        console.log("content list :" ,this.content_list)
        this.LoggedInState = this.loginService.currentLoginState
        
      } else if (!this.loginService.currentLoginState) {
        // Load products if there are no recommendations and the user is not logged in
        this.loadProducts();
        // this.isLoading=false
      }
      this.isLoading = false
    }

  }

  filterProducts(category: string) {
    this.productService.refreshProducts.subscribe((data) => {
      this.filteredProductList = data
      // this.content_list = []
      console.log("in filter product")
      console.log(this.filteredProductList)
      this.isLoading = false
    })
    // console.log("Category selected : ", category)
    // this.productService.getPopularProducts().pipe(retry(3)).subscribe(
    //   (result: any) => {
    //     this.productList = result.Popular_products;
    //     this.content_list = result.content_based_products;
    //     this.isLoading = false;

    //   },
    //   (error) => {
    //     console.error('Error fetching products:', error);
    //   }
    // );
  }

  navigateToCheckout(product: any) {
    console.log('Navigating to checkout', product);
    this.cartService.addToCart(product);
    this.router.navigate(['/checkout']);
  }

  getAllProducts() {
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
        this.productList = result.Popular_products;
        this.content_list = result.content_based_products;
        this.isLoading = false;
        console.log(this.content_list)
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  sendProductName(product_name: string, product_id: string) {
    this.productService.changeProduct(product_id)
    this.router.navigate(['aboutProduct']);
  }


  addToCart(product: any) {
    debugger
    this.cartService.addToCart(product);
  }


}
