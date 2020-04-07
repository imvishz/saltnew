import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobPublishComponent } from './job-publish/job-publish.component';
import { JobPublishAddComponent } from './job-publish/job-publish-add/job-publish-add.component';
import { JobPublishViewComponent } from './job-publish/job-publish-view/job-publish-view.component';
import { JobPublishEditComponent } from './job-publish/job-publish-edit/job-publish-edit.component';
const routes: Routes = [
  {
    path: '',
    children : [
      {
        path: '',
        redirectTo: 'jobPublish'
      },
      {
        path: 'jobPublish',
        component: JobPublishComponent,
        data: {
          title: 'Job Publish List'
         }
      },
      {
        path: 'addJobPublish',
        component: JobPublishAddComponent,
        data: {
          title: 'Add Job Publish'
         }
      },
      {
        path: 'viewJobPublish/:id/:pagetype',
        component: JobPublishViewComponent,
        data: {
          title: 'View Job Publish'
         }
      },
      {
        path: 'updateJobPublish/:id',
        component: JobPublishEditComponent,
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
export class jobPublishRoutingModule {}
