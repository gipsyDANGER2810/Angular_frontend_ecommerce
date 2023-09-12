import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LoginServiceService } from 'src/app/services/login-service.service';
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
  userId : string = ''
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
    private productService : ProductService,
    private loginService : LoginServiceService
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
      console.log("Login unsuccessful")
      // return "lund hilla ab";
    }
    this.username = userName;
    this.password = pwd;
    this.customerService.loginUser(this.username,this.password).subscribe((data : any)=>{
      console.log("login successful")
      console.log(data)
      this.JWT = data.jwt
      this.userId = data.user.userId

      if(this.JWT){
        
        this.productService.getRecommendedProducts(data.user.userId).subscribe((response:any)=>{
          sessionStorage.setItem('productsForUser' , JSON.stringify(response))
          localStorage.setItem('userToken', this.JWT);
          localStorage.setItem('userID', this.userId);
          this.loginService.setLoginState(this.JWT);
          console.log('API Response:', data);
          this.router.navigate(["products"])
        }, error => {
          console.error('API Error:', error);
        }
        );
      }
    })
  }

  logout() {
    this.loginService.logout();
    
    // navigate user to login or another page...
  }
  

  handleRegister(userNameRegister : string , passwordRegister : string) {
    this.username = userNameRegister;
    this.password = passwordRegister;
    this.customerService.registerUser(this.username,this.password).subscribe((data) => {
      console.log("Register Successful")
    },
    error =>{
      console.error('API Error:', error)
    }
    )
  }
}
