import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MultiSelectTreeCheckableSettings } from '@progress/kendo-angular-dropdowns';
import { AccountService } from '../../service/account.service';
import { AuthService } from '../../service/auth.service';
import { CompanyService } from '../../service/company.service';
import { ContactService } from '../../service/contact.service';
import { ProductService } from '../../service/product.service';
import { ServiceRequestService } from '../../service/service-request.service';
import { TosterService } from '../../service/toster.service';
import { UploadAttachmentService } from '../../service/upload-attachment.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-services-view',
  templateUrl: './services-view.component.html',
  styleUrls: ['./services-view.component.css']
})
export class ServicesViewComponent implements OnInit {



  @ViewChild('multiselecttree', { static: true })
  public multiselecttree: any;
  public checkableSettings: MultiSelectTreeCheckableSettings = {
    checkChildren: true,
    checkOnClick: false,
  };
  saveas: any = true;
  saveasnew: any = true;
  ServiceForm!: FormGroup
  serviceId: any
  userId: any
  currentUser: any
  attachment_files: any = []
  show_files: any = []
  files_url: any = []
  isValidFormSubmitted: any;
  isValidbutton: any;
  incoTerm: any = [{ value: null }]
  addservice: any = [{ value: null }]
  accountData: any;
  todayDate: any;
  selectedProduct: any = [];
  showDropdownData: any = []
  showDropdownBox: boolean = false
  totalAmount: any = 0
  totalQuantity: any = 0
  salesPersonData: any
  contactData: any
  contactTempData: any = ''
  loggedInUser: any
  leadOwner: any
  leadOwnerId: any
  selectedCompany: any
  users: any
  lead_id: any
  location: any
  isValidPrdFormSubmitted: any = false

  add_service: any;
  attachments: any;
  type_on_btn: any = true;
  type_off_btn: any = false;

  priority_low_btn: any = true;
  priority_medium_btn: any = false;
  priority_hight_btn: any = false;
  priority_urgent_btn: any = false;

  service_amc_btn: any = true;
  service_foc_btn: any = false;
  service_paid_btn: any = false;
  service_other_btn: any = false;

  source_call_btn: any = true;
  source_mail_btn: any = false;
  source_message_btn: any = false;

  service_type: any
  priority: any
  service_location: any;

  dropdownList: any = []
  selectedItems: any = [];
  selectedUser: any
  dropdownSettings = {};
  contactDropdownSettings = {}
  productDropdownSettings = {}
  ownerDropdownSettings = {}
  salesPersonDropdownSettings = {}
  s_id: any;
  contact_id: any
  contact_name: any
  contact_role: any
  contact_phone: any
  contact_mobile: any
  contact_email: any
  accountVal: any;
  account_info_val: any;
  source_type: any
  sId: any;
  accountd: any;
  account_info: any;
  selectedItemtt: any = [];
  add_serviced: any;
  sdata: any;
  selectedAccount: any = []
  serviceData: any;
  constructor(
    private fb: FormBuilder,
    private Toaster: TosterService,
    private router: Router,
    private Route: Router,
    private auth: AuthService,
    private account: AccountService,
    private contact: ContactService,
    private upload: UploadAttachmentService,
    private serviceS: ServiceRequestService,
    private company: CompanyService,
    private product: ProductService,
    private user: UserService,
    private _Activatedroute: ActivatedRoute,) { }



  ngOnInit(): void {
    this.todayDate = new Date();

    this.sId = this._Activatedroute.snapshot.paramMap.get('id');
    this.serviceS.getservicebyid(this.sId).subscribe((data: any) => {
      console.log(data.result[0]);
      this.serviceData = data.result[0]
    })

  }

}
