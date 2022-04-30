import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { url, api_key } from '../global';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }
  base_url=url+"/contact"
  api_key=api_key

  SubmitForm(data:any){
    let api_url=this.base_url+"/create-contact"

    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    }
    return this.http.post(api_url,data,httpOptions)
  }

  getContactData(id:any){
    console.log(id)
    let api_url=this.base_url+"/get-contact/"+id

    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    }
    return this.http.get(api_url,httpOptions)
  }

  getAllContact(){
    let api_url=this.base_url+"/getallcontact"

    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    }
    return this.http.get(api_url,httpOptions)
  }

  getCompanyContact(id:any){
    console.log(id)
    let api_url=this.base_url+"/getcompanycontact"+id

    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    }
    return this.http.get(api_url,httpOptions)
  }

  deleteContact(id:any){
    let api_url=this.base_url+"/deletecontact/"+id

    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    }
    return this.http.delete(api_url,httpOptions)
  }
}
