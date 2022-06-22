import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, take } from 'rxjs/operators';

import { Employee } from './employee';

const CREATE_ACTION = 'Create';
const UPDATE_ACTION = 'Update';
const REMOVE_ACTION = 'Destroy';
const nullvalue:any=null;

function noop() { /* */ }

@Injectable()
export class EmployeeEditService  extends BehaviorSubject<Employee[]|null> {
    constructor(private http: HttpClient) {
        super(null);
    }

    public read(): void {
        this.fetch('')
            .pipe(take(1))
            .subscribe(data => this.next(data));
    }

    public fetchChildren(reportsTo: number): Observable<Employee[]> {
        return this.fetch('', null, reportsTo);
    }

    public update(item: Employee): void {
        this.save(item, nullvalue, false)
            .pipe(take(1))
            .subscribe(noop);
    }

    public save(item: Employee, parent: Employee, isNew: boolean): Observable<Employee[]> {
        const action = isNew ? CREATE_ACTION : UPDATE_ACTION;

        return this.fetch(action, item).pipe(tap(() => {
            if (!parent && isNew) {
                this.read();
            }
        }));
    }

    public remove(item: any, parent?: Employee): Observable<Employee[]> {
        return this.fetch(REMOVE_ACTION, item).pipe(tap(() => {
            if (!parent) {
                this.read();
            }
        }));
    }

    private fetch(action: string = '', data?: any, id?: any): Observable<Employee[]> {
        let params = new HttpParams();

        if (typeof id !== 'undefined') {
            params = params.set('id', id);
        }

        if (data) {
            params = params.set('models', JSON.stringify([data]));
        }
        console.log(`https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/${action}?${params.toString()}`)
        return this.http.jsonp<Employee[]>(
            `https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/${action}?${params.toString()}`,
            'callback'
        );
    }
}