import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx'
import { url, api_key } from '../global';
@Injectable({
  providedIn: 'root',
})
export class UploadAttachmentService {
  base_url = url;
  api_key = api_key;
  constructor(private http: HttpClient) {}

  uploadFiles(files: any, id: any) {
    let api_url = this.base_url + '/upload';
    const formData = new FormData();
    const httpOptions = {
      headers: new HttpHeaders({
        apikey: this.api_key,
      }),
    };
    formData.append('image', files, files.name);
    formData.append('attachmentid', id);
    return this.http.post(api_url, formData, httpOptions);
  }
  public importFromFile(bstr: string): XLSX.AOA2SheetOpts {
    /* read workbook */
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    /* grab first sheet */
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    /* save data */
    const data = <XLSX.AOA2SheetOpts>(
      XLSX.utils.sheet_to_json(ws, { header: 1 })
    );

    return data;
  }
}
