import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateLeadComponent} from './create-lead/create-lead.component'
import {CreateDealComponent} from './create-deal/create-deal.component'
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateQuoteComponent } from './create-quote/create-quote.component';

import { AccountComponentList } from './listview/account/account.component';
import { CompanyComponent } from './company/company.component';
import { ContactComponent } from './contact/contact.component';

import { AccountComponent } from './account/account.component';
import { AccountEditComponent } from './editform/account-edit/account-edit.component';
import { ContactComponentList } from './listview/contact/contact.component';
import { ContactEditComponent } from './editform/contact-edit/contact-edit.component';
import { QuoteEditComponent } from './editform/quote-edit/quote-edit.component';
import { LeadEditComponent } from './editform/lead-edit/lead-edit.component';
import { LeadListComponent } from './listview/lead-list/lead-list.component';
import { QuoteListComponent } from './listview/quote-list/quote-list.component';
import { DealListviewComponent } from './listview/deal-listview/deal-listview.component';
import { DealEditComponent } from './editform/deal-edit/deal-edit.component';
import {AdduserComponent} from './adduser/adduser.component'
import { AddrolepermissionComponent } from './addrolepermission/addrolepermission.component';
import { SendquoteComponent } from './sendquote/sendquote.component';
import { SenddealComponent } from './senddeal/senddeal.component';
import { RoleListComponent } from './listview/role-list/role-list.component';
import { ProductsComponent } from './products/products.component';
import { LeadViewComponent } from './datatable-view/lead-view/lead-view.component';
import { DealViewComponent } from './datatable-view/deal-view/deal-view.component';
import { QuoteViewComponent } from './datatable-view/quote-view/quote-view.component';
import { ProductsListComponent } from './listview/products-list/products-list.component';
import { NewProductsListComponent } from './listview/new-products-list/new-products-list.component';
import { NewGroupListComponent } from './listview/new-group-list/new-group-list.component';
import {ServiceRequestComponent} from './service-request/service-request.component'
import {ServiceRequestListComponent} from './listview/service-request-list/service-request-list.component'
import {PerformanceComponent} from './performance/performance.component'
import {PerformanceListComponent} from './listview/performance-list/performance-list.component'
import {ServiceRequestEditComponent} from './editform/service-request-edit/service-request-edit.component'
import {PerformanceEditComponent} from './editform/performance-edit/performance-edit.component'
import {NewProductEditComponent}   from './editform/new-product-edit/new-product-edit.component'
import {RoleEditComponent} from './editform/role-edit/role-edit.component'
import {ForgetpassComponent} from './forgetpass/forgetpass.component'
import { ProductEditComponent } from './editform/product-edit/product-edit.component';
import {ProductViewComponent} from './datatable-view/product-view/product-view.component'

import { BrandComponent } from './master/brand/brand.component';
import { CategoryComponent } from './master/category/category.component';
import { SubCategoryComponent } from './master/sub-category/sub-category.component';
import { UnitComponent } from './master/unit/unit.component';
import { TaxComponent } from './master/tax/tax.component';
import { HsncodeComponent } from './master/hsncode/hsncode.component';

import { ProductSectionComponent } from './product-section/product-section.component';
import { ProductgridComponent } from './productgrid/productgrid.component';
import { QuoteInvoiceComponent } from './quote-invoice/quote-invoice.component';

import { ServicesViewComponent } from './listview/services-view/services-view.component'
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'lead', component: LeadListComponent },
  { path: 'create-lead', component: CreateLeadComponent },
  { path: 'edit-lead/:id', component: LeadEditComponent },

  { path: 'quote', component: QuoteListComponent },
  { path: 'create-quote', component: CreateQuoteComponent },
  { path: 'edit-quote/:id', component: QuoteEditComponent },

  { path: 'deal', component: DealListviewComponent },
  { path: 'create-deal', component: CreateDealComponent },
  { path: 'edit-deal/:id', component: DealEditComponent },

  { path: 'account', component: AccountComponentList },
  { path: 'create-account', component: AccountComponent },
  { path: 'edit-account/:id', component: AccountEditComponent },

  { path: 'contact', component: ContactComponentList },
  { path: 'create-contact', component: ContactComponent },
  { path: 'edit-contact/:id', component: ContactEditComponent },

  { path: 'company', component: CompanyComponent },
  { path: 'add-user', component: AdduserComponent },
  { path: 'role-permission', component: AddrolepermissionComponent },
  { path: 'view-quote/:id', component: SendquoteComponent },
  { path: 'view-quote1/:id', component: QuoteInvoiceComponent },
  { path: 'view-deal/:id', component: SenddealComponent },
  { path: 'role-list', component: RoleListComponent },

  { path: 'add-products', component: ProductsComponent },
  { path: 'products-list', component: ProductsListComponent },
  { path: 'new-products', component: NewProductsListComponent },
  { path: 'new-groups', component: NewGroupListComponent },

  { path: 'lead-view', component: LeadViewComponent },
  { path: 't-deal', component: DealViewComponent },
  { path: 't-quote', component: QuoteViewComponent },
  { path: 'services-view/:id', component: ServicesViewComponent },

  { path: 'service-request', component: ServiceRequestComponent },
  { path: 'service-request-list', component: ServiceRequestListComponent },
  { path: 'performance', component: PerformanceComponent },
  { path: 'performance-list', component: PerformanceListComponent },
  { path: 'service-request-edit/:id', component: ServiceRequestEditComponent },
  { path: 'performance-edit/:id', component: PerformanceEditComponent },
  { path: 'new-products-edit/:id', component: NewProductEditComponent },
  { path: 'role-edit/:id', component: RoleEditComponent },
  { path: 'forget-password', component: ForgetpassComponent },
  { path: 'product-edit/:id', component: ProductEditComponent },
  { path: 'product-view', component: ProductViewComponent },
  {
    path: 'master',
    children: [
      { path: 'brand', component: BrandComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'sub-category', component: SubCategoryComponent },
      { path: 'unit', component: UnitComponent },
      { path: 'tax', component: TaxComponent },
      { path: 'hsncode', component: HsncodeComponent },
    ],
  },
  { path: 'product-fetch', component: ProductgridComponent },
  { path: 'report', component: ReportComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
