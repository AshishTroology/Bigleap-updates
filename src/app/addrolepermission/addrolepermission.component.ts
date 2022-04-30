import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TosterService } from '../service/toster.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-addrolepermission',
  templateUrl: './addrolepermission.component.html',
  styleUrls: ['./addrolepermission.component.css']
})
export class AddrolepermissionComponent implements OnInit {
  buttondisabled: any=true;
  constructor(private fb: FormBuilder, private userService:UserService,
    private router:Router,
    private toast:TosterService
    ) {}
  addroleform!: FormGroup;
  isValidFormSubmitted:any;
  
  ngOnInit(): void {
    this.forminit();
  }
  get f() {
    return this.addroleform.controls;
  }

  forminit() {
    this.addroleform = this.fb.group({
      role_name: ['', Validators.required],
      description: '',
      leadview: false,
      leadcreate: false,
      leadedit: false,
      leaddelete: false,
      leadverifier: false,
      leadapprover: false,
      quoteview: false,
      quotecreate: false,
      quoteedit: false,
      quotedelete: false,
      quoteverifier: false,
      quoteapprover: false,
      dealview: false,
      dealcreate: false,
      dealedit: false,
      dealdelete: false,
      dealverifier: false,
      dealapprover: false,
      accountview: false,
      accountcreate: false,
      accountedit: false,
      accountdelete: false,
      contactview: false,
      contactcreate: false,
      contactedit: false,
      contactdelete: false,
      userview: false,
      usercreate: false,
      useredit: false,
      userdelete: false,
      roleview: false,
      rolecreate: false,
      roleedit: false,
      roledelete: false,
      servicecreate: false,
      serviceedit: false,
      servicedelete: false,
      serviceview: false,
      performancecreate: false,
      performanceview: false,
      performanceedit: false,
      performancedelete: false,
      convertleadtoquote: false,
      convertquotetodeal: false,
    });
  }

  onsubmit() {
    if (this.addroleform.invalid) {
      console.log(this.addroleform, 'error');
      this.isValidFormSubmitted = true;
    } else {
      console.log(this.addroleform, 'true');
       console.log(this.addroleform, 'true');
       this.userService.createRole(this.addroleform.value).subscribe((data) => {
         this.buttondisabled = 'false';
         this.toast.showSuccess("Congratulation!, Role has been created")
         setTimeout(()=>{
          this.router.navigate(['/role-list'])
         },2000)
       });
    }
  }

}
