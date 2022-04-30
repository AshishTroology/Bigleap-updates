import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TosterService } from 'src/app/service/toster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';
import { AccountService } from 'src/app/service/account.service';
import { PerformanceService } from 'src/app/service/performance.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-performance-edit',
  templateUrl: './performance-edit.component.html',
  styleUrls: ['./performance-edit.component.css'],
})
export class PerformanceEditComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  dropdownSettings1 = {};
  login_id: any;
  performanceId: any;
  Perform!: FormGroup;
  saveas: any = true;
  isValidbutton: any;
  industrydata: any;
  isValidFormSubmitted: any;
  userdata: any = [];
  perId: any;
  goal_id: any;
  goal_type: any;
  PerformanceId: any;
  gname: any;
  industryd: any;
  employeed: any;
  type_revenue_btn: any = true;
  type_learning_btn: any = false;
  addgoal: any = [];
  constructor(
    private form: FormBuilder,
    private Toaster: TosterService,
    private Route: Router,
    private Auth: AuthService,
    private industry: AccountService,
    private Performance: PerformanceService,
    private user: UserService,
    private _Activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.PerformanceId = this._Activatedroute.snapshot.paramMap.get('id');

    this.industry.getAllAccount().subscribe((data: any) => {
      this.industrydata = data;
      console.log(data);
    });
    this.user.getAllUsers().subscribe((data: any) => {
      this.userdata = data.result;
      console.log(data);
    });
    this.Performance.getbyid(this.PerformanceId).subscribe((data: any) => {
      console.log(data.result[0]);
      this.forminit(data.result[0]);
      this.goal_type = data.result[0].goal_type;
      this.goal_id = data.result[0].goal_id;
      this.getGoalType(this.goal_type);

      this.industryd = data.result[0].industry;
      // console.log(this.industryd)

      this.employeed = data.result[0].employee;
      this.addgoal = data.result[0].add_goal;
      console.log(this.employeed);
      // });
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'username',
      allowSearchFilter: true,
    };

    this.dropdownSettings1 = {
      singleSelection: false,
      idField: '_id',
      textField: 'industry',
      allowSearchFilter: true,
    };
  }
  forminit(uni: any) {
    this.Perform = this.form.group({
      goal_id: uni.goal_id,
      industry: [''],
      employee: [''],
      goal_type: [uni.goal_type],
      goal_name: uni.goal_name,
      weightage: uni.weightage,
      duration: uni.duration,
      target_goal: uni.target_goal,
      lead_quantity: uni.lead_quantity,
      lead_value: uni.lead_value,
      quote_quantity: uni.quote_quantity,
      quote_value: uni.quote_value,
      deal_quantity: uni.deal_quantity,
      deal_value: uni.deal_value,
      add_goal: '',
    });
  }

  saveform(svalue: any) {
    if (this.Perform.invalid) {
      this.saveas = true;
    } else {
      this.saveas = svalue;
    }
  }

  handleAddgoal() {
    this.addgoal.push({
      learn_based_goal: null,
      learn_based_weightage: null,
    });
  }

  handleBlurgoal(e: any, index: any) {
    this.addgoal[index].value = e.target.value;
    console.log(e.target.value, index);
    console.log(this.addgoal);
  }

  handleDeletegoal(index: any) {
    this.addgoal.splice(index, 1);
  }

  valueInsert(e: any, name: any, index: any) {
    this.addgoal[index][name] = e.target.value;
  }

  // onFormSubmit() {
  //   this.isValidFormSubmitted = false;
  //   if (this.Perform.invalid) {
  //     console.log(this.Perform, 'error');
  //     this.isValidFormSubmitted = true;
  //     this.isValidbutton = false;
  //     this.Toaster.showError('Sorry!, Fields are mandatory.');
  //   } else {
  //     console.log(this.Perform, 'true');
  //     this.isValidbutton = true;
  //     this.Perform.value.user_id = this.login_id;
  //     this.Perform.value.goal_type = this.goal_type;
  //     this.Performance.updateForm(this.Perform.value,this.PerformanceId).subscribe((data) => {
  //       console.log(data);
  //       this.Toaster.showSuccess(
  //         'Congratulation!, Performance has been updated.'
  //       );
  //       if (this.saveas == 'save') {
  //         console.log(this.saveas);
  //         setTimeout(() => {
  //           this.Route.navigate(['/performance-list']);
  //         }, 1000);
  //       } else {
  //         console.log(this.saveas);
  //         setTimeout(() => {
  //           window.location.reload();
  //         }, 5000);
  //       }
  //     });
  //   }
  //  }

  onFormSubmit() {
    this.isValidFormSubmitted = false;
    if (this.Perform.invalid) {
      console.log(this.Perform, 'error');
      this.isValidFormSubmitted = true;
      this.isValidbutton = false;
      this.Toaster.showError('Sorry!, Fields are mandatory.');
    } else {
      console.log(this.Perform, 'true');
      this.isValidbutton = true;
      this.Perform.value.add_goal = this.addgoal;
      this.Performance.updateForm(
        this.Perform.value,
        this.PerformanceId
      ).subscribe((resdata: any) => {
        console.log(resdata);
        this.Toaster.showSuccess(
          'Congratulation!, Performance has been updated.'
        );
        if (this.saveas == 'save') {
          console.log(this.saveas);
          setTimeout(() => {
            this.Route.navigate(['/performance-list']);
          }, 5000);
        } else {
          console.log(this.saveas);
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        }
      });
    }
  }
  getGoalType(type: any) {
    if (type == 'Revenue') {
      this.type_revenue_btn = true;
      this.type_learning_btn = false;
    } else {
      this.type_revenue_btn = false;
      this.type_learning_btn = true;
    }
    this.Perform.value.goal_type = type;
  }
}

