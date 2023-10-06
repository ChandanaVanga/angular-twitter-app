import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // baseApiUrl: string =  environment?.baseApiUrl;

  // constructor(private http:HttpClient) { }

  // postUser(body:any){
  //   return this.http.post(this.baseApiUrl + '/api/users/registration', body)
  // }

  // fetchMobiles(){

  // fetchMobiles() {
  //  return this.http.get(this.baseApiUrl + '/api/mobile');
  // }

  // deleteMobile(id:any) {
  //   return this.http.delete(this.baseApiUrl + '/api/mobile/' + id)
  // }
}
