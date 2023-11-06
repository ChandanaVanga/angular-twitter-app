import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tweet-update',
  templateUrl: './tweet-update.component.html',
  styleUrls: ['./tweet-update.component.css']
})
export class TweetUpdateComponent implements OnInit {

  comments: any[] = []; // Initialize an empty array to store the fetched data

  comment: any;

  baseApiUrl: string =  environment?.baseApiUrl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, public dialogRef: MatDialogRef<TweetUpdateComponent>, private router: Router) {}

  ngOnInit(): void {
    debugger
    // this.fetchData()
    const tweet_id = this.data.tweet_id;
    this.getDataById(tweet_id);
  }
  
  fetchData(): void {
    const authToken = localStorage.getItem('authToken');
    //const authToken = this.authService.getToken();

    if (authToken) {
      // Construct headers with the JWT token
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
      });

      // Make the HTTP request with the token
      this.http.get<any[]>(this.baseApiUrl +'/api/comment', { headers }).subscribe((comments) => {
        debugger
        this.comments = comments;
      });
    } else {
      // Handle the case where the token is not available
      let error: string = "Error fetching data";
      console.error('Error fetching data:', error);
    }
  }

  getDataById(tweet_id: number) {
    debugger
    const url = this.baseApiUrl +`/api/comment/${tweet_id}`; 

    this.http.get(url).subscribe((response) => {
      debugger
      this.comment = response; // Assign the fetched data to the property
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  // onDeleteButtonClick(tweet_id: number): void {
  //   if (confirm('Are you sure you want to delete this tweet?')) {
  //     this.deleteTweet(tweet_id);
  //     this.router.navigate(['/tweet']);
  //   }

  // }


  onDeleteTweet(tweet_id: number): void {
    const authToken = localStorage.getItem('authToken'); 
  
    if (authToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
      });
  
      // Make an HTTP DELETE request to API with the tweet ID
      this.http.delete(`${this.baseApiUrl}/api/tweet/delete/${tweet_id}`, { headers }).subscribe(() => {
        console.log('Tweet deleted successfully.');
        // Optionally, update data array or fetch data again to reflect the changes.
        this.fetchData();
        window.location.reload();
        this.router.navigate(['/tweet']);
      });
    } else {
      console.error('Error: Unauthorized');
      // Handle the case where the user is not authorized.
    }
  }
  

  onDeleteComment(comment_id: number): void {
    const authToken = localStorage.getItem('authToken'); 
  
    if (authToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
      });
  
      // Make an HTTP DELETE request to API with the tweet ID
      this.http.delete(`${this.baseApiUrl}/api/comment/${comment_id}`, { headers }).subscribe(() => {
        console.log('Tweet deleted successfully.');
        this.fetchData();
      });
    } else {
      console.error('Error: Unauthorized');
      // Handle the case where the user is not authorized.
    }
  }
}



