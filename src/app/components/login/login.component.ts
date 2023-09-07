import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { ProductService } from 'src/app/services/product.service';

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
  JWT : any

  constructor(
    private router: Router, private http: HttpClient, 
    private customerService:CustomerService,
    private authService : AuthService,
    private productService : ProductService
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

  handleLogin( userName: string , pwd : string) {
    // Implement your login logic here
    if (!this.username || !this.password) {
      console.log("Maa Chudao")
      // return "lund hilla ab";
    }
    this.username = userName;
    this.password = pwd;
    this.customerService.loginUser(this.username,this.password).subscribe((data : any)=>{
      console.log(data)
      this.JWT = data.jwt

      if(this.JWT){
        this.productService.getRecommendedProducts(data.user.userId)
        console.log("USERID :", data.user.userId)
        this.router.navigate(["products"])
      }
    })
  }

  handleRegister() {
    // Implement your registration logic here
  }
}
