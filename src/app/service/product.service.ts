import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url, api_key } from '../global';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  timer: any;
  itemList = [];
  base_url: any = url + '/master/';
  api_key = api_key;
  constructor(private http: HttpClient) {}

  productCount() {
    let api_url = this.base_url + 'productCount';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.get(api_url, httpOptions);
  }
  getAllProduct() {
    let api_url = this.base_url + 'product';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  getproductmaster(id: any) {
    let api_url = this.base_url + 'getproductmaster/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  update_productmaster(data: any, id: any) {
    let api_url = this.base_url + '/update_productmaster/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  deleteNewProduct(id: any) {
    let api_url = this.base_url + '/deleteNewProduct/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  addNewProductMAster(data: any) {
    let api_url = this.base_url + 'addNewProductMAster';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  getSearchByPartNo(data: any) {
    let api_url = this.base_url + 'getSearchByPartNo';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  productmaster() {
    let api_url = this.base_url + 'productmaster';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  getProductDataSearch(lim: any) {
    let api_url = this.base_url + 'getAllDataSearch';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.post(api_url, lim, httpOptions);
  }

  getAllProductLimit(lim: any) {
    let api_url = this.base_url + 'productlimit';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.post(api_url, lim, httpOptions);
  }

  createGroup(data: any) {
    console.log(data);
    let api_url = this.base_url + 'create-group';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  getGroups(id: any) {
    let api_url = this.base_url + 'get-groups/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  deleteGroup(id: any) {
    let api_url = this.base_url + 'delete-group/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  AddProduct(data: any) {
    let api_url = this.base_url + 'add-product';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  getAllNewProducts() {
    let api_url = this.base_url + 'get-all-new-product';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  getAllNewGroups() {
    let api_url = this.base_url + 'get-all-new-groups';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  getAllSalesPerson() {
    let api_url = this.base_url + 'all-sales-person';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  getSalesPerson(id: any) {
    let api_url = this.base_url + 'get-sales-person/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  getproduct(id: any) {
    let api_url = this.base_url + '/getproductsbyid/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  updateForm(data: any, id: any) {
    let api_url = this.base_url + '/updateproductsbyid/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  bulkAddProduct(data: any) {
    let api_url = this.base_url + 'bulk-product';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: this.api_key,
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }
}
