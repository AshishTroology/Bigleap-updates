import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { url, api_key } from '../global';
@Injectable({
  providedIn: 'root'
})
export class DealFormService {
  constructor(private http:HttpClient) { }

  base_url=url+"/deals"
  api_key=api_key


  submitForm(data:any){
    console.log(data.attachments)
    let api_url=this.base_url+"/createdeal"
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    }
    return this.http.post(api_url,data,httpOptions)
  }

  getDealData(id:any){
    console.log(id)
    let api_url=this.base_url+"/getdealbyid/"+id
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    }
    return this.http.get(api_url,httpOptions)
  }

  getAllDeals(){
    let api_url=this.base_url+"/getdeals"
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    }
    return this.http.get(api_url,httpOptions)
  }


  deleteDeal(id:any){

    let api_url=this.base_url+"/deletequote/"+id
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    }
    return this.http.get(api_url,httpOptions)
  }
}
