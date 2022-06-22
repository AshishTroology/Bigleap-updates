import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { url, api_key } from '../global';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  base_url = url;
  api_key = api_key;
  submitForm(data: any) {
    let api_url = this.base_url + '/account/create-account';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  getAccountData(id: any) {
    console.log(id);
    let api_url = this.base_url + '/account/getaccountdetails/' + id;
    console.log(api_url);
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  getAllAccount() {
    let api_url = this.base_url + '/account/getallaccounts';

    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  deleteAccount(id: any) {
    let api_url = this.base_url + '/account/deleteaccount/' + id;

    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.delete(api_url, httpOptions);
  }

  getStates(statename: any) {
    let api_url = this.base_url + '/account/getstatebycountry';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.post(api_url, statename, httpOptions);
  }
}
