import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyComponent } from './company.component';
import { CompanyListComponent } from './company-view/company-list.component';
import { AddCompanyComponent } from './company-view/add-company.component';
import { GetCompanyComponent } from './company-view/get-company.component';
import { updateCompanyComponent } from './company-view/update-company.component';
const routes: Routes = [
  {
    path: '',
    children : [
      {
        path: '',
        redirectTo: 'company'
      },
      {
        path: 'company',
        component: CompanyListComponent,
        data: {
          title: 'Company List'
         }
      },
      {
        path: 'addcompany',
        component: AddCompanyComponent,
        data: {
          title: 'Add Company'
         }
      },
      {
        path: 'viewcompany/:id',
        component: GetCompanyComponent,
        data: {
          title: 'View Company'
         }
      },
      {
        path: 'updatecompany/:id',
        component: updateCompanyComponent,
        data: {
          title: 'Update Company'
         }
      }

      ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule {}
