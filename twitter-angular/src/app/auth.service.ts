import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Define a variable to store the token
  private authToken: string | null = null;

  constructor() {}

  // Method to set the token in the service
  setToken(token: string | null): void {
    this.authToken = token;
  }

  // Method to get the token from the service
  getToken(): string | null {
    return this.authToken;
  }
}
