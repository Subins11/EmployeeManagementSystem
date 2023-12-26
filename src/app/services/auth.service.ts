import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private isAdmin = false;

  constructor() {
    const isAuthenticatedString = localStorage.getItem('isAuthenticated');
    const isAdminString = localStorage.getItem('isAdmin');

    if (isAuthenticatedString && isAdminString) {
      this.isAuthenticated = JSON.parse(isAuthenticatedString);
      this.isAdmin = JSON.parse(isAdminString);
    }
  }

// Login Function

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      this.isAuthenticated = true;
      this.isAdmin = true;
    } else if (username === 'user' && password === 'user') {
      this.isAuthenticated = true;
      this.isAdmin = false;
    }

    // Store authentication state in localStorage

    localStorage.setItem('isAuthenticated', this.isAuthenticated.toString());
    localStorage.setItem('isAdmin', this.isAdmin.toString());

    return this.isAuthenticated;
  }


// Logout Function

  logout(): void {
    console.log('Logging out...');
    this.isAuthenticated = false;
    this.isAdmin = false;

// Remove authentication state from localStorage on logout

    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAdmin');
  }

  isAdminUser(): boolean {
    return this.isAdmin;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}