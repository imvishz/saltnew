import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CompanyComponent } from './company.component';
import { CompanyListComponent } from './company-view/company-list.component';
import { CompanyRoutingModule } from './company-routing.module';
import { AddCompanyComponent } from './company-view/add-company.component';
import { GetCompanyComponent } from './company-view/get-company.component';
import { updateCompanyComponent } from './company-view/update-company.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
        CompanyComponent,
        CompanyListComponent,
        AddCompanyComponent,
        GetCompanyComponent,
        updateCompanyComponent,
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ModalModule.forRoot()
  ]
})
export class CompanyModule { }
