import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url, api_key } from '../global';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  base_url: any = url+'/performance';
  constructor(private http: HttpClient) {}

  submitForm(data: any) {
    let api_url = this.base_url;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: api_key,
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  getall() {
    let api_url = this.base_url + '/getall';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: api_key,
      }),
    };
    return this.http.get(api_url, httpOptions);
  }
  getbyid(id:any){
    let api_url=this.base_url+"/getbyid/"+id
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': api_key,
      }),
    }
    return this.http.get(api_url,httpOptions)
  }
  updateForm(data: any, id: any) {
    let api_url = this.base_url + '/updatebyid/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: api_key,
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }
}

