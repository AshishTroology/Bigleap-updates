import { Component, OnInit, ViewChild } from '@angular/core';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-new-products-list',
  templateUrl: './new-products-list.component.html',
  styleUrls: ['./new-products-list.component.css']
})
export class NewProductsListComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  productData:any
  public gridData: any;
  public gridView: any;
  // productForm!:FormGroup
  public mySelection: string[] = [];
  constructor(private prd:ProductService) { }

  ngOnInit(): void {
    this.getnewproduct()
  }

getnewproduct(){
  this.prd.getAllNewProducts().subscribe((data:any)=>{
    console.log(data)
    this.productData=data.result
    this.gridView=data.result
  })
}
  
  public onFilter(e: any): void {
    let inputValue=e.target.value
    this.gridView = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "lead_id",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "product_name",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "type",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "UnitPrice",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "GST",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "company_name",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "contact",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "lead_type",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "industry",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "lead_title",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "lead_source",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "lead_status_stage",
            operator: "contains",
            value: inputValue,
          }
          
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }

 


  
}
