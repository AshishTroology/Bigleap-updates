import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router,private auth:AuthService){
  }

  onActivate(e:any){
    console.log(e)
    scrollTo({
      top:0,
      behavior:'smooth'
    })
  }

  ngOnInit(){
    // this.auth.userLoggedIn().subscribe((data:any)=>{
    //  console.log(data)
    // })
    // if (localStorage.getItem("username") === null || localStorage.getItem('user')) {
    //   localStorage.clear();
    // }

  }
  title = 'DT-angular-App';


}
