import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: any = {
    email: '',
    name: '',
    passwor_d: ''
  };

  constructor(private http: HttpClient) {}
  baseApiUrl: string =  environment?.baseApiUrl;

  createUser() {
    // this.baseApiUrl + '/api/users/registration'
    const apiUrl =  this.baseApiUrl +'/api/users/registration'; // Replace with your API endpoint URL

    // Set headers (if needed)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(apiUrl, this.user, { headers }).subscribe(
      (response) => {
        console.log('User created successfully:', response);
        // Handle success here, such as displaying a success message.
      },
      (error) => {
        console.error('Error creating user:', error);
        // Handle error here, such as displaying an error message.
      }
    );
  }
}
