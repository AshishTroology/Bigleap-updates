import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
import { AuthService } from 'src/app/service/auth.service';
import { CountryStateCityService } from 'src/app/service/country-state-city.service';
import { TosterService } from 'src/app/service/toster.service';
import { country } from 'src/assets/Country';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {
  accounteditform!:FormGroup
  accountId:any
  Data:any
  Country:any
  selected="India"
  State:any
  City:any
  AddState:any
  AddCity:any
  country_code:any
  username:any
  currentUser:any
  isValidFormSubmitted:any=false
  secondstates: any;
  display:string=''
  company_country: any;
  company_state: any;

  constructor(private form:FormBuilder,
    private accnt:AccountService,
    private toast:TosterService,
    private router:Router,
    private userAuth:AuthService,
    private state_country:CountryStateCityService,
    private _Activatedroute:ActivatedRoute) { }


  submitForm():void{


    console.log(this.accounteditform.value)
    this.accounteditform.value.account_id=this.accountId
    this.accounteditform.value.pan=this.display;
    this.accounteditform.value.country_code=String(this.country_code)
    this.accounteditform.value.account_owner=this.username
    this.accounteditform.value.created_at=this.Data?.created_at
    this.accounteditform.value.account_owner=this.Data?.account_owner
    this.accounteditform.value.created_by=this.Data?.created_by
    this.accounteditform.value.modyfied_by=this.currentUser


    console.log(this.accounteditform)
    console.log(this.accounteditform.invalid)

    if(this.accounteditform.invalid){
      window.scrollTo({top:209,
     behavior:'smooth'})
      this.isValidFormSubmitted=true
    }else{
    this.accnt.submitForm(this.accounteditform.value).subscribe((data:any)=>{
      console.log(data)
      if(data.status===200){
        this.toast.showSuccess(data.message)
        this.router.navigate(['/account'])
      }
      else if(data.status===201){
        this.toast.showWarning(data.message)
      }
      else if(data.status===500){
        this.toast.showError(data.message)
      }
    })
    }

  }

 get f() {
      return this.accounteditform.controls;
    }




  countryChangeAdd(c:any){
    // console.log(c.target.value)
    this.state_country.getStates({country:c.target.value}).subscribe((state:any)=>{
      // console.log(state)
      this.AddState=state.result
    })
  }



  cancleForm(){
    this.router.navigate(['/account'])
  }

  ngOnInit(): void {


    this.userAuth.userLoggedIn().subscribe((user:any)=>{
      this.currentUser=user.username
    })
    this.accountId=this._Activatedroute.snapshot.paramMap.get("id");
    // this.accountId=history.state.id
    // console.log(this._Activatedroute.snapshot.paramMap.get("id"))

    // this.selected="India"
    // console.log(country[0].name)
      // console.log(user.result.userId)
      this.accnt.getAccountData(this._Activatedroute.snapshot.paramMap.get("id")).subscribe((data:any)=>{
        console.log(data[0])
        this.Data=data[0]
        this.username=data[0].account_owner
        this.country_code='91'


      // this.secondchnage(data.result[0].country)


       this.countryChangeAdd({target:{value:data[0].company_country}})
      //  console.log(data[0].company_country);
       this.company_state=data[0].company_state
       console.log(data[0].company_state);
        this.secondchnage({target:{value:data[0].country}})
        console.log(data[0].country);
          this.forminit();
      })

  }


  handleChange(e:any,name:any){
    console.log(e.target.value,name)
    this.accounteditform.value.company_name=e.target.value
  }



  forminit(){

    this.accounteditform=this.form.group({
      account_id:this.accountId,
      account_owner:this.Data?.account_owner?this.Data?.account_owner:'',
      country_code:this.Data?.country_code?this.Data?.country_code:'91',
      company_name:[this.Data?.company_name?this.Data?.company_name:'',Validators.required],
      industry:[this.Data?.industry?this.Data?.industry:'',Validators.required],
      company_country:[this.Data?.company_country?this.Data?.company_country:'',Validators.required],
      company_state:[this.Data?.company_state?this.Data?.company_state:'',Validators.required],
      company_city:[this.Data?.company_city?this.Data?.company_city:'',Validators.required],
      company_location:this.Data?.company_location?this.Data?.company_location:'',
      gst:[this.Data?.gst?this.Data?.gst:'',Validators.pattern(/^([0][1-9]|[1-2][0-9]|[3][0-7])([A-Z]{5})([0-9]{4})([A-Z]{1}[1-9A-Z]{1})([Z]{1})([0-9A-Z]{1})+$/)],
      pan:[this.Data?.pan?this.Data?.pan:'',Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)],
      tan:this.Data?.tan?this.Data?.tan:'',
      cin:this.Data?.cin?this.Data?.cin:'',
      phone_no:this.Data?.phone_no?this.Data?.phone_no:'',
      mobile_no:[this.Data?.mobile_no?this.Data?.mobile_no:''],
      email:[this.Data?.email?this.Data?.email:''],
      secondary_email:[this.Data?.secondary_email?this.Data?.secondary_email:''],
      address1:this.Data?.address1?this.Data?.address1:'',
      address2:this.Data?.address2?this.Data?.address2:'',
      address3:this.Data?.address3?this.Data?.address3:'',
      country:this.Data?.country?this.Data?.country:'',
      state:this.Data?.state?this.Data?.state:'',
      city:this.Data?.city?this.Data?.city:'',
      zip_code:this.Data?.zip_code?this.Data?.zip_code:'',
      remark:this.Data?.remark?this.Data?.remark:'',
      created_at:this.Data?.created_at?this.Data?.created_at:'',
      created_by:this.Data?.created_by?this.Data?.created_by:'',
      modyfied_by:this.Data?.modyfied_by?this.Data?.modyfied_by:'',
    })
  }
  // countryChangeAdd(c:any){
  //   console.log(c.target.value)
  //   this.state_country.getStates({country:c.target.value}).subscribe((state:any)=>{
  //     console.log(state)
  //     this.AddState=state.result
  //   })
  // }

secondchnage(c:any){
    // console.log(c.target.value)
    this.state_country.getStates({country:c.target.value}).subscribe((state:any)=>{
      // console.log(state)
      this.secondstates=state.result
    })
  }
  getval(val:string){
    console.log(val);
    this.display=val.slice(2,12)
    }
}
