import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse,HttpEvent,HttpHandler,HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { base_url, base_url_upload } from '../global';
import { Observable,of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ApplicantService implements HttpInterceptor {
  constructor(private http: HttpClient) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
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
    }));
  }

  submitForm(data: any) {
    let api_url = base_url + 'applicant';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  addApplicantwithEOI(data: any) {
    let api_url = base_url + 'addApplicantwithEOI';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        // 'apikey': this.api_key
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  getApplicant() {
    let api_url = base_url + 'viewApplicant';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        // 'apikey': this.api_key
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  GetApplicantSingle(id: any) {
    let api_url = base_url + 'editApplicant/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  GetAdminApplicantSingleEmail(email: any) {
    let api_url = base_url + 'GetAdminApplicantSingleEmail/' + email;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, httpOptions);
  }

  GetAdminApplicantSingle(id: any) {
    let api_url = base_url + 'editApplicantAdmin/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }
  GetAdminApplicantSinglebyemail(email: any) {
    let api_url = base_url + 'editApplicantbyemail/' + email;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  updateApplicant(data: any, id: any) {
    let api_url = base_url + 'updateapplicant/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        // 'apikey': this.api_key
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  updateApplicantWithEOI(data: any, id: any) {
    let api_url = base_url + 'updateApplicantWithEOI/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        // 'apikey': this.api_key
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  adminApplicantGetPass(id: any, user: any) {
    let api_url = base_url + 'createPassword/' + id + '/' + user;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        // 'apikey': this.api_key
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  createPassword(data: any, user: any) {
    let api_url = base_url + 'PasswordSave/' + data.id + '/' + user;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        // 'apikey': this.api_key
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  getallstates() {
    let api_url = base_url + 'getState';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  getDistrict() {
    let api_url = base_url + 'getDistrict';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        // 'apikey': this.api_key
      }),
    };
    return this.http.post(api_url, httpOptions);
  }

  getAllAssessors() {
    let api_url = base_url + 'viewAssessors';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  getallsection() {
    let api_url = base_url + 'viewAllSection';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  DeleteApplicant(id: any) {
    let api_url = base_url + 'applicantDelete/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  applicantReSendEOI(data: any, id: any) {
    let api_url = base_url + 'applicantReSendEOI/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        // 'apikey': this.api_key
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  signUp(data: any) {
    let api_url = base_url + 'signUp';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        // 'apikey': this.api_key
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  accountActive(id: any) {
    let api_url = base_url + 'accountActive/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        // 'apikey': this.api_key
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  updateAdminApplicantSingleEmail(data: any, id: any) {
    let api_url = base_url + 'updateAdminApplicantSingleEmail/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        // 'apikey': this.api_key
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  acountDetails(id: any) {
    let api_url = base_url + 'accountActiveDetails/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        // 'apikey': this.api_key
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  getSector() {
    let api_url = base_url + 'getSector';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  getproduct(data: any) {
    let api_url = base_url + 'getProducts';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const request = new HttpRequest('POST', base_url_upload + 'upload', formData, {
      reportProgress: false,
      responseType: 'text',
    });

    return this.http.request(request);
  }

  uploadImage(data: any) {
    let api_url = base_url_upload + 'upload';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        Accept: 'multipart/form-data',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  sendActivationEmail(id: any) {
    let api_url = base_url + 'sendActivationEmail/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        // 'apikey': this.api_key
      }),
    };
    return this.http.get(api_url, httpOptions);
  }
}







