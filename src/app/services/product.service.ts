import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http : HttpClient
  ) { }

  private productSource = new BehaviorSubject<string>('');
  currentProduct = this.productSource.asObservable();

// return this.http.get<any[]>(`http://127.0.0.1:5000/recommend`)
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>('http://127.0.0.1:5000/recommend')
   }

  addToCart(obj : any):Observable<any> {
    return this.http.post<any>(`http://127.0.0.1:5000/recommend`,obj)
  }

  getProductById(product_name:string){
    
    console.log(product_name)
    return this.http.get(`http://localhost:8080/api/products/${product_name}`)
  }

  changeProduct(product_id:string) {
    this.productSource.next(product_id);
  }

  
}
