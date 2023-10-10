import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  // item = {
  //   user_name:'',
  //   title:'',
  //   created_at: ''
  // }

  data: any[] = []; // Initialize an empty array to store the fetched data


  baseApiUrl: string =  environment?.baseApiUrl;
  
  // getall(): Observable<any[]> {
  //   // Replace 'your-api-endpoint' with the actual URL of your API.
  //   return this.http.get<any[]>(this.baseApiUrl +'/api/tweet/all');
    
  // }





  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const authToken = this.authService.getToken();

    if (authToken) {
      // Construct headers with the JWT token
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
      });

      // Make the HTTP request with the token
      this.http.get<any[]>(this.baseApiUrl +'/api/tweet', { headers }).subscribe((data) => {
        this.data = data;
      });
    } else {
      // Handle the case where the token is not available
    }
  }
}
