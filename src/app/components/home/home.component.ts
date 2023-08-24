import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

isLoading : boolean = true
  productList: any[] = []
  productRecommended : any 
  

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts()
    
  }

  loadProducts() {
    this.productService.getAllProducts().pipe(retry(3)).subscribe(
      (result: any) => {
        this.productList = result;

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


}
