import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginObj: any = {
    UserId: 0,
    UserName: '',
    Password: '',
    Result: false,
    Message: ''
  };
  registerObj: any = {
    UserId: 0,
    UserName: '',
    Password: '',
    CreatedDate: new Date()
  };
  isRegister: boolean = false;
  constructor(private router: Router, private http: HttpClient, private customerService:CustomerService) { }

  ngOnInit(): void {
  }
  onRegister() {
    this.customerService.addUser(this.registerObj)
  }
  onLogin() {
    debugger;
    this.http.post("http://localhost:61334/api/Registration/Login", this.loginObj).subscribe((response: any) => {
      debugger;
      if (response.result) {
        alert(response.message)
        this.router.navigateByUrl('way2user-dashboard');
      } else {
        alert(response.message)
      }
    })

  }
}
