import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TosterService } from '../service/toster.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';
import { AccountService } from '../service/account.service';
import { PerformanceService } from '../service/performance.service';
import { UserService } from '../service/user.service';
declare var $: any;
@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {

  title = "CodeSandbox";
  toggle = [];
  status = "Enable";

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  dropdownSettings1 = {};
  addgoal:any=[{
    learn_based_goal:null,
    learn_based_weightage:null,
  

  }]
  login_id: any;
  performanceId:any;
  Perform!: FormGroup;
  saveas: any = true;
  isValidbutton: any;
  industrydata:any;
  isValidFormSubmitted: any;
  userdata:any = [];
 
  type_revenue_btn: any=true;
  type_learning_btn: any=false;
  constructor(
    private form: FormBuilder,
    private Toaster: TosterService,
    private Route: Router,
    private Auth:AuthService,
    private industry:AccountService,
    private Performance:PerformanceService,
    private user:UserService
  ) { }



  ngOnInit(): void {
    
    this.Auth.userLoggedIn().subscribe((logindata:any)=>{
      console.log(logindata);
      this.login_id=logindata.result._id
    })
    this.industry.getAllAccount().subscribe((data:any)=>{
      this.industrydata=data
      console.log(data)
    })
    this.user.getAllUsers().subscribe((data:any)=>{
      this.userdata=data.result
      console.log(data)
    });
   

    this.dropdownSettings= {
      singleSelection:false,
      idField: '_id',
      textField: 'username',
      allowSearchFilter: true,
     
    };
    this.dropdownSettings1= {
      singleSelection: false,
      idField: '_id',
      textField: 'industry',
      allowSearchFilter: true
    };
    let number = Math.random() // 0.9394456857981651
    number.toString(36); // '0.xtis06h6'
    var id = number.toString(36).substr(2, 9);
    this.performanceId=id.toUpperCase()
    this.forminit();
    
  }

  forminit() {
    this.Perform = this.form.group({
      goal_id: [this.performanceId, Validators.required],
      industry:'',
      employee:'',
      goal_type:'Revenue',
      goal_name:'',
      weightage:'',
      duration:'',
      target_goal:'',
      lead_quantity:'',
      lead_value:'',
      quote_quantity:'',
      quote_value:'',
      deal_quantity:'',
      deal_value:'',
      add_goal:'',
      
  })
}
handleAddgoal(){
  this.addgoal.push({value:null})
 }

handleBlurgoal(e:any,index:any){
  this.addgoal[index].value=e.target.value
  console.log(e.target.value,index)
  console.log(this.addgoal)
}

handleDeletegoal(index:any){
  this.addgoal.splice(index,1)
 }
 valueInsert(e:any,name:any,index:any){
  this.addgoal[index][name]=e.target.value
  
  }
saveform(svalue: any) {
  if (this.Perform.invalid) {
    this.saveas = true;
  } else {
    this.saveas = svalue;
  }
}

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
    this.Perform.value.user_id = this.login_id;
    this.Perform.value.add_goal = this.addgoal;

    this.Performance.submitForm(this.Perform.value).subscribe((data) => {
      console.log(data);
      this.Toaster.showSuccess(
        'Congratulation!, Performance has been created.'
      );
      if (this.saveas == 'save') {
        console.log(this.saveas);
        setTimeout(() => {
          this.Route.navigate(['/performance-list']);
        }, 1000);
      } else {
        console.log(this.saveas);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    });
  }
}

getGoalType(type:any){
  if(type=='Revenue'){
    this.type_revenue_btn=true;
    this.type_learning_btn=false;
  }
  else{
    this.type_revenue_btn=false;
    this.type_learning_btn=true;
  }
  this.Perform.value.goal_type=type;
}




}

