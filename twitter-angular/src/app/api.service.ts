import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api/tweet'; // Replace with your API endpoint
  // baseApiUrl: string =  environment?.baseApiUrl;


  constructor(private http: HttpClient) { }

  getAllData(): Observable<any[]> {
    // Construct headers with the JWT token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Retrieve the token from Local Storage
    });

    // Make the HTTP request with the token
    return this.http.get<any[]>(`${this.apiUrl}`, { headers });
  }
}