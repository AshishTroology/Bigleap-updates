import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { LeadFormService } from 'src/app/service/lead-form.service';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-lead-view',
  templateUrl: './lead-view.component.html',
  styleUrls: ['./lead-view.component.css']
})
export class LeadViewComponent implements OnInit {
  public gridData: any;
  public gridView: any;
  userPermission:any

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private lead: LeadFormService,
    private users: AuthService,private userservice: UserService) { }

  ngOnInit(): void {

    this.users.userLoggedIn().subscribe((user:any)=>{
      console.log(user)
      this.userservice.getUserRolePermissions(user.result.role).subscribe((data:any)=>{
        console.log(data.result[0])
        this.userPermission=data.result[0]
      })
    })
    
    this.getLeads()
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength:10
    };

  }
  getLeads() {
    this.lead.getAllLead().subscribe((data: any) => {
      data?.map((dt: any, index: any) => {
        let date = new Date(dt.created_date_time)
        data[index].created_date_time = date.toLocaleString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })

        if (dt.modified_date_time) {
          let modify_date = new Date(dt?.modified_date_time)
          data[index].modified_date_time = modify_date.toLocaleString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })
        } else {
          data[index].modified_date_time = "NA"
        }
        let date2 = new Date()

        var Difference_In_Time = date2.getTime() - date.getTime();

        // To calculate the no. of days between two dates
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        data[index]['aging'] = Math.floor(Difference_In_Days) + " days"
      })
      this.gridData = data
      this.gridView = data;
      console.log(data)
      this.dtTrigger.next();
    })

  }



  handleDelete(id: any) {
    console.log(id)
    this.dtTrigger.unsubscribe();
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

        this.lead.deleteLead(id).subscribe((data: any) => {
          console.log(data)
          if (data.status === 200)
            Swal.fire(data.message, '', 'success')
          else if (data.status === 500)
            Swal.fire(data.message, '', 'error')

          this.getLeads()

        })
      }
    })




  }
  ngOnDestroy(): void {

    this.dtTrigger.unsubscribe();
  }
}