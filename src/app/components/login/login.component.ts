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

  currentForm: 'login' | 'register' = 'login';
  username: string = '';
  password: string = '';
  registerUsername: string = '';
  registerEmail: string ='';
  registerPassword: string='';
  invalidLogin = false;
  loginSuccess = false;
  errorMessage = '';
  successMessage = '';
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
  showForm(form: 'login' | 'register') {
    this.currentForm = form;
  }

  handleLogin() {
    // Implement your login logic here
  }

  handleRegister() {
    // Implement your registration logic here
  }
}
