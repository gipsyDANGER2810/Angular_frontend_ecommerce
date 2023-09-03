import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent implements OnInit{
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'I am a software developer.',
    profileImage: 'https://via.placeholder.com/150'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
