import { AfterViewInit, Component, NgZone, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';


import { DataBindingDirective, GridComponent } from "@progress/kendo-angular-grid";
import { process, SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { CompanyService } from 'src/app/service/company.service';
import { LeadFormService } from 'src/app/service/lead-form.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.css'],
})
export class LeadListComponent implements OnInit, AfterViewInit {
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  public gridData: any;
  public gridView: any;
  public sort: SortDescriptor[] = [
    {
      field: 'aging',
      dir: 'asc',
    },
  ];
  branchData: any;
  user: any;
  userPermission: any;

  public mySelection: string[] = [];
  constructor(
    private router: Router,
    private lead: LeadFormService,
    private company: CompanyService,
    private users: AuthService,
    private userservice: UserService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
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

    this.company.GetAddress().subscribe((branch: any) => {
      console.log(branch);
      this.branchData = branch.result;
    });
    this.getLeads();
  }

  getLeads() {
    this.lead.getAllLead().subscribe((resdata: any) => {
      this.gridData = resdata;

      let data = resdata;

      data?.map((dt: any, index: any) => {
        let date = new Date(dt.created_date_time);
        console.log(data[index]);
        // data[index].map((item:any)=>{
        //   console.log(item)
        // })

        data[index].created_date_time = date.toLocaleString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });

        if (dt.modified_date_time) {
          let modify_date = new Date(dt?.modified_date_time);
          data[index].modified_date_time = modify_date.toLocaleString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          });
        } else {
          data[index].modified_date_time = 'NA';
        }
        let date2 = new Date();

        var Difference_In_Time = date2.getTime() - date.getTime();

        // To calculate the no. of days between two dates
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        data[index]['aging'] = Math.floor(Difference_In_Days) + ' days';

        console.log(Object.keys(data[index]));
        Object.keys(data[index]).map((item: any) => {
          let str = data[index][item];
          if (typeof str === 'string') data[index][item] = str.toUpperCase();
        });

        // data.reverse()
      });

      this.gridView = data.reverse();
      console.log(resdata);
    });
  }

  sortData(field: any) {
    console.log(field);
    let sortdata = this.gridData.sort((a: any, b: any) => a[field] - b[field]);
    console.log(sortdata);
  }

  convertToQuote(e: any) {
    console.log('convert to quote', e);
  }

  handleBranchAdd(e: any) {
    console.log(e.target.value);
  }

  handleQuoteConvert(id: any): void {
    console.log(id);
    console.log(this.gridData.filter((item: any) => item._id === id));

    Swal.fire({
      title: 'Select Quote Location',
      html: "<select onchange='handleLocation()' class='form-control'><option value='lucknow'>lucknow</option><option value='bhiwadi'>bhiwadi</option></select>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Convert To Quote',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
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
        this.lead.deleteLead(id).subscribe((data: any) => {
          console.log(data);
          if (data.status === 200) Swal.fire(data.message, '', 'success');
          else if (data.status === 500) Swal.fire(data.message, '', 'error');
          this.getLeads();
        });

        // this.lead.deleteAccount(id).subscribe((data:any)=>{
        //   if(data.status===200)
        //     Swal.fire(data.message, '', 'success')
        //   else if(data.status===500)
        //     Swal.fire(data.message, '', 'error')
        //     this.getAccounts()
        // })
      }
    });
  }

  handleEdit(id: any) {
    console.log('edit clicked ' + id);
    this.router.navigateByUrl('/edit-lead', { state: { id } });
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
    let inputValue = e.target.value;
    this.gridView = process(this.gridData, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'lead_owner[0].username',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'lead_id',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'created_date_time',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'modified_date_time',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'aging',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'company_name',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'contact',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'lead_type',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'industry',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'lead_title',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'lead_source',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'lead_status_stage',
            operator: 'contains',
            value: inputValue,
          },
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }

  public ngAfterViewInit(): void {
    this.fitColumns();
  }

  public onDataStateChange(): void {
    this.fitColumns();
  }
  public grid!: GridComponent;
  private fitColumns(): void {
    this.ngZone.onStable
      .asObservable()
      .pipe(take(1))
      .subscribe(() => {
        this.grid.autoFitColumns();
      });
  }
}
