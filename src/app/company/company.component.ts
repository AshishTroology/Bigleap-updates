import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { CompanyService } from '../service/company.service';
import { TosterService } from '../service/toster.service';
import { country } from 'src/assets/Country';
import { CountryStateCityService } from '../service/country-state-city.service';
import Swal from 'sweetalert2';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})

export class CompanyComponent implements OnInit {
  userId:any
  Data:any
  companyId:any
  branchId:any
  fullname:any
  companyForm!:FormGroup
  addressForm!:FormGroup
  loginUser:any
  addnewaddress:any=false
  address:any=[]
  Country:any
  State:any
  City:any
  companyName:any
  companyGst:any
  companyPan:any
  companyLogo:any
  branchLogo:any
  isValidFormSubmitted:any=false
  user:any
  userPermission:any
  AddState:any=[]


  constructor(
    private company:CompanyService,
    private form:FormBuilder,
    private toast:TosterService,
    private auth:AuthService,
    private state_country:CountryStateCityService,
    private userservice: UserService,
    private router:Router) {
      
     }


    submitForm(){
      this.companyForm.value.company_name=this.companyName
      this.companyForm.value.gstin=this.companyGst
      this.companyForm.value.pan=this.companyPan
      this.companyForm.value.company_logo=this.companyLogo

      console.log(this.companyForm.value)
      if(this.companyForm.invalid){
       
        this.isValidFormSubmitted=true
      }else{
      this.company.submitForm(this.companyForm.value).subscribe((data:any)=>{
        console.log(data)
          if(data.status===200){
            this.toast.showSuccess(data.message)
          }else if(data.status===201){
            console.log(data.err)
            this.toast.showWarning(data.message)
          }else if(data.status===500){
            this.toast.showError(data.message)
          }
      })
    }
    }

    handleUpload(e:any){
      console.log(e.target.files)
      this.company.UploadFile(e.target.files,this.companyId).subscribe((data:any)=>{
        if(data.status===200){
          this.toast.showSuccess(data.message)
          this.companyLogo=data.url
        }else if(data.status===500){
          this.toast.showError(data.message)
        }else if(data.status===400){

        }
        console.log(data)
      })
    }

    handleBranchUpload(e:any){
      console.log(e.target.files)
      this.company.UploadFile(e.target.files,this.branchId).subscribe((data:any)=>{
        console.log(data)
        if(data.status===200){
          this.toast.showSuccess(data.message)
          this.branchLogo=data.url
          this.addressForm.value.branch_logo=data.url
        }else if(data.status===500){
          this.toast.showError(data.message)
        }
      })
    }


    handleAddNew(){
      this.addnewaddress=true
      this.isValidFormSubmitted=false
      this.addforminit()
    }

    handleAddressDelete(id:any){
      console.log(id)

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.company.DeleteAddress(id).subscribe((data:any)=>{
            if(data.status===200){
              this.toast.showSuccess(data.message)
              this.getAddress()
            }else if(data.status===500){
              this.toast.showError(data.message)
            }
          })
          
        }
      })

    }

    handleClose(){
      this.addnewaddress=false
      this.addforminit()
    }


    handleSave(){
      this.addressForm.value.full_address=this.addressForm.value.address1+" "+this.addressForm.value.address2+" "+this.addressForm.value.address3+" "+this.addressForm.value.city+" "+this.addressForm.value.state+" "+this.addressForm.value.country
      this.addressForm.value['branch_logo']=this.branchLogo
      console.log(this.branchLogo)
      console.log(this.addressForm.value)
      console.log(this.addressForm)
      console.log(this.addressForm.value['branch_logo'])
      if(this.addressForm.invalid){
        this.isValidFormSubmitted=true
        
      }else{
      this.company.AddressSubmit(this.addressForm.value).subscribe((data:any)=>{
        console.log(data)
        if(data.status==200){
          this.toast.showSuccess(data.message)
          this.getAddress()
          this.addnewaddress=false
        }else if(data.status==500){
          this.toast.showError(data.message)
        }

      })
    }
    }

    getAddress(){
      this.company.GetAddress().subscribe((data:any)=>{
        console.log(data)
        if(data.status===200){
          this.address=data.result
        }else if(data.status===500){
          this.getAddress()
        }
      })
    }

    // changeCountry(){
    //   console.log(this.addressForm.value.country)
    //   this.state_country.getStates(this.addressForm.value.country).subscribe((state)=>{
    //     console.log(state)
    //     this.State=state
    //   })
    // }

    // changeState(){
    //   console.log(this.addressForm.value.state)
    //   this.state_country.getCity(this.addressForm.value.state).subscribe((city)=>{
    //     console.log(city)
    //     this.City=city
    //   })
    // }
    
    get c() {
      return this.companyForm.controls;
    }
    get f() {
      return this.addressForm.controls;
    }
  

  ngOnInit(): void {
     this.companyId="0vo6elkq0"
     
     this.auth.userLoggedIn().subscribe((user:any)=>{
      console.log(user)
      this.user=user.result
      this.userservice.getUserRolePermissions(user.result.role).subscribe((data:any)=>{
        console.log(data.result[0])
        this.userPermission=data.result[0]
        if(!(this.userPermission.role_name==="super admin")){
            this.router.navigate(['/'])
        }
      })
    })
      let number2 = Math.random() // 0.9394456857981651
      number2.toString(36); // '0.xtis06h6'
     var id = number2.toString(36).substr(2, 9);
     this.branchId=id.toUpperCase()

    this.getAddress()
    console.log(this.getAddress);
    
    this.Country=country
    this.auth.userLoggedIn().subscribe((data:any)=>{
      this.loginUser=data.result.username
      this.company.getCompanyData(this.companyId).subscribe((companydata:any)=>{
        this.Data=companydata[0]
        // console.log(companydata[0])
        this.companyName=companydata[0]?.company_name
        this.companyGst=companydata[0]?.gstin
        this.companyPan=companydata[0]?.pan
        this.companyLogo=companydata[0]?.company_logo
        this.fullname=companydata[0]?.first_name+" "+companydata[0]?.last_name
        this.forminit()
        this.addforminit()
      })




      
    })

  }

  countryChangeAdd(c:any){
    console.log(c.target.value)
    this.state_country.getStates({country:c.target.value}).subscribe((state:any)=>{
      console.log(state)
      this.AddState=state.result
    })
  }

  handleNameChange(e:any){
    console.log(e.target.value)
    this.companyName=e.target.value
  }
  handleGst(e:any){
    this.companyGst=e.target.value
  }
  handlePan(e:any){
    this.companyPan=e.target.value
  }
  addforminit(){
    this.addressForm=this.form.group({
        branch_id:[this.branchId,Validators.required],
        branch_name:['',Validators.required],
        branch_gst:['',[Validators.required,Validators.pattern(/^([0][1-9]|[1-2][0-9]|[3][0-7])([A-Z]{5})([0-9]{4})([A-Z]{1}[1-9A-Z]{1})([Z]{1})([0-9A-Z]{1})+$/)]],
        branch_logo:[this.branchLogo,Validators.required],
        address1:["",Validators.required],
        address2:'',
        address3:'',
        country:['',Validators.required],
        state:['',Validators.required],
        city:['',Validators.required],
        zipcode:['',Validators.required],
        full_address:''
    })
  }

  forminit(){
    this.companyForm=this.form.group({
      company_id:[this.companyId,Validators.required],
      company_owner:[this.Data?.company_owner?this.Data?.company_owner:this.loginUser,Validators.required],
      company_name:[this.Data?.company_name?this.Data?.company_name:'',Validators.required],
      company_logo:[this.Data?.company_logo?this.Data?.company_logo:'',Validators.required],
      gstin:[this.Data?.gstin?this.Data?.gstin:'',[Validators.required,Validators.pattern(/^([0][1-9]|[1-2][0-9]|[3][0-7])([A-Z]{5})([0-9]{4})([A-Z]{1}[1-9A-Z]{1})([Z]{1})([0-9A-Z]{1})+$/)]],
      pan:[this.Data?.pan?this.Data?.pan:'',[Validators.required,Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)]],
      phone_no:this.Data?.phone_no?this.Data?.phone_no:'',
      mobile_no:[this.Data?.mobile_no?this.Data?.mobile_no:'',Validators.required],
      email:[this.Data?.email?this.Data?.email:'',[Validators.required,Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      secondary_email:[this.Data?.secondary_email?this.Data?.secondary_email:'',Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
      created_at:this.Data?.created_at?this.Data?.created_at:''
    })
    // console.log(this.companyForm)
  }
}
