import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { TosterService } from 'src/app/service/toster.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {
  roleId:any;
  saveas: any = true;
  saveasnew: any = true;
  isValidbutton: any;
  buttondisabled: any=true;
  addroleform!: FormGroup;
  isValidFormSubmitted:any;
  constructor(
    private fb: FormBuilder, 
    private userService:UserService,
    private router:Router,
    private toast:TosterService,
    private _Activatedroute: ActivatedRoute,
    ) {}

 

    ngOnInit(): void {
      this.roleId=this._Activatedroute.snapshot.paramMap.get("id")
      this.userService.getUserRolePermissions(this.roleId).subscribe((data:any)=>{
        this.forminit(data.result[0]);
      });
    }
    get f() {
      return this.addroleform.controls;
    }
  
  
    forminit(uni: any) {
      this.addroleform = this.fb.group({
        role_name:  [uni.role_name, [Validators.required]],
       
        description:uni.description,
        leadview:uni.leadview,
        leadcreate:uni.leadcreate,
        leadedit:uni.leadedit,
        leaddelete:uni.leaddelete,
        leadverifier:uni.leadverifier,
        leadapprover:uni.leadapprover,
        quoteview:uni.quoteview,
        quotecreate:uni.quotecreate,
        quoteedit:uni.quoteedit,
        quotedelete:uni.quotedelete,
        quoteverifier:uni.quoteverifier,
        quoteapprover:uni.quoteapprover,
        dealview:uni.dealview,
        dealcreate:uni.dealcreate,
        dealedit:uni.dealedit,
        dealdelete:uni.dealdelete,
        dealverifier:uni.dealverifier,
        dealapprover:uni.dealapprover,
        accountview:uni.accountview,
        accountcreate:uni.accountcreate,
        accountedit:uni.accountedit,
        accountdelete:uni.accountdelete,
        contactview:uni.contactview,
        contactcreate:uni.contactcreate,
        contactedit:uni.contactedit,
        contactdelete:uni.contactdelete,
        userview:uni.userview,
        usercreate:uni.usercreate,
        useredit:uni.useredit,
        userdelete:uni.userdelete,
        roleview:uni.roleview,
        rolecreate:uni.rolecreate,
        roleedit:uni.roleedit,
        roledelete:uni.roledelete,
        convertleadtoquote:uni.convertleadtoquote,
        convertquotetodeal:uni.convertquotetodeal, 
        serviceview:uni.serviceview,
        servicecreate:uni.servicecreate,
        serviceedit:uni.serviceedit,
        servicedelete:uni.servicedelete,
        performancecreate:uni.performancecreate,
        
        performanceview:uni.performanceview,
        performanceedit:uni.performanceedit,
        performancedelete:uni.performancedelete,
      });
    }
  
    saveform(svalue: any) {
      if (this.addroleform.invalid) {
        this.saveas = true;
      } else {
        this.saveas = svalue;
      }
    }
    saveasnewform(savalue: any) {
      if (this.addroleform.invalid) {
        this.saveasnew = true;
      } else {
        this.saveas = savalue;
      }
    }
   
    onFormSubmit() {
      this.isValidFormSubmitted = false;
      if (this.addroleform.invalid) {
        console.log(this.addroleform, 'error');
        this.isValidFormSubmitted = true;
        this.isValidbutton = false;
        this.toast.showError('Sorry!, Fields are mandatory.');
      } else {
        console.log(this.addroleform, 'true');
        this.isValidbutton = true;
        
        this.userService
          .updaterolebyid(this.roleId,this.addroleform.value)
          .subscribe((resdata: any) => {
            console.log(resdata);
            this.toast.showSuccess(
              'Congratulation!, Role has been updated.'
            );
            if (this.saveas == 'save') {
              console.log(this.saveas);
              setTimeout(() => {
                this.router.navigate(['/role-list']);
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
  
    // handleWarningAlert() {
    //   Swal.fire({
       
    //     text: 'Are you sure you want to exit?',
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonText: 'Yes',
    //     cancelButtonText: 'No',
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       console.log('Clicked Yes, File deleted!');
    //       window.location.href="role"
    //     } else if (result.isDismissed) {
    //       console.log('Clicked No, File is safe!');
    //     }
    //   });
    // }
  }