import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../service/account.service';
import { AuthService } from '../service/auth.service';
import { CompanyService } from '../service/company.service';
import { ContactService } from '../service/contact.service';
import { DealFormService } from '../service/deal-form.service';
import { ProductService } from '../service/product.service';
import { QuoteFormService } from '../service/quote-form.service';

@Component({
  selector: 'app-quote-invoice',
  templateUrl: './quote-invoice.component.html',
  styleUrls: ['./quote-invoice.component.css'],
})
export class QuoteInvoiceComponent implements OnInit {
  quote_id: any;
  quoteData: any;
  validDate: any;
  quoteDate: any;
  contactData: any;
  salesPersonData: any;
  companyData: any;
  branchData: any;
  totalAmount: any = 0;
  quantity: any = 0;
  totalAmountTax: any = 0;
  totalAmount1: any = 0;
  totalGST: any = 0;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private quote: QuoteFormService,
    private account: AccountService,
    private contact: ContactService,
    private company: CompanyService,
    private titleService: Title,
    private salesperson: ProductService
  ) {}

  generatePDF() {
    let docDefinition = {
      header: 'C#Corner PDF Header',
      content:
        'Sample PDF generated with Angular and PDFMake for C#Corner Blog',
    };

  }

  public setTitle() {
    this.titleService.setTitle('omshakti');
  }

  ngOnInit(): void {
    this.quote_id = this._Activatedroute.snapshot.paramMap.get('id');
    // console.log(this._Activatedroute.snapshot.paramMap.get("id"))
    let qtdate = new Date();
    this.quoteDate = qtdate.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    this.quote
      .getQuoteById(this._Activatedroute.snapshot.paramMap.get('id'))
      .subscribe((data: any) => {
        // console.log(data.result[0])
        this.quoteData = data.result[0];
        let date = this.addDays(
          data.result[0].created_date_time,
          Number(data.result[0].deal_validity.split(' ')[0])
        );
        this.validDate = date?.toLocaleString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
        this.quoteData.product_services.map((item: any) => {
          this.totalAmount += Number(item.amount);

          this.totalAmountTax +=
            (item.UnitPrice * 100) /
            (100 + parseFloat(item.GST == '' ? 0 : item.GST));
          // this.totalAmountTax+=((item.UnitPrice*100)/(100+parseFloat(item.GST)));
          this.quantity += parseInt(item.quantity);
          // console.log((item.UnitPrice)*100/118);
          if (item.type == 'Group') {
            this.getTaxableAmt(item.products);
          } else {
            this.totalGST +=
              item.amount -
              (item.amount * 100) /
                (100 + parseFloat(item.GST == '' ? 0 : item.GST));
            //  console.log(this.totalGST);
          }
        });

        this.account
          .getAccountData(data.result[0].account_id)
          .subscribe((data: any) => {
            console.log(data);
            this.companyData = data[0];
          });

        this.contact
          .getContactData(data.result[0].contact_id)
          .subscribe((data: any) => {
            // console.log(data)
            this.contactData = data[0];
          });

        this.salesperson
          .getSalesPerson(data.result[0]?.sales_person[0]?._id)
          .subscribe((data: any) => {
            // console.log(data)
            this.salesPersonData = data.result[0];
          });

        this.company
          .getBranch(data.result[0].quote_location[0]._id)
          .subscribe((data: any) => {
            console.log(data, 'branchDatabranchDatabranchData');
            this.branchData = data?.result[0];
          });
      });
    // this.getTaxableAmount()
  }

  getTaxableAmt(arr: any) {
    arr.map((item: any) => {
      if (item.type != 'Group') {
        console.log(item.GST);
        this.totalGST +=
          item.amount -
          (item.amount * 100) /
            (100 + parseFloat(item.GST == '' ? 0 : item.GST));
      } else {
        this.getTaxableAmt(item.products);
      }
    });
    console.log(this.totalGST, '================>>>>>>>>>>>>>');
  }

  decimalFormat(num: any) {
    // return num
    num = parseFloat(num);
    return num.toFixed(2);
  }
  addDays(date: any, days: any) {
    if (days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }
    return null;
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
  data: any;

  getTaxableAmount() {
    let data = this.quoteData.product_services;
    this.taxableAmount = 0;
    data.map((item: any) => {
      // console.log(item.GST)
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
    return this.taxableAmount;
  }
}
