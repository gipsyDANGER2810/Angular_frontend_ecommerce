import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent implements OnInit{
  user : any 

  userId : string =''

  constructor( 
    private loginService:LoginServiceService,
    private router:Router,
    private customerService : CustomerService
    ) { }

  ngOnInit(): void {

    const userID = localStorage.getItem('userID')
    if( userID == null){
      console.log('please login')
    }else{
        this.customerService.getUserById(userID).subscribe((data)=>{
          console.log(" user details : " , data)
          this.user =data
        })
    }
    
  }



  logout(){
    this.loginService.logout()
    this.router.navigate(['/products'])
  }
}
