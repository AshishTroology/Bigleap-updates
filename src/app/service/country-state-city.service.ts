import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url, api_key } from '../global';
@Injectable({
  providedIn: 'root'
})
export class CountryStateCityService {

  constructor(private http:HttpClient) { }
   accessToken="ftgBHGJeG_Og0YsTsHAgbWlCNDK_ezwpvjvQzU4hHOPROgG5Q10mwgKmNICdUdNCFMc"
  // getStates(country:any){
  //   let api_url="https://www.universal-tutorial.com/api/states/"+country

  //   const httpOptions={
  //     headers:new HttpHeaders({
  //       'content-type':'application/json',
  //       'Authorization': this.accessToken
  //     }),
  //   }
  //   return this.http.get(api_url,httpOptions)
  // }

  base_url:any=url
  api_key=api_key


  getStates(statename:any) {
    let api_url = this.base_url+ '/account/getstatebycountry';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': this.api_key
      }),
    };
    return this.http.post(api_url,statename, httpOptions);
  }

  getCity(state:any){
    let api_url="https://www.universal-tutorial.com/api/cities/"+state

    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json',
        'Authorization': this.accessToken
      }),
    }
    return this.http.get(api_url,httpOptions)
  }
}


