import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { base_url } from '../global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoApplicantService {
  constructor(private http: HttpClient) {}

  saveCoApplicant(data: any) {
    let api_url = base_url + 'coApplicantSave';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  listCoApplicant(id: any) {
    let api_url = base_url + 'coApplicantlist/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  updateByIdCoApplicant(data: any,id:any) {
    let api_url = base_url + 'updateByIdCoApplicant/'+id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  getByIdCoApplicant(id: any) {
    let api_url = base_url + 'getByIdCoApplicant/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }
}
