import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }


  addReview(body : any){

    console.log("review service :" , body)
    return this.http.post(`http://localhost:8080/api/review` , body)
  }
}
