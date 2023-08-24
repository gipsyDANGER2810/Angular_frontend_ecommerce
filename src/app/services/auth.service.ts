import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

username: string = '';
password: string = '';

  constructor(private http : HttpClient) { }


  login(username: string, password: string) {
    return this.http.get(`http://localhost:8080/api/login`,
      { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
        this.username = username;
        this.password = password;
        this.registerSuccessfulLogin(username);
      }));
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ":" + password);
  }

  registerSuccessfulLogin(username : string) {
    // save the username to session
    window.sessionStorage.setItem('authenticatedUser', this.username);
  }
}
