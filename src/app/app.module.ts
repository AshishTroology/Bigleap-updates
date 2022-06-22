import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CreateLeadComponent } from './create-lead/create-lead.component';
import { HeaderComponent } from './header/header.component';
import { CreateQuoteComponent } from './create-quote/create-quote.component';
import { CreateDealComponent } from './create-deal/create-deal.component';
import { LoginComponent } from './login/login.component';
import { NgModel, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule ,HttpClientJsonpModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { TreeListModule } from '@progress/kendo-angular-treelist';
import {ToastrModule } from 'ngx-toastr'
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { CompanyComponent } from './company/company.component';
import { ContactComponent } from './contact/contact.component';

import { AccountComponentList } from './listview/account/account.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { EditService } from './service/edit.service';
import {
  PDFModule,
  ExcelModule,
} from "@progress/kendo-angular-grid";
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { ChartsModule } from "@progress/kendo-angular-charts";
import { AccountEditComponent } from './editform/account-edit/account-edit.component';
import { ContactEditComponent } from './editform/contact-edit/contact-edit.component';
import { ContactComponentList } from './listview/contact/contact.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LeadEditComponent } from './editform/lead-edit/lead-edit.component';
import { QuoteEditComponent } from './editform/quote-edit/quote-edit.component';
import { LeadListComponent } from './listview/lead-list/lead-list.component';
import { QuoteListComponent } from './listview/quote-list/quote-list.component';
import { DealListviewComponent } from './listview/deal-listview/deal-listview.component';
import { DealEditComponent } from './editform/deal-edit/deal-edit.component';
import { CommonModule } from '@angular/common';
import { ProductviewComponent } from './Product/productview/productview.component';
import { PopupModule } from '@progress/kendo-angular-popup';
import { AutoCompleteModule } from '@progress/kendo-angular-dropdowns';
// import { PopupAnchorDirective } from './Product/productview/popup.anchor-target.directive';
// import { EmployeeEditService } from './Product/productview/employee-edit.service';
import { EmployeeEditService } from './product-section/employee-edit.service';
import { AdduserComponent } from './adduser/adduser.component';
import { UsersComponent } from './listview/users/users.component';
import { AddrolepermissionComponent } from './addrolepermission/addrolepermission.component';
import { RolepermissionComponent } from './listview/rolepermission/rolepermission.component';
import { MenusModule } from "@progress/kendo-angular-menu";
import { SendquoteComponent } from './sendquote/sendquote.component';
import { SenddealComponent } from './senddeal/senddeal.component';
import { RoleListComponent } from './listview/role-list/role-list.component';
import { SalesPersonViewComponent } from './listview/sales-person-view/sales-person-view.component';
import { ProductsComponent } from './products/products.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { QuoteViewComponent } from './datatable-view/quote-view/quote-view.component';
import { LeadViewComponent } from './datatable-view/lead-view/lead-view.component';
import { DealViewComponent } from './datatable-view/deal-view/deal-view.component';
import { DataTablesModule } from 'angular-datatables';
import { ProductsListComponent } from './listview/products-list/products-list.component';
import { NewProductsListComponent } from './listview/new-products-list/new-products-list.component';
import { NewGroupListComponent } from './listview/new-group-list/new-group-list.component';
import { ServiceRequestComponent } from './service-request/service-request.component';
import { ServiceRequestListComponent } from './listview/service-request-list/service-request-list.component';
import { PerformanceComponent } from './performance/performance.component';
import { PerformanceListComponent } from './listview/performance-list/performance-list.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ServiceRequestEditComponent } from './editform/service-request-edit/service-request-edit.component';
import { PerformanceEditComponent } from './editform/performance-edit/performance-edit.component';

import { NewProductEditComponent } from './editform/new-product-edit/new-product-edit.component';
import { RoleEditComponent } from './editform/role-edit/role-edit.component';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProductEditComponent } from './editform/product-edit/product-edit.component';
import { ProductViewComponent } from './datatable-view/product-view/product-view.component';
import { ProductSectionComponent } from './product-section/product-section.component';
import { PopupAnchorDirective } from './product-section/popup.anchor-target.directive';
import { BrandComponent } from './master/brand/brand.component';
import { CategoryComponent } from './master/category/category.component';
import { SubCategoryComponent } from './master/sub-category/sub-category.component';
import { UnitComponent } from './master/unit/unit.component';
import { TaxComponent } from './master/tax/tax.component';
import { HsncodeComponent } from './master/hsncode/hsncode.component';
import { ProductgridComponent } from './productgrid/productgrid.component';

import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { LayoutModule } from '@progress/kendo-angular-layout';

import { DialogsModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ChildElementComponent } from './productgrid/child-element/child-element.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { MyHttpInterceptor } from './my-http-interceptor.service';
import { QuoteInvoiceComponent } from './quote-invoice/quote-invoice.component';
import { ServicesViewComponent } from './listview/services-view/services-view.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { ReportComponent } from './report/report.component';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    CreateLeadComponent,
    HeaderComponent,
    CreateQuoteComponent,
    CreateDealComponent,
    LoginComponent,
    DashboardComponent,
    AccountComponent,
    AccountComponentList,
    CompanyComponent,
    ContactComponent,
    AccountEditComponent,
    ContactEditComponent,
    ContactComponentList,
    LeadEditComponent,
    QuoteEditComponent,
    LeadListComponent,
    QuoteListComponent,
    DealListviewComponent,
    DealEditComponent,
    ProductviewComponent,
    PopupAnchorDirective,
    AdduserComponent,
    UsersComponent,
    AddrolepermissionComponent,
    RolepermissionComponent,
    SendquoteComponent,
    SenddealComponent,
    RoleListComponent,
    SalesPersonViewComponent,
    ProductsComponent,
    QuoteViewComponent,
    LeadViewComponent,
    DealViewComponent,
    ProductsListComponent,
    NewProductsListComponent,
    NewGroupListComponent,
    ServiceRequestComponent,
    ServiceRequestListComponent,
    PerformanceComponent,
    PerformanceListComponent,
    ServiceRequestEditComponent,
    PerformanceEditComponent,
    PopupAnchorDirective,
    NewProductEditComponent,
    RoleEditComponent,
    ForgetpassComponent,
    ProductEditComponent,
    ProductViewComponent,
    ProductSectionComponent,
    BrandComponent,
    CategoryComponent,
    SubCategoryComponent,
    UnitComponent,
    TaxComponent,
    HsncodeComponent,
    ProductgridComponent,
    ChildElementComponent,
    QuoteInvoiceComponent,
    ServicesViewComponent,
    ReportComponent,
  ],
  imports: [
    DataTablesModule,
    MenusModule,
    DropDownsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    TreeListModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(),
    GridModule,
    PDFModule,
    ExcelModule,
    ChartsModule,
    DialogModule,
    InputsModule,
    LabelModule,
    PopupModule,
    AutoCompleteModule,
    NgMultiSelectDropDownModule.forRoot(),
    CommonModule,
    FormsModule,
    NgSelectModule,
    AngularMultiSelectModule,
    NgxSpinnerModule,
    TreeViewModule,
    DropDownsModule,
    ButtonsModule,
    DialogsModule,
    DateInputsModule,
    LayoutModule,
    PDFExportModule,
    RecaptchaModule,
    DropDownListModule,
  ],
  providers: [
    EmployeeEditService,
    Title,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
