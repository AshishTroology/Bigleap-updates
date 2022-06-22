import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url, api_key } from '../global';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  base_url=url
  api_key=api_key

  constructor(private http:HttpClient) { }


  submitForm(data:any){
    let api_url=this.base_url+"/company/create-company"
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    }
    return this.http.post(api_url,data,httpOptions)
  }

  getCompanyData(id:any){
    console.log(id)
    let api_url=this.base_url+"/company/getcompanybyid/"+id

    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    }
    return this.http.get(api_url,httpOptions)
  }

  AddressSubmit(data:any){
    let api_url=this.base_url+"/company/saveaddress"

    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    }

    return this.http.post(api_url,data,httpOptions)
  }

  GetAddress(){
    let api_url=this.base_url+"/company/getaddress"

    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    }

    return this.http.get(api_url,httpOptions)
  }

  getBranch(id:any){
    let api_url=this.base_url+"/company/getbranchaddress/"+id
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    }
    return this.http.get(api_url,httpOptions)
  }

  DeleteAddress(id:any){

    let api_url=this.base_url+"/company/deleteaddress/"+id

    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    }

    return this.http.delete(api_url,httpOptions)
  }



  UploadFile(files:any,id:any){
    let api_url=this.base_url+"/upload"
    const formData = new FormData()
    const httpOptions={
      headers:new HttpHeaders({
        'Accept-Encoding':"multipart/form-data",
        'apikey': this.api_key
      }),
    }
    formData.append("image", files[0], files[0].name)
    formData.append("attachmentid",id)
    return this.http.post(api_url,formData,httpOptions)
  }

}
