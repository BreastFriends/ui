import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private loggedInUser: string | null = null;

  login(username: string, password: string): boolean {
    if (username === 'doc' && password === 'doc') {
      this.isAuthenticated = true;
      this.loggedInUser = 'Dr. Ana Anić';
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.loggedInUser = null;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getLoggedInUser(): string | null {
    return this.loggedInUser;
  }
}
