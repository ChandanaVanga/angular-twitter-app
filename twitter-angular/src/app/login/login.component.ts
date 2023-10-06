import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
credentials = {
  email:'',
  passwor_d:''
}

constructor(private http: HttpClient, private router: Router) {}
validationErrors: any = {};

baseApiUrl: string =  environment?.baseApiUrl;
login() {
  const apiUrl = this.baseApiUrl + '/api/users/login'
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  // debugger
  this.http.post(apiUrl, this.credentials, httpOptions).subscribe(
    (response:any) => {
      // console.log('Response:', response)
      if (response && response.token) {
        // Successfully logged in, you can navigate to the desired route.
        const token = response.token;
        this.router.navigate(['/tweet']);
      } else {
        // Handle the case where the response does not contain a token.
        console.error('Login response does not contain a token:', response);
        // Display an error message to the user or take other appropriate action.
      }
    },
    (error) => {
      // debugger
      console.error('Login failed:', error);
    }
  )
}
}




