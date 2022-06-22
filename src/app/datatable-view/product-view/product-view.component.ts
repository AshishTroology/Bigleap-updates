import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';;
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
import * as XLSX from 'xlsx';
import { product } from 'src/app/Product.model';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/service/auth.service';
import { ProductService } from 'src/app/service/product.service';
import { UploadAttachmentService } from 'src/app/service/upload-attachment.service';
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  public gridData: any;
  public gridView: any;
  userPermission:any
  attachment_files: any;
  dtOptions: DataTables.Settings = {};
  importContacts: product[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private  prd:ProductService,
    private upload:UploadAttachmentService,
    private users: AuthService,
    private userservice: UserService
    ) { }

  ngOnInit(): void {

    this.users.userLoggedIn().subscribe((user:any)=>{
      console.log(user)
      this.userservice.getUserRolePermissions(user.result.role).subscribe((data:any)=>{
        console.log(data.result[0])
        this.userPermission=data.result[0]
      })
    })
    
    this.getproduct()
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength:10
    };

  }
  getproduct() {
    this.prd.getAllProduct().subscribe((data:any)=>{
     
      this.gridData = data
      this.gridView = data;
      console.log(data,'Product')
      console.log(this.gridData);
      
      this.dtTrigger.next();
    })

  }

  handleUpload(e:any){
    let date=new Date()
    console.log(date.getTime())
    this.attachment_files=e.target.files

    for(let file of e.target.files){
       this.upload.uploadFiles(file,date.getTime()).subscribe((url:any)=>{
        let img_url=url.url
         console.log({img_url,name:file.name,size:file.size,upload_date:date})
       })
     }
}


    onFileChange(evt: any) {
      const target: DataTransfer = <DataTransfer>(evt.target);
      if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
    
        const bstr: string = e.target.result;
        const data = <any[]>this.upload.importFromFile(bstr);
    
        const header: string[] = Object.getOwnPropertyNames(new product());
        const importedData = data.slice(1);
    
        this.importContacts = importedData.map(arr => {
          const obj:any = {};
          for (let i = 0; i < header.length; i++) {
            const k = header[i];
            obj[k] = arr[i];
          }
          return <product>obj;
        })
        console.log(this.importContacts);
        this.prd.bulkAddProduct(this.importContacts).subscribe((data:any)=>{
          window.location.reload();
        })
    
      };
      reader.readAsBinaryString(target.files[0]);
    }


  ngOnDestroy(): void {

    this.dtTrigger.unsubscribe();
  }

}
