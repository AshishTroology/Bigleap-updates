import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { url, api_key } from '../global';
@Injectable({
  providedIn: 'root',
})
export class LeadFormService {
  constructor(private http: HttpClient) {}

  // base_url = 'https://epr.troology.com/dt/leads';
  base_url = url + '/leads';
  api_key = api_key;

  submitForm(data: any) {
    console.log(data.attachments);
    let api_url = this.base_url + '/savelead';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  getLeadData(id: any) {
    console.log(id);
    let api_url = this.base_url + '/getleadbyid/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  getAllLead() {
    let api_url = this.base_url + '/getleads';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  getAllLogsById(id: any) {
    let api_url = this.base_url + '/getleadlogs/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  getOneLog(id: any) {
    let api_url = this.base_url + '/getoneleadlogs/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  deleteLead(id: any) {
    let api_url = this.base_url + '/deletelead/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  getAll() {
    let api_url = this.base_url + '/getAll';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

   getAllDashboard() {
    let api_url = this.base_url + '/getAllDashboard';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.get(api_url, httpOptions);
  }
}
