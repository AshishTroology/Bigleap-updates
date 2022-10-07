import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { LeadFormService } from '../service/lead-form.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  dashboardcount: any;
  constructor(private quote: LeadFormService) {}

  ngOnInit(): void {
    this.quote.getAllDashboard().subscribe((resdata: any) => {
      console.log(resdata)
      this.dashboardcount=resdata
    });
  }
}
