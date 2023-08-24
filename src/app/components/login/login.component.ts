import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage = 'Invalid Credentials';
  successMessage = 'Login Sucessful'
  invalidLogin = false;
  loginSuccess = false;
  isRegister : boolean = false

  constructor(
    private router: Router, private http: HttpClient, 
    private customerService:CustomerService,
    private authService : AuthService
    ) { }

  ngOnInit(): void {
  }
  onRegister() {
    // this.customerService.addUser(this.registerObj)
    console.log("REGISTERED")
  }
  handleLogin() {
    this.authService.login(this.username, this.password).subscribe((result) => {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage
      // redirect to main page
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });
  }
}
