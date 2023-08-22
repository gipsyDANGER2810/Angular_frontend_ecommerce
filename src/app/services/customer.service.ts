import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http : HttpClient) { }

  addUser(userData: any){
    return this.http.post(`http://localhost:8080/api/customer` , userData).subscribe(
      response => {
        // Handle successful response
        console.log('User added:', response);
      },
      error => {
        // Handle error response
        console.error('There was an error:', error);
      }
    );
  }


  getUSer(UserId : any){
    return this.http.post(`http://localhost:8080/api/customer`,UserId).subscribe(result =>{
      if (result == UserId){
        
      }
    })

  }


}
