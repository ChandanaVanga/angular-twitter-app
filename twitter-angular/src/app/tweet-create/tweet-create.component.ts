import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit  } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { Tweet } from '../models/tweet';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tweet-create',
  templateUrl: './tweet-create.component.html',
  styleUrls: ['./tweet-create.component.css'],
  
})
export class TweetCreateComponent implements OnInit {
  submitted = false;
  tweet: any = {
    title: '',
  };
  constructor(public dialogRef: MatDialogRef<TweetCreateComponent>, private http: HttpClient, private authService: AuthService, private router: Router) { }
  baseApiUrl: string =  environment?.baseApiUrl;


  ngOnInit() {
  }

  // This method is called when the "Close" button is clicked in the dialog.
  closeDialog(): void {
    this.dialogRef.close();
  }

  createTweet() {
    const apiUrl = this.baseApiUrl + '/api/tweet/create';
    //const token = this.authService.getToken();
    const authToken = localStorage.getItem('authToken');
  
    if (!authToken) {
      console.error('Authentication token is missing. Please log in.');
      return;
    }
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`, // Include the token in the Authorization header
    });
  
    this.http.post(apiUrl, this.tweet, { headers }).subscribe(
      (response) => {
        console.log('Tweet created successfully:', response);
        window.location.reload();
        this.router.navigate(['/tweet']);
      },
      (error) => {
        console.error('Error creating tweet:', error);
      }
    );
  }

 
  
}
