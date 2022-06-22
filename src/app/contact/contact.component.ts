import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { country } from 'src/assets/Country';

import {state} from '../../assets/states'
import { AuthService } from '../service/auth.service';
import { ContactService } from '../service/contact.service';
import { CountryStateCityService } from '../service/country-state-city.service';
import { TosterService } from '../service/toster.service';

import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit  {
  contactForm!:FormGroup
  public state:any=state
  contactId:any
  contactData:any
  Country:any=country
  country_code:any=91
  State:any
  City:any
  disabled=false
  selected:any="India"
  username:any
  accountData:any
  isValidFormSubmitted:any

  ShowFilter = true;
  limitSelection = false;
  dropdownList:any=[]
  selectedItems: any = [];
  dropdownSettings = {};

  account_id:any=''
  company_name:any=''
  company_industry:any=''
  company_country:any=''
  company_state:any=''
  company_city:any=''
  company_location:any=''

  constructor(private contact:FormBuilder,
    private dp:FormBuilder,
    private toast:TosterService,
    private contc:ContactService,
    private router:Router,
    private auth:AuthService,
    private account:AccountService,
    private country_state:CountryStateCityService
    ){
      let number = Math.random() // 0.9394456857981651
      number.toString(36); // '0.xtis06h6'
     var id = number.toString(36).substr(2, 9);
     this.contactId=id.toUpperCase()
    }

  submitForm(){
    console.log(this.contactForm)
    this.contactForm.value.contact_name=this.fullname
    this.contactForm.value.contact_id=this.contactId
    this.contactForm.value.country_code=this.country_code
    this.contactForm.value.contact_owner=this.contactForm.value.contact_owner?this.contactForm.value.contact_owner:this.username

    this.contactForm.value.account_id=this.account_id
    this.contactForm.value.company_name=this.company_name
    this.contactForm.value.industry=this.company_industry
    this.contactForm.value.country=this.company_country
    this.contactForm.value.state=this.company_state
    this.contactForm.value.city=this.company_city
    this.contactForm.value.location=this.company_location
    if(this.contactForm.invalid){
      window.scrollTo({top:209,
     behavior:'smooth'})
      this.isValidFormSubmitted=true
    }else{
    console.log(this.contactForm.value)
    this.contc.SubmitForm(this.contactForm.value).subscribe((data:any)=>{
      console.log(data)
      if(data.status==200){
        this.toast.showSuccess(data.message)
        setTimeout(() => {
          this.router.navigate(['/contact'])
        }, 1500);
      }else if(data.status==201){
        this.toast.showWarning(data.message)
      }else {
        this.toast.showError("Something Went Wrong!")
      }
    })
  }
    // first_name+last_name
  }


  fullname=''

  onchange(){
    this.fullname=this.contactForm?.value?.first_name+" "+this.contactForm?.value?.last_name
  }


  get f() {
    return this.contactForm.controls;
  }



  countryChange(){
    this.contactForm.value.state=""
    this.contactForm.value.city=""
    let countr=this.Country.filter((con:any)=>con.country_name===this.contactForm.value.country)
    this.country_code=countr[0].country_phone_code
    this.country_state.getStates(this.contactForm.value.country).subscribe((state)=>{
      this.State=state
      console.log(state)
    })
  }

  cityChange(){
    this.country_state.getCity(this.contactForm.value.state).subscribe((city)=>{
      this.City=city
      console.log(city)
    })
  }

  ngOnInit(){

    this.account.getAllAccount().subscribe((data:any)=>{
      this.accountData=data
      console.log(data)
    })

   this.dropdownSettings = {
      singleSelection: true,
      idField: 'account_id',
      textField: 'company_name',
      noDataAvailablePlaceholderText:'No Company Found!',
      closeDropDownOnSelection:true,
      allowSearchFilter: true
    };


    this.auth.userLoggedIn().subscribe((user:any)=>{
      // console.log(user.result.userId)
      this.username=user.result.username


    })
    this.forminit()
  }

  onItemSelect(item: any) {
    console.log('onItemSelect', item);

    let filtered_company= this.accountData.filter((acc:any)=>acc.account_id===item.account_id)
    console.log(filtered_company)

    this.contactForm.value.company_name=filtered_company[0].company_name
    this.contactForm.value.industry=filtered_company[0].industry
    this.contactForm.value.country=filtered_company[0].company_country
    this.contactForm.value.state=filtered_company[0].company_state
    this.contactForm.value.city=filtered_company[0].company_city
    this.contactForm.value.location=filtered_company[0].company_location
    this.contactForm.value.account_id=filtered_company[0].account_id

    this.account_id=filtered_company[0].account_id
    this.company_name=filtered_company[0].company_name
    this.company_industry=filtered_company[0].industry
    this.company_country=filtered_company[0].company_country
    this.company_state=filtered_company[0].company_state
    this.company_city=filtered_company[0].company_city
    this.company_location=filtered_company[0].company_location
  }

toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
}

handleLimitSelection() {
    if (this.limitSelection) {
        this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
        this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
}





  forminit(){
    this.contactForm=this.contact.group({
                contact_id: this.contactId,
                account_id:'',
                country_code:this.country_code,
                contact_owner:this.username,
                company_name:['',Validators.required],
                industry:'',
                country:'',
                state:'',
                city:'',
                location:'',
                department:'',
                role:['',Validators.required],
                first_name:['',Validators.required],
                last_name:['',Validators.required],
                contact_name:'',
                phone_no:[''],
                mobile_no:['',Validators.required],
                email:[''],
                secondary_email:[''],
                remark:'',
                account:''
    })
  }
}
