import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { url, api_key } from '../global';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductserviceService extends BehaviorSubject<any> {
  public loading = false;

  constructor(private http: HttpClient) {
    super(null);
  }
  fetchData(action: string = '', data?: Product): Observable<Product[]> {
    return this.http.jsonp<Product[]>(
      `https://demos.telerik.com/kendo-ui/service/Products/${action}?${this.serializeModels(
        data
      )}`,
      'callback'
    );
  }

  private serializeModels(data?: Product): string {
    return data ? `&models=${JSON.stringify([data])}` : '';
  }
  public search(value: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: api_key,
      }),
    };
    return this.http.post(url + '/master/getAllDataSearch', value, httpOptions);
  }

  public searchByPartNo(value: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: api_key,
      }),
    };
    return this.http.post(
      url + '/master/getSearchByPartNo',
      value,
      httpOptions
    );
  }

  public query() {
    // this.fetch().subscribe((x: any) => super.next(x));
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: api_key,
      }),
    };
    return this.http.get(url + '/master/product', httpOptions);
  }

  private fetch(): any {
    this.loading = true;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: api_key,
      }),
    };
    return this.http.get(url + '/master/product', httpOptions).pipe(
      map((response: any) => response.result),
      tap(() => (this.loading = false))
    );
  }
}
