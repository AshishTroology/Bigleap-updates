import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { base_url } from '../global';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isloggedIn: boolean = false;
  constructor(private http: HttpClient, private router: Router) {}

  loginUser(data: any) {
    let api_url = base_url + '/login';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        // 'apikey': this.api_key
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  CheckEmail(email: any) {
    let api_url = base_url + '/checkemail';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        // 'apikey': this.api_key
      }),
    };
    return this.http.post(api_url, email, httpOptions);
  }

  SendEmail(email: any) {
    let api_url = base_url + '/sendmail';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        // 'apikey': this.api_key
      }),
    };
    return this.http.post(api_url, email, httpOptions);
  }

  VerifyEmail(data: any) {
    let api_url = base_url + '/verify-otp';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        // 'apikey': this.api_key,
        'Referrer-Policy': 'no-referrer',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  userLoggedIn() {
    let email = localStorage.getItem('user')
      ? localStorage.getItem('user')
      : this.router.navigate(['/login']);
    console.log(email);
    let api_url = base_url + '/get-user';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        // 'apikey': this.api_key
      }),
    };
    return this.http.post(api_url, { email }, httpOptions);
  }

  getAllUsers() {
    let api_url = base_url + '/get-allusers';

    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        // 'apikey': this.api_key
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  ChangePassword(data: any, id: any) {
    let api_url = base_url + 'ChangePassword/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  resetPassword(data: any) {
    let api_url = base_url + 'resetPassword';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  resetPasswordSave(data: any, id: any) {
    let api_url = base_url + 'resetPasswordSave/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }
}
