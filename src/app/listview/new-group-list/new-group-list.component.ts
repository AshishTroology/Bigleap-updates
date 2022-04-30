import { Component, OnInit, ViewChild } from '@angular/core';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-new-group-list',
  templateUrl: './new-group-list.component.html',
  styleUrls: ['./new-group-list.component.css']
})
export class NewGroupListComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  productData:any
  public gridData: any;
  public gridView: any;
  public mySelection: string[] = [];
  constructor(private prd:ProductService) { }

  ngOnInit(): void {
    this.prd.getAllNewGroups().subscribe((data:any)=>{
      console.log(data)
      this.productData=data.data
      this.gridView=data.data
    })
  }


  
  public onFilter(e: any): void {
    let inputValue=e.target.value
    this.gridView = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "lead_owner",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "lead_id",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "created_date_time",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "modified_date_time",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "aging",
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
