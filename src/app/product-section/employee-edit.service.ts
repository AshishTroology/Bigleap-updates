import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { Product } from './product.model';

import { Employee } from './employee';

const CREATE_ACTION = 'Create';
const UPDATE_ACTION = 'Update';
const REMOVE_ACTION = 'Destroy';

function noop() {
  /* */
}

@Injectable()
export class EmployeeEditService extends BehaviorSubject<Product[]> {
  FirstIndex: any;
  constructor(private http: HttpClient) {
    super(null as any);
  }

  public read(): void {
    this.fetch('')
      .pipe(take(1))
      .subscribe((data) => this.next(data));
  }

  public fetchChildren(reportsTo: any = null): Observable<Product[]> {
    return this.fetch('', null, reportsTo);
  }

  public update(item: Employee): void {
    this.save(item, this.FirstIndex, false).pipe(take(1)).subscribe(noop);
  }

  public save(
    item: Employee,
    parent: Employee,
    isNew: boolean
  ): Observable<Product[]> {
    const action = isNew ? CREATE_ACTION : UPDATE_ACTION;

    return this.fetch(action, item).pipe(
      tap(() => {
        if (!parent && isNew) {
          this.read();
        }
      })
    );
  }

  public remove(item: any, parent?: Product): Observable<Product[]> {
    return this.fetch(REMOVE_ACTION, item).pipe(
      tap(() => {
        if (!parent) {
          this.read();
        }
      })
    );
  }

  private fetch(
    action: string = '',
    data?: any,
    id?: any
  ): Observable<Product[]> {
    let params = new HttpParams();

    if (typeof id !== 'undefined') {
      params = params.set('id', id);
    }

    if (data) {
      params = params.set('models', JSON.stringify([data]));
    }

    return this.http.jsonp<Product[]>(
      `https://demos.telerik.com/kendo-ui/service/Products/${action}?${params.toString()}`,
      'callback'
    );
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
}
