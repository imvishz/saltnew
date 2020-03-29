import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { JobPublishComponent } from './job-publish/job-publish.component';

import { jobPublishRoutingModule } from './jobPublish-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { JobPublishAddComponent } from './job-publish/job-publish-add/job-publish-add.component';
import { JobPublishViewComponent } from './job-publish/job-publish-view/job-publish-view.component';
import { JobPublishEditComponent } from './job-publish/job-publish-edit/job-publish-edit.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';



@NgModule({
  declarations: [
    JobPublishComponent,
    JobPublishAddComponent,
    JobPublishViewComponent,
    JobPublishEditComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    jobPublishRoutingModule,
    SharedModule,
    ModalModule.forRoot(),
    DatePickerModule
  ]
})
export class JobPublishModule { }
