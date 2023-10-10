import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
// import { AuthService } from './auth.service'; // Import your AuthService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    email: '',
    passwor_d: ''
  }

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}
  validationErrors: any = {};

  baseApiUrl: string =  environment?.baseApiUrl;

  login() {
    const apiUrl = this.baseApiUrl + '/api/users/login'
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post(apiUrl, this.credentials, httpOptions).subscribe(
      (response: any) => {
        if (response && response.token) {
          // Successfully logged in, store the token and navigate to the /tweet route.
          const token = response.token;
          
          // Store the token in Local Storage using your AuthService
          this.authService.setToken(token);

          // Navigate to the /tweet route
          this.router.navigate(['/tweet']);
        } else {
          // Handle the case where the response does not contain a token.
          console.error('Login response does not contain a token:', response);
          // Display an error message to the user or take other appropriate action.
        }
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}
