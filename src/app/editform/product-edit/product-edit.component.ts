import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { ProductService } from 'src/app/service/product.service';
import { TosterService } from 'src/app/service/toster.service';
import { ActivatedRoute,Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm!:FormGroup
  closebutton:any;
  login_id: any;
  productdata:any;
  PID:any;
  pno:any;
  pname:any;
  type:any;
  productname:any
  CCNNo:any;
  GST:any
  isValidbutton: any;
  saveas: any = true;
  isValidFormSubmitted: any;
  oem:any
  OEMProductCode: any;
  PartNo: any;
  constructor(
    private fb:FormBuilder,
    private Toaster:TosterService,
    private router:Router,
    private _Activatedroute:ActivatedRoute,
    private Auth:AuthService,
    private product:ProductService,

    ) { }

    

 

    ngOnInit(): void {
      this.PID=this._Activatedroute.snapshot.paramMap.get("id")
      this.Auth.userLoggedIn().subscribe((logindata: any) => {
        console.log(logindata);
        this.login_id = logindata.result._id;
      });
      this.product.getproductmaster(this.PID).subscribe((data:any)=>{
      
      console.log(data.result[0]);
      this.GST=data.result[0].GST
      this.type = data.result[0].type;
      this.productname=data.result[0].productname
      this.OEMProductCode=data.result[0].OEMProductCode
      this.PartNo=data.result[0].PartNo
      this.CCNNo=data.result[0].CCNNo
    console.log(this.OEMProductCode);
    
        this.forminit(data.result[0]);
      });
    }
    get f() {
      return this.productForm.controls;
    }

  
  forminit(uni:any){
    this.productForm=this.fb.group({
      type:[uni.type,Validators.required],
      productname:[uni.productname,Validators.required],
      PartNo:[uni.PartNo,Validators.required],
      CCNNo:uni.CCNNo,
      UnitPrice:[uni.UnitPrice,Validators.required],
      UOM:[uni.UOM,Validators.required],
      Category:uni.Category,
      OEM:uni.OEM,
      OEMProductCode:uni.OEMProductCode,
      HSNCode:[uni.HSNCode,Validators.required],
      GST:[uni.GST,Validators.required],
    })
    
  }
  saveform(svalue: any) {
    if (this.productForm.invalid) {
      this.saveas = true;
    } else {
      this.saveas = svalue;
    }
  }
 
 
  onFormSubmit() {
    this.isValidFormSubmitted = false;
    if (this.productForm.invalid) {
      console.log(this.productForm, 'error');
      this.isValidFormSubmitted = true;
      this.isValidbutton = false;
      this.Toaster.showError('Sorry!, Fields are mandatory.');
    } else {
      console.log(this.productForm, 'true');
      this.isValidbutton = true;
      
      this.product
        .update_productmaster(this.productForm.value,this.PID)
        .subscribe((resdata: any) => {
          console.log(resdata);
          this.Toaster.showSuccess(
            'Congratulation!, Product has been updated.'
          );
          if (this.saveas == 'save') {
            console.log(this.saveas);
            setTimeout(() => {
              this.router.navigate(['/products-list']);
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
  getValuesChange(e:any,field:any){
    this.productForm.value[field]=e.target.value;
  }
  getValues(e:any,field:any){
    this.productForm.value[field]=e.target.value;
  }
}
