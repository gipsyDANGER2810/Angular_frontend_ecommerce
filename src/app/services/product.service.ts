import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  private productSource = new BehaviorSubject<string>('');
  currentProduct = this.productSource.asObservable();

  private refreshProductsSource = new Subject<any>();
  refreshProducts = this.refreshProductsSource.asObservable();
 
  currentView: 'ALL' | 'POPULAR' = 'POPULAR';


  getProductsByCategory(category: string): Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8080/filterProducts/${category}`)
  }

  getPopularProducts(): Observable<any[]> {
    return this.http.get<any[]>('http://127.0.0.1:5000/recommend')
  }

  getRecommendedProducts(userId :string){
    const encodedUserId = encodeURIComponent(userId);
    console.log("USER ID RECD : ", userId);
    console.log("USER ID ENCODED : ", encodedUserId)
    console.log("URL : "+ `http://127.0.0.1:5000/recommend?userid=${encodedUserId}`)
  return this.http.get(`http://127.0.0.1:5000/recommend?userid=402881598a6c8138018a6c8191ff0000`);
  // return this.http.get(`http://127.0.0.1:5000/recommend?user_id=${encodedUserId}`);

  }

  addToCart(obj: any): Observable<any> {
    return this.http.post<any>(`http://127.0.0.1:5000/recommend`, obj)
  }

  getProductById(product_id: string) {
    return this.http.get(`http://localhost:8080/api/products/${product_id}`)
  }

  changeProduct(product_id: string) {
    this.productSource.next(product_id);
  }


  getAllProducts(page: number, size: number) {
    return this.http.get(`http://localhost:8080/api/products?page=${page}&size=${size}`)
  }

  getAllCategories() {
    return this.http.get(`http://127.0.0.1:5000/categories`)
  }

  fetchAllProducts(data : any) {
    this.refreshProductsSource.next(data);
  }

  searchProduct(data : any){
    return this.http.get(`http://localhost:8080/api/products?search=${data}`)
  }


}
