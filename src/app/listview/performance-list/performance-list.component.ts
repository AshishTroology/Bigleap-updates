import { Component, OnInit,ViewChild } from '@angular/core';
import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { process } from "@progress/kendo-data-query";
import { PerformanceService } from 'src/app/service/performance.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-performance-list',
  templateUrl: './performance-list.component.html',
  styleUrls: ['./performance-list.component.css']
})
export class PerformanceListComponent implements OnInit {

  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  constructor(
    private router: Router,
    private PerformanceService: PerformanceService,
    private users: AuthService,
    private userservice: UserService
  ) {}

  public gridData: any;
  public gridView: any;
  user:any;
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
    this.getall();
  }
getall() {
    this.PerformanceService.getall().subscribe((data: any) => {
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
            field: 'goal_id',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'industry',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'employee',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'goal_type',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'goal_name',
            operator: 'contains',
            value: inputValue,
          },

          {
            field: 'weightage',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'duration',
            operator: 'contains',
            value: inputValue,
          },

        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }




}
