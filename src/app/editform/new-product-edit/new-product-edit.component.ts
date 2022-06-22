import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder ,Validators} from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { ProductService } from 'src/app/service/product.service';
import { TosterService } from 'src/app/service/toster.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-new-product-edit',
  templateUrl: './new-product-edit.component.html',
  styleUrls: ['./new-product-edit.component.css']
})
export class NewProductEditComponent implements OnInit {

  productForm!:FormGroup
  closebutton:any;
  login_id: any;
  productdata:any;
  PID:any;
  pno:any;
  pname:any;
  CCNNo:any;
  isValidbutton: any;
  saveas: any = true;
  isValidFormSubmitted: any;
  productname:any;
  GST: any;
  type: any;
  OEMProductCode: any;
  PartNo: any;
  constructor(
    private fb:FormBuilder,private prdadd:ProductService,
    private toast:TosterService,
    private router:Router,
    private _Activatedroute:ActivatedRoute,
    private Auth:AuthService,
    private product:ProductService,

    ) { }

    get f() {
      return this.productForm.controls;
    }

 

  ngOnInit(): void {
    this.PID=  this._Activatedroute.snapshot.paramMap.get('id');
   
   
    // this.product.getproduct(this.PID).subscribe((data: any) => {
    //   console.log(data.result[0]);
    //   this.forminit(data.result[0]);
   
    //   this.productname = data.result[0].productname;
    //   console.log(this.productname)
    // });
    this.PID=this._Activatedroute.snapshot.paramMap.get("id")
  
    this.product.getproduct(this.PID).subscribe((data:any)=>{
      console.log(data.result[0]);
      this.GST=data.result[0].GST
      this.type = data.result[0].type;
      this.productname=data.result[0].productname
      this.OEMProductCode=data.result[0].OEMProductCode
      this.PartNo=data.result[0].PartNo
      this.CCNNo=data.result[0].CCNNo
    console.log(this.OEMProductCode);
      this.forminit(data.result[0]);;
    });
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
 
 

 


  getValuesChange(e:any,field:any){
    this.productForm.value[field]=e.target.value;
  }
  getValues(e:any,field:any){
    this.productForm.value[field]=e.target.value;
  }
   onFormSubmit() {
    this.isValidFormSubmitted = false;
    if (this.productForm.invalid) {
      console.log(this.productForm, 'error');
      this.isValidFormSubmitted = true;
      this.isValidbutton = false;
      this.toast.showError('Sorry!, Fields are mandatory.');
    } else {
      console.log(this.productForm, 'true');
      this.isValidbutton = true;
     
      this.product
        .updateForm(this.productForm.value,this.PID)
        .subscribe((resdata: any) => {
          console.log(resdata);
          this.toast.showSuccess(
            'Congratulation!, Product has been updated.'
          );
          if (this.saveas == 'save') {
            console.log(this.saveas);
            setTimeout(() => {
              this.router.navigate(['/new-products']);
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


  

  async convertToMaster(){
    let obj=await{
      type:this.productForm.value.type,
      productname:this.productForm.value.productname,
      PartNo:this.productForm.value.PartNo,
      CCNNo:this.productForm.value.CCNNo,
      UnitPrice:this.productForm.value.UnitPrice,
      UOM:this.productForm.value.UOM,
      Category:this.productForm.value.Category,
      OEM:this.productForm.value.OEM,
      OEMProductCode:this.productForm.value.OEMProductCode,
      HSNCode:this.productForm.value.HSNCode,
      GST:this.productForm.value.GST,
   
    }

    console.log(obj)
    if(this.productForm.invalid){
     window.scrollTo({top:0,
    behavior:'smooth'})
     this.isValidFormSubmitted=true
   }else{
    await this.product.addNewProductMAster(obj).subscribe((data:any)=>{
      console.log(data)
      if(data.status==200){
        this.product.deleteNewProduct(this.PID).subscribe((data:any)=>{
          this.toast.showSuccess('Convert To product Master')
          setTimeout(() => {
           document.getElementsByClassName("modal-backdrop")[0]?.classList.remove('modal-backdrop')
            console.log()
            this.router.navigate(['products-list'])
          }, 1500);
        })
      }else if(data.status===500){
       this.toast.showError(data.message)
     }
    })
   }
  }

}

