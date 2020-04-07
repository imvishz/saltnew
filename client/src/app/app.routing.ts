import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { RegisterCompanyComponent } from './views/register-company/register-company.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { JobListComponent } from './views/job-list/job-list.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'userlogin',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'userlogin',
    component: LoginComponent,
    data: {
      title: 'Login Page',
      from:'userlogin'
    }
  },
  {
    path: 'companylogin',
    component: LoginComponent,
    data: {
      title: 'Login Page',
      from:'companylogin'
    }
  },
  {
    path: 'adminlogin',
    component: LoginComponent,
    data: {
      title: 'Admin Login Page',
      from:'adminlogin'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'User Registration'
    }
  },
  {
    path: 'register-company',
    component: RegisterCompanyComponent,
    data: {
      title: 'Company Registration'
    }
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
    data: {
      title: 'ForgorPassword Page'
    }
  },
  {
    path: 'resetPassword/:id',
    component: ResetPasswordComponent,
    data: {
      title: 'ForgorPassword Page'
    }
  },
  {
    path: 'joblist',
    component: JobListComponent,
    data: {
      title: 'Job List'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      },
      {
        path: 'company',
        loadChildren: () => import('./views/company/company.module').then(m => m.CompanyModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'jobPublish',
        loadChildren: () => import('./views/job-publish/job-publish.module').then(m => m.JobPublishModule)
      },{
        path: 'jobpostedlist',
        component: JobListComponent,
        data: {
          title: 'Job List'
        }
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
