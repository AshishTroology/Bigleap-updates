import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ContactService } from 'src/app/service/contact.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponentList implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  conData: any;
  constructor(
    private contact: ContactService,
    private router: Router,
    private users: AuthService,
    private userservice: UserService
  ) {}

  user: any;
  userPermission: any;

  public mySelection: string[] = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  public ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      ordering: true,
      searching: true,
      processing: true,
      dom: 'lfrtip',
    };
    this.users.userLoggedIn().subscribe((user: any) => {
      this.user = user.result;
      this.userservice
        .getUserRolePermissions(user.result.role)
        .subscribe((data: any) => {
          this.userPermission = data.result[0];
        });
    });

    this.contact.getAllContact().subscribe((data: any) => {
      this.conData = data;
      console.log(data);
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  handleEdit(id: any) {
    this.router.navigateByUrl('/edit-contact', { state: { id } });
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
        this.contact.deleteContact(id).subscribe((data: any) => {
          if (data.status === 200) Swal.fire(data.message, '', 'success');
          else if (data.status === 500) Swal.fire(data.message, '', 'error');
        });
      }
    });
  }


}
