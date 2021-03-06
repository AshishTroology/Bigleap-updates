import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';


import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { process } from "@progress/kendo-data-query";
import { AuthService } from 'src/app/service/auth.service';
// import {data} from '../../kendoui-gridview/employees'
import { ContactService } from 'src/app/service/contact.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponentList implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  constructor(private contact:ContactService,private router:Router,
    private users: AuthService,
    private userservice: UserService) { }

  public gridData: any;
  public gridView: any;
  user:any
  userPermission:any
  
  public mySelection: string[] = [];

  public ngOnInit(): void {

    this.users.userLoggedIn().subscribe((user:any)=>{
      console.log(user)
      this.user=user.result
      this.userservice.getUserRolePermissions(user.result.role).subscribe((data:any)=>{
        console.log(data.result[0])
        this.userPermission=data.result[0]
      })
    })

    this.getAccounts()
  }
  getAccounts(){
    this.contact.getAllContact().subscribe((data:any)=>{
      this.gridData=data
      this.gridView = data;
      console.log(data)
    })
  }

  handleEdit(id:any){
    console.log("edit clicked "+id)
    this.router.navigateByUrl('/edit-contact',{state:{id}})
  }

  handleDelete(id:any){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contact.deleteContact(id).subscribe((data:any)=>{
          if(data.status===200)
            Swal.fire(data.message, '', 'success')
          else if(data.status===500)
            Swal.fire(data.message, '', 'error')
            this.getAccounts()
        })
        
      }
    })



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
  }

  public onFilter(e: any): void {
    let inputValue=e.target.value
    this.gridView = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "contact_name",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "company_name",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "mobile_no",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "email",
            operator: "contains",
            value: inputValue,
          },
          
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }
}
