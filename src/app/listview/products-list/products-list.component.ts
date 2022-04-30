import { Component, OnInit, ViewChild } from '@angular/core';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
import { ProductService } from 'src/app/service/product.service';
import { UploadAttachmentService } from 'src/app/service/upload-attachment.service';

import * as XLSX from 'xlsx';
import { product } from 'src/app/Product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  productData: any;
  public gridData: any;
  public gridView: any;
  public mySelection: string[] = [];
  attachment_files: any;
  importContacts: product[] = [];
  pro_count: any;
  constructor(
    private prd: ProductService,
    private upload: UploadAttachmentService,
    private product: ProductService
  ) {}

  ngOnInit(): void {
    this.prd.getAllProduct().subscribe((data: any) => {
      console.log(data);
      this.productData = data.result;
      this.gridView = data.result;
    });
    this.prd.productCount().subscribe((data: any) => {
      console.log(data);
      this.pro_count=data.result
    });
  }

  handleUpload(e: any) {
    let date = new Date();
    console.log(date.getTime());
    this.attachment_files = e.target.files;

    for (let file of e.target.files) {
      this.upload.uploadFiles(file, date.getTime()).subscribe((url: any) => {
        let img_url = url.url;
        console.log({
          img_url,
          name: file.name,
          size: file.size,
          upload_date: date,
        });
      });
    }
  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const data = <any[]>this.upload.importFromFile(bstr);

      const header: string[] = Object.getOwnPropertyNames(new product());
      const importedData = data.slice(1);

      this.importContacts = importedData.map((arr) => {
        const obj: any = {};
        for (let i = 0; i < header.length; i++) {
          const k = header[i];
          obj[k] = arr[i];
        }
        return <product>obj;
      });
      console.log(this.importContacts);
      this.prd.bulkAddProduct(this.importContacts).subscribe((data: any) => {
        window.location.reload();
      });
    };
    reader.readAsBinaryString(target.files[0]);
  }

  public onFilter(e: any): void {
    let inputValue = e.target.value;
    if (e.target.value.length >= 4) {
      this.product
        .getProductDataSearch({ searchValue: e.target.value })
        .subscribe((data: any) => {
          this.productData = data.result.slice();
          this.gridView = this.productData.slice();
        });
    } else {
      this.product.getSearchByPartNo({ PartNo: e.target.value })
       .subscribe((data: any) => {
          this.productData = data.result.slice();
          this.gridView = this.productData.slice();
        });
    }
    // this.gridView = process(this.gridData, {
    //   filter: {
    //     logic: "or",
    //     filters: [
    //       {
    //         field: "PartNo",
    //         operator: "contains",
    //         value: inputValue,
    //       },
    //       {
    //         field: "productname",
    //         operator: "contains",
    //         value: inputValue,
    //       },
    //       {
    //         field: "type",
    //         operator: "contains",
    //         value: inputValue,
    //       },
    //       {
    //         field: "UnitPrice",
    //         operator: "contains",
    //         value: inputValue,
    //       },
    //       {
    //         field: "GST",
    //         operator: "contains",
    //         value: inputValue,
    //       },
    //       {
    //         field: "Category",
    //         operator: "contains",
    //         value: inputValue,
    //       },
    //       {
    //         field: "HSNCode",
    //         operator: "contains",
    //         value: inputValue,
    //       }
    //     ],
    //   },
    // }).data;

    this.dataBinding.skip = 0;
  }
}
