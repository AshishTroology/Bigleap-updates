import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url, api_key } from '../global';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {

  constructor(private http: HttpClient) {}
  base_url = url+'/service';

  submitForm(data: any) {
    let api_url = this.base_url + '/';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: api_key,
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }
  getallservice() {
    let api_url = this.base_url + '/getallservice';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: api_key,
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  getservicebyid(id:any){
    let api_url=this.base_url+"/getservicebyid/"+id
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': api_key,
      }),
    }
    return this.http.get(api_url,httpOptions)
  }
  updateForm(data: any, id: any) {
    let api_url = this.base_url + '/updateservicebyid/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: api_key,
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }
}
