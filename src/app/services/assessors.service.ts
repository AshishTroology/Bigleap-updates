import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { base_url } from '../global';

@Injectable({
  providedIn: 'root'
})
export class AssessorsService {

  constructor(private http:HttpClient) { }
  addAssessor(data:any){
    let api_url=base_url+"assessors"
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        // 'apikey': this.api_key
      }),
    }
    return this.http.post(api_url,data,httpOptions)
  }


  addAssessorsWithEOI(data:any){
    let api_url=base_url+"addAssessorsWithEOI"
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        // 'apikey': this.api_key
      }),
    }
    return this.http.post(api_url,data,httpOptions)
  }

  getAssessors(){
    let api_url=base_url+"viewAssessors"
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        // 'apikey': this.api_key
      }),
    }
    return this.http.get(api_url,httpOptions)
  }
  adminApplicantGetPass(id:any,user:any){
    let api_url=base_url+"createPassword/"+id+"/"+user
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        // 'apikey': this.api_key
      }),
    }
    return this.http.get(api_url,httpOptions)
  }

  createPassword(data:any,user:any){
    let api_url=base_url+"PasswordSave/"+data._id+"/"+user
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        // 'apikey': this.api_key
      }),
    }
    return this.http.post(api_url,data,httpOptions)
  }
  GetAssessorSingle(id:any){
    let api_url=base_url+"editAssessors/"+id
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
      }),
    }
    return this.http.get(api_url,httpOptions)
  }

  GetAdminApplicantSingle(id:any){
    let api_url=base_url+"editAssessorsAdmin/"+id
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
      }),
    }
    return this.http.get(api_url,httpOptions)
  }

  updateAssessors(data:any,id:any){
    let api_url=base_url+"updateAssessors/"+id
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        // 'apikey': this.api_key
      }),
    }
    return this.http.post(api_url,data,httpOptions)
  }


updateAssessorsWithEOI(data:any,id:any){
  let api_url=base_url+"updateAssessorsWithEOI/"+id
  const httpOptions={
    headers:new HttpHeaders({
      'content-type':'application/json;charset=UTF-8',
      // 'apikey': this.api_key
    }),
  }
  return this.http.post(api_url,data,httpOptions)
}

assessorReSendEOI(data:any,id:any){
  let api_url=base_url+"assessorReSendEOI/"+id
  const httpOptions={
    headers:new HttpHeaders({
      'content-type':'application/json;charset=UTF-8',
      // 'apikey': this.api_key
    }),
  }
  return this.http.post(api_url,data,httpOptions)
}
}
