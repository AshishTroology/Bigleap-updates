import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../service/account.service';
import { AuthService } from '../service/auth.service';
import { CompanyService } from '../service/company.service';
import { ContactService } from '../service/contact.service';
import { LeadFormService } from '../service/lead-form.service'
import { ProductService } from '../service/product.service';
import { QuoteFormService } from '../service/quote-form.service';
import { TosterService } from '../service/toster.service';
import { UploadAttachmentService } from '../service/upload-attachment.service';
import { UserService } from '../service/user.service';
import { FlatBindingDirective } from '@progress/kendo-angular-treelist';
import { SortDescriptor } from '@progress/kendo-data-query';
import { MultiSelectTreeCheckableSettings, MultiSelectTreeHierarchyBindingDirective } from "@progress/kendo-angular-dropdowns";
import { Product } from '../../productInterface'

import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-lead',
  templateUrl: './create-lead.component.html',
  styleUrls: ['./create-lead.component.css'],
})
export class CreateLeadComponent implements OnInit {
  @ViewChild('multiselecttree', { static: true })
  public multiselecttree: any;
  public checkableSettings: MultiSelectTreeCheckableSettings = {
    checkChildren: true,
    checkOnClick: false,
  };
  productForm!: FormGroup;
  buttondisabled: any = true;

  public data: any = [];
  public data1: Product[] = [];
  public data2: Product[] = [];
  public value: Product[] = [];
  selectedProduct: any = [];
  showDropdownData: any = [];
  showDropdownBox: boolean = false;
  totalAmount: any = 0;
  totalQuantity: any = 0;
  hsncode: any;
  groupName: any;
  gst: any;
  uom: any;
  groupSize: any = 0;
  groupAmount: any = 0;
  groupPartNumber: any;
  mergedProduct: any = [];

  leadForm!: FormGroup;

  accountData: any;
  contactData: any;
  contactTempData: any = '';
  loggedInUser: any;
  leadOwner: any;
  leadOwnerId: any;
  selectedCompany: any = {};

  users: any;
  attachment_files: any = [];
  show_files: any = [];
  lead_id: any;
  location: any;
  isValidFormSubmitted: any = false;
  isValidFormSubmittedmodel: any = false;
  isValidPrdFormSubmitted: any = false;
  branchData: any;
  productData: any;
  productVal: any = [];
  selectedItem: any = [];
  showbtn: boolean = false;
  selectedDataForMerge: any = [];
  currentPrice: any;
  mergedProducts: any;
  MergedProductsName: any = '';
  quoteLocation: any;
  quoteLocationId: any;

  ShowFilter = true;
  limitSelection = false;
  dropdownList: any = [];
  selectedItems: any = [];
  selectedUser: any;
  dropdownSettings = {};
  contactDropdownSettings = {};
  productDropdownSettings = {};
  ownerDropdownSettings = {};

  account_id: any = '';
  company_name: any = '';
  company_industry: any = '';
  company_country: any = '';
  company_state: any = '';
  company_city: any = '';
  company_location: any = '';
  company_gst: any = '';
  company_pan: any = '';
  company_tan: any = '';
  company_cin: any = '';

  contact_id: any;
  contact_name: any;
  contact_role: any;
  contact_phone: any;
  contact_mobile: any;
  contact_email: any;
  files_url: any = [];

  loading = false;
  indices: any;
  readonly bufferSize: number = 3;
  timer: any;
  settings: any = {};
  itemList: any = [];
  selectedItemss: any = [];
  constructor(
    private lead: FormBuilder,
    private productfm: FormBuilder,
    private toast: TosterService,
    private router: Router,
    private leadService: LeadFormService,
    private auth: AuthService,
    private account: AccountService,
    private contact: ContactService,
    private upload: UploadAttachmentService,
    private quote: QuoteFormService,
    private company: CompanyService,
    private product: ProductService,
    private user: UserService
  ) {
    let number = Math.random(); // 0.9394456857981651
    number.toString(36); // '0.xtis06h6'
    var id = 'L-' + number.toString(36).substr(2, 9);
    this.lead_id = id.toUpperCase();
  }

  async convertToQuote() {
    let obj = await {
      quote_id: this.lead_id,
      quote_owner: this.loggedInUser,
      account_id: this.account_id,
      contact_id: this.contact_id,
      quote_title: this.leadForm.value.lead_title,
      quote_type: this.leadForm.value.lead_type,
      quote_source: this.leadForm.value.lead_source,
      referral: this.leadForm.value.referral,

      estimated_value: this.leadForm.value.estimated_value,
      quote_status: this.leadForm.value.lead_status_stage,
      quote_location: this.quoteLocation,
      quote_location_id: this.quoteLocationId,
      remark: this.leadForm.value.remark,
      product_services: this.data,
      note: this.leadForm.value.notes,
      attachments: this.files_url,
      open_activity: '',
      close_activity: '',
      inco_terms: '',
      payment_terms: '',
      p_f: '',
      freight: '',
      taxes: '',
      other_charges: '',
      deal_validity: '',
      delivery: '',
      warrenty: '',
      created_by: this.loggedInUser,
      edit_status: true,
    };
    if (this.leadForm.invalid) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.isValidFormSubmitted = true;
    } else {
      await this.quote.submitForm(obj).subscribe((data: any) => {
        console.log(data);
        if (data.status == 200) {
          //  this.toast.showSuccess(data.message)
          this.toast.showSuccess('Successfully Submitted');
          setTimeout(() => {
            document
              .getElementsByClassName('modal-backdrop')[0]
              ?.classList.remove('modal-backdrop');
            console.log();
            this.router.navigate(['/quote']);
          }, 1500);
        } else if (data.status === 500) {
          // this.toast.showError(data.message)
          this.toast.showError('Error');
        }
      });
    }
  }

  async submitForm() {
    console.log(this.leadForm);
    console.log(this.leadForm.invalid);
    console.log(this.productVal);

    this.leadForm.value.account_id = this.account_id;
    this.leadForm.value.contact_id = this.contact_id;
    this.leadForm.value.created_by = this.loggedInUser;
    // this.leadForm.value.lead_owner=this.leadOwner
    // this.leadForm.value.lead_owner_id=this.leadOwnerId
    this.leadForm.value.company_name = this.company_name;
    this.leadForm.value.contact = this.contact_name;

    this.leadForm.value.product_services = this.data;

    this.leadForm.value.quote_location = this.quoteLocation;
    this.leadForm.value.quote_location_id = this.quoteLocationId;

    this.leadForm.value.estimated_value = String(
      this.leadForm.value.estimated_value
    );
    this.leadForm.value.attachments = this.files_url;
    console.log(this.files_url);
    // files_url?.length>0 ? this.leadForm.value.attachments=files_url:null

    console.log(this.leadForm.value);
    // this.leadForm.valid?
    console.log(this.leadForm.value.attachments);

    if (this.leadForm.invalid) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.isValidFormSubmitted = true;
    } else {
      this.leadService
        .submitForm(this.leadForm.value)
        .subscribe((data: any) => {
          console.log(data);
          if (data.status === 200) {
            this.toast.showSuccess('Successfully Submitted');
            setTimeout(() => {
              this.router.navigate(['/lead']);
            }, 1500);
          } else if (data.status === 404) {
            this.toast.showError('Error');
          }
          if (data.status === 401) {
            this.toast.showError('Error');
          }
        });
    }
    // :this.toast.showError("Incorrect Data")
  }

  checkForm() {
    console.log(this.leadForm.invalid);
    if (this.leadForm.invalid) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.isValidFormSubmitted = true;
    }
    if (
      this.leadForm.controls.lead_source.valid &&
      this.leadForm.controls.lead_title.valid &&
      this.leadForm.controls.lead_type.valid &&
      this.leadForm.controls.lead_status_stage.valid &&
      this.leadForm.controls.selected_company.valid
    ) {
      console.log('open model');
      document.getElementById('openmodal')?.click();
    }
  }

  handleOwnerChange(e: any) {
    console.log(e);
    this.leadOwner = e.username;
    this.leadOwnerId = e._id;
    // this.leadOwner=e.target.value.split(',')[0]
  }

  ngOnInit(): void {
    this.product.getAllProduct().subscribe((data: any) => {
      console.log(data);
      this.productData = data.result.slice();
      this.data1 = this.productData.slice();
      this.data2 = this.data1.slice();
    });

    this.auth.userLoggedIn().subscribe((user: any) => {
      console.log(user.result);
      this.loggedInUser = user.result.username;
      this.selectedUser = [user.result];
    });

    this.user.getAllUsers().subscribe((data: any) => {
      console.log(data);
      this.users = data.result;
    });

    this.company.GetAddress().subscribe((branch: any) => {
      console.log(branch);
      this.branchData = branch.result;
    });

    this.account.getAllAccount().subscribe((data: any) => {
      this.accountData = data;
      console.log(data);
    });

    this.contact.getAllContact().subscribe((data: any) => {
      console.log(data);
      this.contactData = data;
    });

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'account_id',
      textField: 'company_name',
      noDataAvailablePlaceholderText: 'No Company Found!',
      closeDropDownOnSelection: true,
      allowSearchFilter: true,
    };
    this.contactDropdownSettings = {
      singleSelection: true,
      idField: 'contact_id',
      textField: 'contact_name',
      noDataAvailablePlaceholderText: 'No Contact Found!',
      closeDropDownOnSelection: true,
      allowSearchFilter: true,
    };
    this.productDropdownSettings = {
      singleSelection: true,
      idField: 'id',
      labelKey: 'productname',
      noDataAvailablePlaceholderText: 'No Product Found!',
      closeDropDownOnSelection: true,
      allowSearchFilter: true,
      lazyLoading: true,
    };

    this.settings = {
      singleSelection: true,
      text: 'Select by Part No ( Ex-1702)',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      lazyLoading: true,
      labelKey: 'productname',
      primaryKey: 'id',
    };
    this.ownerDropdownSettings = {
      singleSelection: true,
      idField: '_id',
      textField: 'username',
      noDataAvailablePlaceholderText: 'No User Found!',
      closeDropDownOnSelection: true,
      allowSearchFilter: false,
    };
    this.forminit();
    this.formmodelInit();
  }

  public checkProductGrid: boolean = false;
  setItem() {
    this.checkProductGrid = true;
  }
  dataChangedHandler(e: any) {
    this.data = e;
    let len = e.length;

    this.totalAmount = 0;
    this.totalQuantity = 0;
    this.data = this.data.filter((dt: any) => {
      this.updateUnitPrice([...this.data], dt.id, dt.UnitPrice);
      this.updateDiscount([...this.data], dt.id, dt.discount);
      this.totalAmount += Number(dt.amount);
      this.totalQuantity += Number(dt.quantity);
      return dt;
    });
    this.getTaxableAmount();
    this.checkProductGrid = false;
  }

  onSearch(event: any) {
    if (event.target.value.length >= 4) {
      this.product
        .getProductDataSearch({ searchValue: event.target.value })
        .subscribe((data: any) => {
          this.productData = data.result.slice();
          this.data1 = this.productData.slice();
          this.data2 = this.data1.slice();
        });
    } else {
      this.productData = [];
      this.data1 = this.productData.slice();
      this.data2 = this.data1.slice();
    }
  }

  fetchMore(event: any) {
    if (event.endIndex === this.data1.length - 1) {
      console.log(this.data1.length);
      let limit = this.data1.length;
      this.product.getAllProductLimit({ lim: limit }).subscribe((data: any) => {
        console.log(data);
        this.productData = data.result.slice();
        this.data1 = this.productData.slice();
        this.data2 = this.data1.slice();
      });
    }
  }

  optionClick(index: any) {
    console.log(index);
  }

  removeAttachment(index: any) {
    console.log(index);
    this.files_url.splice(index, 1);
  }

  get f() {
    return this.leadForm.controls;
  }

  get p() {
    return this.productForm.controls;
  }

  handleSaveProduct() {
    console.log(this.productForm, this.productForm.invalid);

    if (this.productForm.invalid) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.isValidPrdFormSubmitted = true;
    } else {
      console.log(this.productForm.value, 'hiii');
    }
  }

  handleBranchAdd(e: any) {
    console.log(e.target.value);

    // this.quoteForm.value.quote_location=
    // this.quoteForm.value.quote_location_id=e.target.value[1]

    this.quoteLocation = e.target.value.split(',')[0];
    this.quoteLocationId = e.target.value.split(',')[1];
  }

  handleBack() {
    Swal.fire({
      title: 'Confirm To Go Back',
      text: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.router.navigate(['/lead']);
      }
    });
  }

  handleUpload(e: any) {
    let date = new Date();
    // console.log(e.target.files)
    this.attachment_files = e.target.files;

    for (let file of e.target.files) {
      this.upload.uploadFiles(file, this.lead_id).subscribe((url: any) => {
        let img_url = url.url;
        this.files_url.push({
          img_url,
          name: file.name,
          size: file.size,
          attached_by: this.loggedInUser,
          upload_date: date,
          lead_id: this.lead_id,
        });
        console.log({
          img_url,
          name: file.name,
          size: file.size,
          attached_by: this.loggedInUser,
          upload_date: date,
          lead_id: this.lead_id,
        });
      });
    }

    for (let file of e.target.files)
      this.show_files.push({
        name: file.name,
        size: file.size,
        attached_by: this.loggedInUser,
        upload_date: date,
      });
  }

  onContactSelect(contact: any) {
    console.log(contact);

    let filter_contact = this.contactData.filter(
      (cntc: any) => cntc.contact_id === contact.contact_id
    );
    console.log(filter_contact[0]);

    this.contact_id = filter_contact[0].contact_id;
    this.contact_name = filter_contact[0].contact_name;
    this.contact_role = filter_contact[0].role;
    this.contact_phone = filter_contact[0].phone_no;
    this.contact_mobile = filter_contact[0].mobile_no;
    this.contact_email = filter_contact[0].email;
  }

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
    let contacts = this.contactData.filter(
      (contact: any) => contact.account_id === item.account_id
    );
    console.log(contacts);
    this.contactTempData = contacts;
    let filtered_company = this.accountData.filter(
      (acc: any) => acc.account_id === item.account_id
    );
    console.log(filtered_company);

    this.leadForm.value.company_name = filtered_company[0].company_name;
    this.leadForm.value.industry = filtered_company[0].industry;
    this.leadForm.value.country = filtered_company[0].company_country;
    this.leadForm.value.state = filtered_company[0].company_state;
    this.leadForm.value.city = filtered_company[0].company_city;
    this.leadForm.value.location = filtered_company[0].company_location;
    this.leadForm.value.account_id = filtered_company[0].account_id;

    this.account_id = filtered_company[0].account_id;
    this.company_name = filtered_company[0].company_name;
    this.company_industry = filtered_company[0].industry;
    this.company_country = filtered_company[0].company_country;
    this.company_state = filtered_company[0].company_state;
    this.company_city = filtered_company[0].company_city;
    this.company_location = filtered_company[0].company_location;
    this.company_gst = filtered_company[0].gst;
    this.company_pan = filtered_company[0].pan;
    this.company_tan = filtered_company[0].tan;
    this.company_cin = filtered_company[0].cin;
  }

  public sort: SortDescriptor[] = [];

  handleFilter(value1: any) {
    this.data1 = this.data1.filter(
      (s) => s.productname.toLowerCase().indexOf(value1.toLowerCase()) !== -1
    );
  }

  public selectionChange(val: any): void {
    this.value = this.data2.filter((item: any) => item.id === val.id);
    if (this.value[0] !== undefined) {
      if (this.selectedProduct.length == 1) {
        this.selectedProduct[0].amount += Number(this.value[0].UnitPrice);
        this.selectedProduct[0]['products']?.push(this.value[0]);
        this.totalAmount += Number(this.value[0].UnitPrice);
        this.selectedProduct[0]['quantity'] == 0
          ? (this.totalQuantity += 1)
          : null;
        this.selectedProduct[0]['quantity'] = 1;
        this.data = this.data.filter((dt: any) => dt);
      } else if (this.selectedProduct.length > 1) {
        this.toast.showError('Please Select only One Group!');
      } else {
        this.totalAmount += Number(this.value[0].UnitPrice);
        this.totalQuantity += Number(this.value[0].quantity);
        this.data.push(this.value[0]);
        this.data = this.data.filter((dt: any) => dt);
      }
    }
    this.getTaxableAmount();
  }

  public fetchChildren = (item: any): Product[] => {
    return item.products;
  };

  public hasChildren = (item: any): any => {
    return item.products && item.products.length > 0;
  };

  selectProducts(product: any, e: any) {
    console.log(product, e.target.checked);
    if (e.target.checked) {
      this.selectedProduct.push(product);
    } else {
      this.selectedProduct = this.selectedProduct.filter(
        (data: any) => data.id !== product.id
      );
      console.log(product, e.target.checked);
    }
    this.selectedProduct.length == 1
      ? (this.showDropdownBox = true)
      : (this.showDropdownBox = false);
  }

  changeParentType(data: any) {
    console.log(data);
    data.map((item: any) => {
      if (item.type === 'Product') {
        item['parent'] = true;
        item.id = Math.floor(Math.random() * 1000);
        console.log(item);
        return;
      } else {
        item['parent'] = true;
        item.id = Math.floor(Math.random() * 1000);
        this.changeParentType(item.products);
      }
    });
    return;
  }

  mergeSelection() {
    this.changeParentType(this.selectedProduct);
    console.log(this.selectedProduct);

    this.mergedProduct = {
      productname: this.groupName,
      PartNo: Math.floor(Math.random() * 10000),
      id: Math.floor(Math.random() * 100),
      UOM: 'NA',
      CCNNo: 'NA',
      GST: 'NA',
      UnitPrice: this.groupSize,
      products: this.selectedProduct,
      Category: 'NA',
      OEM: 'NA',
      OEMProductCode: 'NA',
      HSNCode: 'NA',
      main_id: 'NA',
      type: 'Group',
      amount: this.groupAmount,
      quantity: 1,
      parent: false,

      // type: 'directory',
      // id: Math.floor(Math.random()*100),
      // name: this.groupName,
      // size: this.groupSize,
      // time: new Date(),
      // amount: this.groupAmount,
      // contents:this.selectedProduct,
      // quantity: 1,
      // parent: false,
    };

    console.log(this.mergedProduct);

    this.data.push(this.mergedProduct);
    this.selectedProduct.map((dt: any) => {
      var index = this.data
        .map((item: any) => {
          return item.id;
        })
        .indexOf(dt.id);
      this.data.splice(index, 1);
    });

    this.selectedProduct = [];
    this.groupPartNumber = null;
    (this.groupName = ''), (this.gst = '');
    this.groupAmount = 0;
    this.groupSize = 0;
    document.getElementById('closebtn')?.click();

    this.data = this.data.filter((dt: any) => dt);
  }

  inputName(e: any) {
    this.groupName = e.target.value;
  }
  inputhsn(e: any) {
    this.hsncode = e.target.value;
  }
  inputgst(e: any) {
    this.gst = e.target.value;
  }
  inputuom(e: any) {
    this.uom = e.target.value;
  }
  checkMergeSelection() {
    if (this.selectedProduct.length > 1) {
      this.groupSize = 0;
      this.groupAmount = 0;
      this.groupName = '';
      this.groupPartNumber = Math.floor(Math.random() * 1000000);
      // this.changeId(this.selectedProduct)
      this.selectedProduct.map((item: any) => {
        this.groupSize += parseInt(item.UnitPrice);
        this.groupAmount += parseFloat(item.amount);
      });
      document.getElementById('showmodal')?.click();
    } else {
      console.log('Select atleast two products');
    }
  }

  getParent(data: any, id: any, amt: any, qty: any): any {
    console.log(data, id, qty, amt);
    let amount = 0;
    data?.map((item: any, index: any): any => {
      console.log(item.amount);
      if (item.type === 'Product') {
        if (item.id === id) {
          // data.amount=amount
          console.log(item.id);
          item.amount = amt;
          item.quantity = qty;
          let total = item.UnitPrice * qty;
          item.amount = total - total * (item.discount / 100);

          return;
        }
      } else {
        this.getParent(item.products, id, amt, qty);
        item.amount = 0;

        item.products.length > 0 ? (item.quantity = 1) : (item.quantity = 0);

        item.products.map((itm: any) => {
          item.amount += parseFloat(itm.amount);
          console.log(item.amount);
        });
        this.data.filter((dt: any) => dt);
      }
    });
    return data;
  }

  updateUnitPrice(data: any, id: any, unitprice: any): any {
    console.log(data, id, unitprice);
    let amount = 0;
    data?.map((item: any, index: any): any => {
      console.log(item.amount);
      if (item.type === 'Product') {
        if (item.id === id) {
          // data.amount=amount
          console.log(item.id);
          item.UnitPrice = unitprice;
          let total = unitprice * item.quantity;
          item.amount = total - total * (item.discount / 100);

          return;
        }
      } else {
        this.updateUnitPrice(item.products, id, unitprice);
        item.amount = 0;

        item.products.length > 0 ? (item.quantity = 1) : (item.quantity = 0);

        item.products.map((itm: any) => {
          item.amount += parseFloat(itm.amount);
          console.log(item.amount);
        });
        this.data.filter((dt: any) => dt);
      }
    });
    this.getTaxableAmount();
    return data;
  }

  //   updateDiscount(data: any, id: any, discount: any):any {
  //     console.log(data,id,discount)
  //     let amount=0
  //     data?.map((item: any, index: any):any => {
  //       console.log(item.amount);
  //       if (item.type === 'Product') {
  //         if (item.id === id) {

  //           // data.amount=amount
  //           console.log(item.id);
  //           item.discount=discount
  //           let total=item.UnitPrice*item.quantity
  //           item.amount = total-total*(Number(discount)/100);
  //           return
  //         }
  //       } else {
  //         this.updateDiscount(item.products, id, discount);
  //         item.amount=0

  //         item.products.length>0?item.quantity=1:item.quantity=0

  //         item.products.map((itm:any)=>{
  //           item.amount+=parseFloat(itm.amount)
  //           console.log(item.amount)
  //         })
  //         console.log(item.id);
  //         item.UnitPrice= item.amount
  //         item.discount=discount
  //         let total=item.UnitPrice*item.quantity
  //         item.amount = total-total*(Number(discount)/100);
  //         this.data.filter((dt:any)=>dt)
  //       }
  //     });
  //     this.getTaxableAmount()
  // return data

  //   }

  updateDiscount(data: any, id: any, discount: any): any {
    console.log(data, id, discount);
    let amount = 0;
    data?.map((item: any, index: any): any => {
      console.log(item.amount);
      if (item.type === 'Product') {
        if (item.id === id) {
          // data.amount=amount
          console.log(item.id);
          // item.discount=discount
          let total = item.UnitPrice * item.quantity;
          item.amount = total - total * (Number(discount) / 100);
          return;
        }
      } else {
        this.updateDiscount(item.products, id, discount);
        item.amount = 0;

        item.products.length > 0 ? (item.quantity = 1) : (item.quantity = 0);

        item.products.map((itm: any) => {
          item.amount += parseFloat(itm.amount);
          console.log(item.amount);
        });
        console.log(item.id);
        item.UnitPrice = item.amount;
        // item.discount=discount
        let total = item.UnitPrice * item.quantity;
        item.amount = total - total * (Number(discount) / 100);
        this.data.filter((dt: any) => dt);
      }
    });
    this.getTaxableAmount();
    return data;
  }

  deleteData(data: any, id: any, type: any, v: any): any {
    console.log(data, id, type);
    if (type === 'Product') {
      data?.map((item: any, index: any): any => {
        if (item.type === 'Product') {
          console.log(item.type, '======>');
          if (item.id === id) {
            let sliceAmt = item.amount;
            data.splice(index, 1);
            if (v != null) {
              v.amount = v.amount - parseFloat(sliceAmt);
            }
            return;
          }
        } else {
          this.deleteData(item.products, id, 'Product', item);
        }
      });
    } else {
      data?.map((item: any, index: any): any => {
        if (item.type !== 'Product') {
          this.deleteData(item.products, id, 'Product', null);
          if (item.id === id) {
            data.splice(index, 1);
            return;
          }

          item.products.length > 0 ? (item.quantity = 1) : (item.quantity = 0);
          item.amount = 0;
          item.products.map((itm: any) => {
            item.amount += parseFloat(itm.amount);
          });
          this.data = this.data.filter((dt: any) => dt);
        }
      });
    }

    return data;
  }

  public onchange(e: any, prod: any) {
    console.log(e, prod);

    let qty = e.target.value;
    let price = prod.UnitPrice;
    let amt = qty * price;
    this.totalQuantity = 0;
    this.totalAmount = 0;
    console.log(e.target.value, prod.UnitPrice);
    console.log(amt, this.data, this.data1);

    this.data = this.getParent(this.data, prod.id, amt, qty);
    this.data = this.data.filter((dt: any) => {
      this.totalAmount += Number(dt.amount);
      this.totalQuantity += Number(dt.quantity);
      this.getTaxableAmount();
      return dt;
    });
    // this.data[prod.id].amount=amt;
    // this.getParent(this.data, prod.id);
  }

  public handleChangeUnitprice(e: any, prod: any) {
    this.updateUnitPrice([...this.data], prod.id, e.target.value);
    this.totalAmount = 0;
    this.totalQuantity = 0;
    this.data = this.data.filter((dt: any) => {
      this.totalAmount += Number(dt.amount);
      this.totalQuantity += Number(dt.quantity);
      return dt;
    });
  }

  public handleDiscount(e: any, prod: any) {
    this.updateDiscount(this.data.slice(), prod.id, e.target.value);
    this.totalAmount = 0;
    this.totalQuantity = 0;
    this.data = this.data.filter((dt: any) => {
      this.totalAmount += parseFloat(dt.amount);
      this.totalQuantity += Number(dt.quantity);
      return dt;
    });
  }

  handleclick() {
    console.log(this.data);
  }

  checkAddGroup() {
    console.log('add group');

    if (this.groupName && this.uom && this.gst && this.hsncode) {
      this.mergedProduct = {
        productname: this.groupName,
        PartNo: Math.floor(Math.random() * 10000),
        id: Math.floor(Math.random() * 100),
        UOM: this.uom,
        CCNNo: 'NA',
        GST: this.gst,
        UnitPrice: 0,
        products: [],
        Category: 'NA',
        OEM: 'NA',
        OEMProductCode: 'NA',
        HSNCode: this.hsncode,
        main_id: 'NA',
        type: 'Group',
        amount: 0,
        quantity: 0,
        parent: false,
      };
      console.log(this.mergedProduct, '------group');
      this.data.push(this.mergedProduct);
      document.getElementById('closenameinp')?.click();
      // directive.rebind()
      this.groupName = '';
      this.gst = '';
      this.hsncode = '';
      this.uom = '';
      this.data = this.data.filter((dt: any) => dt);
    } else {
      this.toast.showError('All Field are mandatory!');
    }
    this.groupName = '';
    this.gst = '';
    this.hsncode = '';
    this.uom = '';
  }

  handleBoxOpen(): void {
    console.log(this.data);
    if (this.selectedProduct.length === 1) {
      console.log(this.selectedProduct[0].id);
      this.showDropdownData = this.data.filter(
        (item: any) => item.id != this.selectedProduct[0].id
      );
    } else if (this.selectedProduct.length > 1) {
      this.toast.showError('Please Select only one group!');
    } else {
      this.showDropdownData = this.data.filter((item: any) => item);
    }
    // directive.data=this.data
  }

  handlechangeValue(e: any): void {
    console.log(e);
    this.totalQuantity = 0;
    e.map((item: any) => {
      this.data = this.data.filter((itm: any) => {
        if (itm.id === item.id) {
          // item.id=item.id+Math.floor(Math.random()*10000)
          this.selectedProduct[0].amount += parseInt(item.UnitPrice);

          this.selectedProduct[0].products.push(item);
          // this.selectedProduct[0].products=this.selectedProduct[0].products.filter((itm:any)=>item.id!=itm.id)
        }
        return itm.id !== item.id;
      });
      this.showDropdownData = this.data.filter((item: any) => item);
    });
    this.selectedProduct[0].products.length > 0
      ? (this.selectedProduct[0].quantity = 1)
      : (this.selectedProduct[0].quantity = 0);
    this.getParent(this.data, -1, 0, 0);
    this.data.map((item: any) => (this.totalQuantity += Number(item.quantity)));
  }

  valueChange(e: any): void {
    console.log(e);
  }

  handleDelete(prd: any, type: any) {
    console.log(prd);
    this.totalQuantity = 0;
    this.totalAmount = 0;

    this.deleteData(this.data, prd.id, type, null);
    this.data = this.data.filter((dt: any) => {
      this.totalAmount += parseFloat(dt.amount);
      this.totalQuantity += parseFloat(dt.quantity);
      return dt;
    });
    this.getTaxableAmount();
  }

  forminit() {
    this.leadForm = this.lead.group({
      lead_id: this.lead_id,
      lead_owner: ['', Validators.required],
      lead_source: ['', Validators.required],
      company_name: [''],
      contact: [''],
      lead_title: ['', Validators.required],
      lead_type: ['', Validators.required],
      referral: '',
      // industry:['',Validators.required],
      estimated_value: '',
      account_id: '',
      contact_id: '',
      remark: '',
      product_services: '',
      notes: '',
      attachments: [],
      attach_file: '',
      lead_status_stage: ['', Validators.required],
      created_by: '',
      selected_contact: ['', Validators.required],
      selected_company: ['', Validators.required],
      edit_status: true,
      quote_location: ['lucknow', Validators.required],
    });

    this.productForm = this.productfm.group({
      id: Math.floor(Math.random() * (100000 - 10000) + 10000),
      CCNNo: ['', Validators.required],
      Category: ['', Validators.required],
      GST: ['', Validators.required],
      HSNCode: ['', Validators.required],
      OEM: ['', Validators.required],
      OEMProductCode: ['', Validators.required],
      PartNo: ['', Validators.required],
      UOM: ['', Validators.required],
      UnitPrice: ['', Validators.required],
      productname: ['', Validators.required],
      type: ['', Validators.required],
      parent: ['', Validators.required],
      quantity: ['', Validators.required],
      amount: ['', Validators.required],
      products: ['', Validators.required],
    });
  }

  handleSubmit() {
    this.productForm.value.amount = this.productForm.value.UnitPrice;
    this.productForm.value.quantity = 1;
    this.productForm.value.parent = false;
    if (this.productForm.invalid) {
      console.log(this.productForm, 'error');
      this.isValidFormSubmittedmodel = true;
    } else {
      console.log(this.productForm, 'true');
      this.productForm.value.id = Math.floor(
        Math.random() * (100000 - 10000) + 10000
      );
      this.product.AddProduct(this.productForm.value).subscribe((data: any) => {
        this.buttondisabled = 'false';

        console.log(data);
        if (data.status == 200) {
          this.isValidFormSubmittedmodel = true;
          this.toast.showSuccess(data.message);

          this.data.push(data.result);
          this.totalAmount = 0;
          this.totalQuantity = 0;
          this.data = this.data.filter((dt: any) => {
            console.log(Number(dt.amount));

            this.totalAmount += parseInt(dt.amount);
            this.totalQuantity += Number(dt.quantity);
            return dt;
          });
        } else if (data.status == 200) {
          this.toast.showError(data.message);
        }
      });
    }
  }
  formmodelInit() {
    this.productForm = this.lead.group({
      id: '',
      // id:Math.floor(Math.random()*(100000 - 10000) + 10000),
      CCNNo: '',
      Category: '',
      GST: '',
      HSNCode: '',
      OEM: '',
      OEMProductCode: '',
      PartNo: ['', Validators.required],
      UOM: ['', Validators.required],
      UnitPrice: ['', Validators.required],
      productname: ['', Validators.required],
      type: 'Product',
      parent: '',
      quantity: '',
      amount: '',
      products: [],
    });
  }
  get fm() {
    return this.productForm.controls;
  }
  decimalFormat(num: any) {
    return num.toFixed(2);
  }

  setGst(amount: any, gst: any) {
    let cal = 0;
    if (gst == '') {
      cal = 0;
    } else {
      let GstValue = gst.split('%');
      cal = parseFloat(GstValue[0]) / 100;
    }

    return cal * parseFloat(amount);
  }
  taxableAmount: any;
  getTaxableAmount() {
    this.taxableAmount = 0;
    this.data.map((item: any) => {
      console.log(item.GST);
      let cal = 0;

      if (item.GST == '') {
        cal = 0;
      } else {
        let GstValue = item.GST.split('%');
        cal = parseFloat(GstValue[0]) / 100;
      }

      if (item.GST == '') {
        cal = 0;
      } else {
        let GstValue = item.GST.split('%');
        cal = parseFloat(GstValue[0]) / 100;
      }
      this.taxableAmount += cal * parseFloat(item.amount);
    });
  }
}
