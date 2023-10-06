import { HttpClient } from '@angular/common/http';
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
  username:'',
  password:''
}

constructor(private http: HttpClient, private router: Router) {}
validationErrors: any = {};

baseApiUrl: string =  environment?.baseApiUrl;

login() {
  const apiUrl = this.baseApiUrl + '/api/users/login'
  // return this.http.get(this.baseApiUrl + '/api/mobile');

  this.http.post(apiUrl, this.credentials).subscribe(
    (response:any) => {
      const token = response.token
      this.router.navigate(['/tweet']);
    },
    (errorResponse) => {
      if (errorResponse.status === 400) {
        // Handle validation errors
        this.validationErrors = errorResponse.error.errors;
      } else {
        console.error('Login failed:', errorResponse);
      }
    }
  )
}
}




