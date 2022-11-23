import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../service/account.service';
import { AuthService } from '../service/auth.service';
import { TosterService } from '../service/toster.service';
import { country } from '../../assets/Country';
import { CountryStateCityService } from '../service/country-state-city.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  display: string = '';
  inputNum: any = '';
  accFormAdd!: FormGroup;
  accountId: any;
  Data: any = [];
  Countrydata: any = country;
  State: any = [];
  City: any = [];
  AddState: any = [];
  AddCity: any = [];
  country_code: any = 91;
  username: any;
  isValidFormSubmitted: any = false;
  statedata: any;
  cgst: any;

  constructor(
    private account: FormBuilder,
    private accnt: AccountService,
    private toast: TosterService,
    private router: Router,
    private userAuth: AuthService,
    private state_country: CountryStateCityService
  ) {
    let number = Math.random(); // 0.9394456857981651
    number.toString(36); // '0.xtis06h6'
    var id = number.toString(36).substr(2, 9);
    this.accountId = id.toUpperCase();
  }
  // username=localStorage.getItem('username')?localStorage.getItem('username'):this.router.navigate(['/login'])

  submitForm(): void {
    console.log(this.accFormAdd);
    this.accFormAdd.value.pan = this.display;
    console.log(this.accFormAdd.invalid);
    if (this.accFormAdd.invalid) {
      window.scrollTo({ top: 209, behavior: 'smooth' });
      this.isValidFormSubmitted = true;
    } else {
      console.log(this.accFormAdd.value);
      this.accFormAdd.value.account_owner = this.username;
      this.accFormAdd.value.account_id = this.accountId;
      this.accFormAdd.value.pan = this.display;
      // this.accFormAdd = this.pan.slice(0,27)+"..."

      this.accFormAdd.value.country_code = this.country_code;
      this.accnt.submitForm(this.accFormAdd.value).subscribe((data: any) => {
        if (data.status === 200) {
          this.toast.showSuccess(data.message);
          this.router.navigate(['/account']);
        } else if (data.status === 201) {
          this.toast.showWarning(data.message);
        } else if (data.status === 500) {
          this.toast.showError(data.message);
        }
      });
    }
  }

  changeCountry() {
    console.log(this.accFormAdd.value.company_country);
    this.accFormAdd.value.company_state = '';
    this.accFormAdd.value.company_city = '';

    let countr: any = country.filter(
      (country: any) =>
        country.country_name === this.accFormAdd.value.company_country
    );
    this.country_code = countr[0].country_phone_code;
    this.state_country
      .getStates(this.accFormAdd.value.company_country)
      .subscribe((state) => {
        console.log(state);
        this.State = state;
      });
  }

  changeState() {
    console.log(this.accFormAdd.value.company_state);
    this.accFormAdd.value.company_city = '';
    // this.state_country.getCity(this.accFormAdd.value.company_state).subscribe((city)=>{
    //   console.log(city)

    //   this.City=city
    // })
  }

  countryChangeAdd(c: any) {
    console.log(c.target.value);
    this.state_country
      .getStates({ country: c.target.value })
      .subscribe((state: any) => {
        console.log(state);
        this.AddState = state.result;
      });
  }

  // changeStateAdd(){
  //   console.log(this.accFormAdd.value.state)
  //   this.accFormAdd.value.company_city=''
  //   this.state_country.getCity(this.accFormAdd.value.state).subscribe((city)=>{
  //     console.log(city)
  //     this.AddCity=city
  //   })
  // }

  get f() {
    return this.accFormAdd.controls;
  }

  ngOnInit(): void {
    this.Countrydata = country;

    console.log(country);
    // this.userAuth.userLoggedIn().subscribe((data:any)=>{

    // })
    this.userAuth.userLoggedIn().subscribe((user: any) => {
      console.log(user.result.username);
      this.username = user.result.username;
      this.forminit();
    });
  }

  forminit() {
    this.accFormAdd = this.account.group({
      account_id: this.accountId,
      account_owner: this.username ? this.username : '',
      country_code: this.country_code,
      company_name: ['', Validators.required],
      industry: ['', Validators.required],
      company_country: ['', Validators.required],
      company_state: ['', Validators.required],
      company_city: ['', Validators.required],
      company_location: '',
      gst: [
        '',
        Validators.pattern(
          /^([0][1-9]|[1-2][0-9]|[3][0-7])([A-Z]{5})([0-9]{4})([A-Z]{1}[1-9A-Z]{1})([Z]{1})([0-9A-Z]{1})+$/
        ),
      ],
      pan: ['', Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)],
      tan: '',
      cin: '',
      phone_no: '',
      mobile_no: [''],
      email: [''],

      secondary_email: [''],
      address1: '',
      address2: '',
      address3: '',
      country: '',
      state: '',
      city: '',
      zip_code: '',
      remark: '',
      created_at: '',
    });
  }
  getstate(e: any) {
    console.log(e.target.value);
    this.state_country
      .getStates({
        statename: e.target.value,
      })
      .subscribe((data: any) => {
        console.log(data);
        this.statedata = data.result;
      });
  }
  getval(val: string) {
    console.log(val);

    // this.display=display
    this.display = val.slice(2, 12);
  }
}

// Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)
