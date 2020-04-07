import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';


const routes: Routes = [
    {
      path: 'user-profile',
      component: UserProfileComponent,
      data: { title: 'User Profile' }
    },
    {
      path: 'company-profile',
      component: CompanyProfileComponent,
      data: { title: 'Company Profile' }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
