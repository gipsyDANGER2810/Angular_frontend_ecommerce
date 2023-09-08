import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent implements OnInit{
  user = {
    name: '',
    email: 'john.doe@example.com',
    bio: 'I am a software developer.',
    profileImage: 'https://via.placeholder.com/150'
  };

  constructor( 
    private loginService:LoginServiceService,
    private router:Router
    ) { }

  ngOnInit(): void {
    
  }



  logout(){
    this.loginService.logout()
    this.router.navigate(['/products'])
  }
}
