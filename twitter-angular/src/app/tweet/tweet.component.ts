import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { TweetCreateComponent } from '../tweet-create/tweet-create.component';
import { TweetUpdateComponent } from '../tweet-update/tweet-update.component';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TweetComponent implements OnInit {

  data: any[] = []; // Initialize an empty array to store the fetched data

  baseApiUrl: string =  environment?.baseApiUrl;
 
  constructor(private http: HttpClient, private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    debugger
    this.fetchData();
  }

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
      this.http.get<any[]>(this.baseApiUrl +'/api/tweet', { headers }).subscribe((data) => {
        debugger
        this.data = data;
      });
    } else {
      // Handle the case where the token is not available
      let error: string = "Error fetching data";
      console.error('Error fetching data:', error);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TweetCreateComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle any data passed back from the dialog
        console.log('Dialog result:', result);
      }
    });
  }

  openCardDialog(): void {
    const dialogRef = this.dialog.open(TweetUpdateComponent, {
      panelClass: 'custom-dialog',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle any data passed back from the dialog
        console.log('Dialog result:', result);
      }
    });
  }
  // openDialog(): void {
  //   const dialogRef = this.dialog.open(TweetCreateComponent, {
  //     width: '400px',
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       // Handle any data passed back from the dialog
  //       console.log('Dialog result:', result);
  //     }
  //   });
  // }
}
