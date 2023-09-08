import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private loggedInStatus = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn = this.loggedInStatus.asObservable();
  
  constructor() { }

  private hasToken(): boolean {
    return !!localStorage.getItem('userToken'); // Assuming you store JWT in localStorage
  }

  setLoginState(jwt: string): void {
    if (jwt) {
      localStorage.setItem('userToken', jwt);
      this.loggedInStatus.next(true);
    }
  }

  logout(): void {
    localStorage.removeItem('userToken');
    this.loggedInStatus.next(false);
  }

  // Inside LoginStateService

get currentLoginState(): boolean {
  return this.loggedInStatus.value;
}

}
