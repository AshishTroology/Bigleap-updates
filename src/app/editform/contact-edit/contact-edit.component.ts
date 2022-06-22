import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
import { AuthService } from 'src/app/service/auth.service';
import { ContactService } from 'src/app/service/contact.service';
import { CountryStateCityService } from 'src/app/service/country-state-city.service';
import { TosterService } from 'src/app/service/toster.service';
import { country } from 'src/assets/Country';
import { state } from 'src/assets/states';



@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  contactForm!:FormGroup
  public state:any=state
  contactId:any
  contactData:any
  Country:any=country
  country_code:any
  State:any
  City:any
  selected:any="India"
  username:any
  isValidFormSubmitted:any=false
  SelectedCompany:any

  ShowFilter = true;
  limitSelection = false;
  dropdownList:any=[]
  selectedItems: any = [];
  dropdownSettings = {};

  accountData:any
  company_name:any=''
  company_industry:any=''
  company_country:any=''
  company_state:any=''
  company_city:any=''
  company_location:any=''
  contact_owner:any

  constructor(private contact:FormBuilder,
    private toast:TosterService,
    private contc:ContactService,
    private router:Router,
    private auth:AuthService,
    private account:AccountService,
    private country_state:CountryStateCityService,
    private _Activatedroute:ActivatedRoute
    ){}

  submitForm(){
    console.log(this.contactForm.value)
    this.contactForm.value.contact_name=this.fullname
    this.contactForm.value.contact_id=this.contactId
    this.contactForm.value.country_code=this.country_code
    this.contactForm.value.contact_owner=this.contactForm.value.contact_owner?this.contactForm.value.contact_owner:this.username

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

    this.contc.SubmitForm(this.contactForm.value).subscribe((data:any)=>{
      console.log(data)
      if(data.status==200){
        this.toast.showSuccess(data.message)
        setTimeout(() => {
          this.router.navigate(['/contact'])
        }, 1500);
      }else if(data.status==201){
        this.toast.showWarning(data.message)
      }else if(data.status==401 || data.status==500){
        this.toast.showError(data.message)
      }
    })
  }
    // first_name+last_name
  }


  fullname=''

  onchange(){
    this.fullname=this.contactForm?.value?.first_name+" "+this.contactForm?.value?.last_name
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


    // this.contactId= history.state.id
    this.contactId=this._Activatedroute.snapshot.paramMap.get("id")

    // console.log(history.state.id)

      this.contc.getContactData(this._Activatedroute.snapshot.paramMap.get("id")).subscribe((contactdata:any)=>{
        this.contactData=contactdata[0]
        this.SelectedCompany=contactdata
        this.username=contactdata[0].contact_owner
        this.country_code=contactdata[0].country_code?contactdata[0].country_code:91
        console.log(contactdata[0])

        this.company_name=contactdata[0].company_name
        this.company_industry=contactdata[0].industry
        this.company_country=contactdata[0].country
        this.company_state=contactdata[0].state
        this.company_city=contactdata[0].city
        this.company_location=contactdata[0].location

        this.fullname=contactdata[0]?.first_name+" "+contactdata[0]?.last_name
        this.forminit()
      })

      this.dropdownSettings = {
        singleSelection: true,
        idField: 'account_id',
        textField: 'company_name',
        noDataAvailablePlaceholderText:'No Company Found!',
        closeDropDownOnSelection:true,
        allowSearchFilter: true
      };

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

   this.company_name=filtered_company[0].company_name
    this.company_industry=filtered_company[0].industry
    this.company_country=filtered_company[0].company_country
    this.company_state=filtered_company[0].company_state
    this.company_city=filtered_company[0].company_city
    this.company_location=filtered_company[0].company_location

  }

  get f() {
    return this.contactForm.controls;
  }


toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
}

  forminit(){
    this.contactForm=this.contact.group({
                contact_id: this.contactId,
                country_code:this.country_code,
                contact_owner: this.username,

                company_name:[this.company_name,Validators.required],
                industry:this.company_industry,
                country:this.company_country,
                state:this.company_state,
                city:this.company_city,
                location:this.company_location,

                department:this.contactData?.department?this.contactData?.department:'',
                role:[this.contactData?.role?this.contactData?.role:'',Validators.required],
                first_name:[this.contactData?.first_name?this.contactData?.first_name:'',Validators.required],
                last_name:[this.contactData?.last_name?this.contactData?.last_name:'',Validators.required],
                contact_name:this.contactData?.contact_name?this.contactData?.contact_name:'',
                phone_no:[this.contactData?.phone_no?this.contactData?.phone_no:''],
                mobile_no:[this.contactData?.mobile_no?this.contactData?.mobile_no:'',Validators.required],
                email:[this.contactData?.email?this.contactData?.email:''],
                secondary_email:[this.contactData?.secondary_email?this.contactData?.secondary_email:''],
                remark:this.contactData?.remark?this.contactData?.remark:'',
                created_at:this.contactData?.created_at?this.contactData?.created_at:'',
                SelectedCompany:[this.SelectedCompany,Validators.required]
    })
  }

}
