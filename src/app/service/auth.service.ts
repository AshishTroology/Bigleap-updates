import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {url,api_key} from '../global';

import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  base_url = url + '/user';
  api_key = api_key;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status >= 200 && err.status < 300) {
          const res = new HttpResponse({
            body: null,
            headers: err.headers,
            status: err.status,
            statusText: err.statusText,
            url: err.url?.toString(),
          });

          return of(res);
        } else {
          return Observable.throw(err);
        }
      })
    );
  }

  loginUser(data: any) {
    let api_url = this.base_url + '/login';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        apikey: this.api_key,
      }),
    };

    return this.http.post(api_url, data, httpOptions);
  }

  CheckEmail(email: any) {
    let api_url = this.base_url + '/checkemail';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        apikey: this.api_key,
      }),
    };
    return this.http.post(api_url, email, httpOptions);
  }

  SendEmail(email: any) {
    let api_url = this.base_url + '/sendmail';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        apikey: this.api_key,
      }),
    };
    return this.http.post(api_url, email, httpOptions);
  }

  VerifyEmail(data: any) {
    let api_url = this.base_url + '/verify-otp';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        apikey: this.api_key,
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
    let api_url = this.base_url + '/get-user';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        apikey: this.api_key,
      }),
    };
    return this.http.post(api_url, { email }, httpOptions);
  }

  getAllUsers() {
    console.log(this.api_key);
    let api_url = this.base_url + '/get-allusers';

    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        apikey: this.api_key,
      }),
    };
    return this.http.get(api_url, httpOptions);
  }
}
