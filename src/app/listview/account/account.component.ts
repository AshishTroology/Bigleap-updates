import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AccountService } from 'src/app/service/account.service';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { SortDescriptor } from '@progress/kendo-data-query';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponentList implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  accData: any;
  dtElement: any;
  public sort: SortDescriptor[] = [
    {
      field: 'aging',
      dir: 'asc',
    },
  ];
  constructor(
    private account: AccountService,
    private router: Router,
    private users: AuthService,
    private userservice: UserService
  ) {}

  public gridData: any;
  public gridView: any;
  user: any;
  userPermission: any;

  public mySelection: string[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

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

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      ordering: true,
      searching: true,
      // processing: true,
      dom: 'lfrtip',
    };
    this.account.getAllAccount().subscribe((data: any) => {
      this.accData = data;
      this.dtTrigger.next();
      // console.log(data);
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  handleDelete(id: any) {
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
        this.account.deleteAccount(id).subscribe((data: any) => {
          if (data.status === 200) Swal.fire(data.message, '', 'success');
          else if (data.status === 500) Swal.fire(data.message, '', 'error');
        });
      }
    });
  }
}
