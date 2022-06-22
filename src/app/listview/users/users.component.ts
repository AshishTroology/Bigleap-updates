import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';


import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { process } from "@progress/kendo-data-query";

import { QuoteFormService } from 'src/app/service/quote-form.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  public gridData: any;
  public gridView: any;

  public mySelection: string[] = [];
  constructor(private router:Router,
              private quote:QuoteFormService) { }

  ngOnInit(): void {
    this.getQuotes()
  }

  getQuotes(){
    console.log("get quotes")
    this.quote.getQuote().subscribe((data:any)=>{
      this.gridData=data.result
      this.gridView = data.result;
      console.log(data)
    })
  }

  handleEdit(id:any){
    console.log("edit clicked "+id)
    this.router.navigateByUrl('/edit-quote',{state:{id}})
  }

  // handleDelete(id:any){

  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.lead.deleteAccount(id).subscribe((data:any)=>{
  //         if(data.status===200)
  //           Swal.fire(data.message, '', 'success')
  //         else if(data.status===500)
  //           Swal.fire(data.message, '', 'error')
  //           this.getAccounts()
  //       })
        
  //     }
  //   })



    // Swal.fire({
    //   title: 'Are You Sure?',
    //   // showDenyButton: true,
    //   showCancelButton: true,
    //   confirmButtonText: 'Delete',
    //   // denyButtonText: `Don't save`,
    // }).then((result) => {
    //   /* Read more about isConfirmed, isDenied below */
    //   if (result.isConfirmed) {
        
    //   } else if (result.isDenied) {
    //     Swal.fire('Changes are not saved', '', 'info')
    //   }
    // })
  

  public onFilter(e: any): void {
    let inputValue=e.target.value
    this.gridView = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "quote_owner",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "quote_title",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "quote_source",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "quote_status",
            operator: "contains",
            value: inputValue,
          },
          {
            field:"created_at",
            operator: "contains",
            value: inputValue
          }
          
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }
}
