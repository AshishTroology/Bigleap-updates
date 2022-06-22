import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { TosterService } from '../service/toster.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productForm!:FormGroup
  isValidFormSubmitted: any;
  buttondisabled: any=true;
  constructor(private prdAdd:FormBuilder,private prdadd:ProductService,
    private toast:TosterService,
    private router:Router) { }


  handleSubmit(){
    
    this.productForm.value.amount=this.productForm.value.UnitPrice
    this.productForm.value.quantity=1
    this.productForm.value.parent=false
    if (this.productForm.invalid) {
      console.log(this.productForm, 'error');
      this.isValidFormSubmitted = true;
    }
    else {
      console.log(this.productForm, 'true');
      this.prdadd.AddProduct(this.productForm.value).subscribe((data:any)=>{
        this.buttondisabled="false";
       
  
      console.log(data)
      if(data.status==200){
        this.isValidFormSubmitted = true;
        this.toast.showSuccess(data.message)
        this.productForm.reset()
        this.router.navigate(['/new-products'])
      }else if(data.status==200){
        this.toast.showError(data.message)
      }
      // setTimeout(()=>{
      // },1000)
    })
  }
}


  ngOnInit(): void {
    this.formInit()
  }

  get f() {
    return this.productForm.controls;
  }
  formInit(){
    this.productForm=this.prdAdd.group({
      id:Math.floor(Math.random()*(100000 - 10000) + 10000),
      CCNNo:'',
      Category:"",
      GST:['',Validators.required],
      HSNCode:['',Validators.required],
      OEM:"",
      OEMProductCode:"",
      PartNo:['',Validators.required],
      UOM:['',Validators.required],
      UnitPrice:['',Validators.required],
      productname:['',Validators.required],
      type:['',Validators.required],
      parent:"",
      quantity:"",
      amount:'',
      products:""
    })
    
  }

}
