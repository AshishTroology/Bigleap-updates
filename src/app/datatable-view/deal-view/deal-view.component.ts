import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { AuthService } from 'src/app/service/auth.service';
import { ContactService } from 'src/app/service/contact.service';
import { DealFormService } from 'src/app/service/deal-form.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-deal-view',
  templateUrl: './deal-view.component.html',
  styleUrls: ['./deal-view.component.css']
})
export class DealViewComponent implements OnInit {
  public gridData: any;
  public gridView: any;

  quote_id:any
  user:any
  currentUser:any
  userId:any

  pending:any=[]
  verified:any=[]
  approved:any=[]

  userPermission:any

  public mySelection: string[] = [];
 dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient,private router:Router,
    private deals:DealFormService,
    private auth:AuthService,
    private role:UserService,
    private contact:ContactService) { }

  ngOnInit(): void {
    this.auth.userLoggedIn().subscribe((user:any)=>{
      console.log(user)
      this.user=user.result
      this.currentUser=user.result.username
      this.userId=user.result._id

      this.role.getUserRolePermissions(user.result.role).subscribe((data:any)=>{
        console.log(data.result[0])
        this.userPermission=data.result[0]
      })
    })
    this.getDeals()
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    
  }
  handleVerify(id:any){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Approve it!'
    }).then((result) => {
      if (result.isConfirmed) {
         
        console.log(id)
        let quote=this.gridData.filter((data:any)=>data._id===id)
        quote[0].verified_by=this.user
        quote[0].verified_date=new Date()
        quote[0].deal_status="verified"
        quote[0].verified=true
    
        console.log(quote[0])
    this.deals.submitForm(quote[0]).subscribe((data:any)=>{
      console.log(data)
      console.log(data)
      if(data.status===200){
        Swal.fire(
          'Verified!',
          'Your Quote is verified.',
          'success'
        )
      }else{
        Swal.fire(
          'Error!',
          'Something went wrong!',
          'error'
        )
      }
    })
      }
    })



  }
  handleApprove(id:any){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Approve it!'
    }).then((result) => {
      if (result.isConfirmed) {
         
    console.log(id)
    let quote=this.gridData.filter((data:any)=>data._id===id)
    console.log(quote,"before",this.gridData)
    if(quote[0].deal_status==="pending"){
      quote[0].verified=true
      quote[0].verified_by=this.user
      quote[0].verified_date=new Date()
    }
    quote[0].approved_by=this.user
    quote[0].approval_date=new Date()

    quote[0].aprroved=true
    console.log(quote,"after")

    quote[0].deal_status="approved"


    this.deals.submitForm(quote[0]).subscribe((data:any)=>{
      console.log(data)
      console.log(data)
     
      if(data.status===200){
        Swal.fire(
          'Verified!',
          'Your Quote is verified.',
          'success'
        )
      }else{
        Swal.fire(
          'Error!',
          'Something went wrong!',
          'error'
        )
      }
    })
      }
    })

   
  }


  getDeals(){
    console.log("get deals")
    this.deals.getAllDeals().subscribe((data:any)=>{

      data?.results.map((dt:any,index:any)=>{
        let date=new Date(dt.created_date_time)
        data.results[index].approved_by=dt.approved_by && dt.approved_by!="undefined"?dt.approved_by[0]:{username:'NA'}
        data.results[index].verified_by=dt.verified_by && dt.approved_by!="undefined"?dt.verified_by[0]:{username:'NA'}
        data.results[index].created_date_time=date.toLocaleString("en-IN",{day:'numeric',month:'short',year:'numeric'})
        
        // this.account.getAccountData(dt.account_id).subscribe((resdata:any)=>{
        //   console.log(resdata)
        //   data.results[index].company_name=resdata[0].company_name
        // })

        this.contact.getContactData(dt.contact_id).subscribe((cntdata:any)=>{
          console.log(cntdata)
          data.results[index].contact_name=cntdata[0].contact_name
          data.results[index].company_name=cntdata[0].company_name
        })
        if(dt.modified_date_time){
          let modify_date=new Date(dt?.modified_date_time)
        data.results[index].modified_date_time=modify_date.toLocaleString("en-IN",{day:'numeric',month:'short',year:'numeric'})
        }else{
          data.results[index].modified_date_time="NA"
        }
        let date2=new Date()

        var Difference_In_Time = date2.getTime() - date.getTime();
          
        // To calculate the no. of days between two dates
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        data.results[index]['aging']=Math.floor(Difference_In_Days)+" days"  
      })


      this.gridData=data.results
      this.gridView = data.results;
      console.log(data)
      this.dtTrigger.next();
    })
  }

  handleEdit(id:any){
    console.log("edit clicked "+id)
    this.router.navigateByUrl('/edit-deal',{state:{id}})
  }

  handleDelete(id:any){
 this.dtTrigger.unsubscribe();
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
        this.deals.deleteDeal(id).subscribe((data:any)=>{
          if(data.status===200)
            Swal.fire(data.message, '', 'success')
          else if(data.status===500)
            Swal.fire(data.message, '', 'error')
            this.getDeals()
        })
      }
    })
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}