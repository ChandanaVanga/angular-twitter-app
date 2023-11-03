import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tweet-update',
  templateUrl: './tweet-update.component.html',
  styleUrls: ['./tweet-update.component.css']
})
export class TweetUpdateComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, public dialogRef: MatDialogRef<TweetUpdateComponent>) {}

  comments: any = {
    tweet_id: '',
    user_id: '',
    user_name: '',
    text: '',
    created_at: ''
  }; // Initialize an empty array to store the fetched data


  baseApiUrl: string =  environment?.baseApiUrl;
  
  fetchData(): void {
    debugger
    const authToken = localStorage.getItem('authToken');
    //const authToken = this.authService.getToken();

    if (authToken) {
      // Construct headers with the JWT token
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
      });

      // Make the HTTP request with the token
      this.http.get<any[]>(this.baseApiUrl +'/api/comment', { headers }).subscribe((comment) => {
        debugger
        this.comments = comment;
      });
    } else {
      // Handle the case where the token is not available
      let error: string = "Error fetching data";
      console.error('Error fetching data:', error);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}



