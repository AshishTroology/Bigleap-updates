import { Component, OnInit,ViewChild } from '@angular/core';
import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { process } from "@progress/kendo-data-query";
import { ServiceRequestService } from 'src/app/service/service-request.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
import { LeadFormService } from 'src/app/service/lead-form.service';
@Component({
  selector: 'app-service-request-list',
  templateUrl: './service-request-list.component.html',
  styleUrls: ['./service-request-list.component.css'],
})
export class ServiceRequestListComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  constructor(
    private router: Router,
    private ServiceRequestService: ServiceRequestService,
    private users: AuthService,
    private userservice: UserService,
    private lead: LeadFormService
  ) {}

  public gridData: any;
  public gridView: any;
  user: any;
  userPermission: any;
  public mySelection: string[] = [];

  public ngOnInit(): void {
    this.users.userLoggedIn().subscribe((user: any) => {
      console.log(user);
      this.user = user.result;
      this.userservice
        .getUserRolePermissions(user.result.role)
        .subscribe((data: any) => {
          console.log(data.result[0]);
          this.userPermission = data.result[0];
        });
    });
    this.getallservice();
  }
  getallservice() {
    this.ServiceRequestService.getallservice().subscribe((data: any) => {
      this.gridData = data.result;
      this.gridView = data.result;
      console.log(data);
    });
  }

  public onFilter(e: any): void {
    let inputValue = e.target.value;
    this.gridView = process(this.gridData, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'service_id',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'service_type',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'service_location',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'source_type',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'priority',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'account',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'account_info',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'assign_to',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'visit_schedule',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'stages',
            operator: 'contains',
            value: inputValue,
          },
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }
  handleDelete(id: any) {
    console.log(id);

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.lead.deleteService(id).subscribe((data: any) => {
          console.log(data);
          if (data.status === 200) Swal.fire(data.message, '', 'success');
          else if (data.status === 500) Swal.fire(data.message, '', 'error');
          window.location.reload()
        });
      }
    });
  }
}
