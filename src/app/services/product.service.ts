import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http : HttpClient
  ) { }

// return this.http.get<any[]>(`http://127.0.0.1:5000/recommend`)
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/products')
   }

  addToCart(obj : any):Observable<any> {
    return this.http.post<any>(`http://127.0.0.1:5000/recommend`,obj)
  }

  
}
