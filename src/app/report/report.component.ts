import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  DataBindingDirective,
  GridDataResult,
} from '@progress/kendo-angular-grid';
import { process, SortDescriptor } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/service/account.service';
import { AuthService } from 'src/app/service/auth.service';
import { ContactService } from 'src/app/service/contact.service';

import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

import * as XLSX from 'xlsx';
import { LeadFormService } from '../service/lead-form.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  public gridData: any;
  public gridView: any;
  public sort: SortDescriptor[] = [
    {
      field: 'aging',
      dir: 'asc',
    },
  ];
  quoteData: any;
  quote_id: any;
  user: any;
  currentUser: any;
  userId: any;
  time: any = 100;

  pending: any = [];
  verified: any = [];
  approved: any = [];

  userPermission: any;
  totalAmount: any = 0;
  mainarr:Array<any>=[];
  public mySelection: string[] = [];
  constructor(
    private router: Router,
    private quote: LeadFormService,
    private auth: AuthService,
    private role: UserService,
    private account: AccountService,
    private contact: ContactService
  ) {}






  ngOnInit(): void {
    this.auth.userLoggedIn().subscribe((user: any) => {
      console.log(user);
      this.user = user.result;
      this.currentUser = user.result.username;
      this.userId = user.result._id;

      this.role
        .getUserRolePermissions(user.result.role)
        .subscribe((data: any) => {
          console.log(data.result[0]);
          this.userPermission = data.result[0];
        });
    });
    this.getQuotes();
  }

  getQuotes() {
    console.log('get quotes');
    this.quote.getAll().subscribe((resdata: any) => {
      this.gridData = resdata.result;
      let data = resdata.quote;
      console.log(resdata, 'all data');
      if (resdata.lead.length != 0) {
        resdata.lead.map((item: any) => {
          let itemdata = {
            code: item.lead_id,
            created_at: item.created_date_time,
            account: item.account[0].company_name,
            contact: item.contact[0].contact_name,
            owner: item.lead_owner[0].username,
            source: item.lead_source,
            status_stage: item.lead_status_stage,
            title: item.lead_title,
            type: item.lead_type,
            quotation: 'lead',
            created_by: item.created_by,
            location: '',
            estimated_value: item.estimated_value,
          };
          this.mainarr.push(itemdata);
        });
      }
      if (resdata.quote.length != 0) {
        resdata.quote.map((item1: any) => {
          let itemdata = {
            code: item1.quote_id,
            created_at: item1.created_date_time,
            account: item1.account[0].company_name,
            contact: item1.contact[0].contact_name,
            owner: item1.quote_owner[0].username,
            source: item1.quote_source,
            status_stage: item1.quote_status,
            title: item1.quote_title,
            type: item1.quote_type,
            quotation: 'quote',
            created_by: item1.created_by,
            location: item1.quote_location[0].branch_name,
            estimated_value: item1.estimated_value,
          };
          this.mainarr.push(itemdata);
        })
      }
      if (resdata.deal.length != 0) {
         resdata.deal.map((item2: any) => {
           let itemdata = {
             code: item2.deal_id,
             created_at: item2.created_date_time,
             account: item2.account[0].company_name,
             contact: item2.contact[0].contact_name,
             owner: item2.deal_owner[0].username,
             source: item2.deal_source,
             status_stage: item2.deal_status_stage,
             title: item2.deal_title,
             type: item2.deal_type,
             quotation: 'deal',
             created_by: item2.created_by,
             location: item2.deal_location[0].branch_name,
             estimated_value: item2.deal_estimated_value,
           };

           this.mainarr.push(itemdata);
         });
      }
      console.log(this.mainarr,"Main Array");



      this.gridView = this.mainarr;
      // console.log('data', data);
    });
  }

  aging(cdate:any){
    let date = new Date(cdate);
     let date2 = new Date();
     var Difference_In_Time = date2.getTime() - date.getTime();
     var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
     console.log(Math.floor(Difference_In_Days));
     return Math.floor(Difference_In_Days);
  }

  public onFilter(e: any): void {
    let inputValue = e.target.value;
    this.gridView = process(this.gridData, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'code',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'title',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'source',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'status_stage',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'created_at',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'aging',
            operator: 'contains',
            value: inputValue,
          },

          {
            field: 'account',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'contact',
            operator: 'contains',
            value: inputValue,
          },

          {
            field: 'location',
            operator: 'contains',
            value: inputValue,
          },
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }

  fileName = 'ExcelSheet.xlsx';

  exportexcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.gridView);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }
}
