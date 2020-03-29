import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../data.service';
import { CommunicationService } from '../../communication.service';
import { Router } from '@angular/router';
import * as _ from 'underscore';
import * as __ from "lodash";

@Component({
    selector: 'job-list',
    templateUrl: 'job-list.component.html'
  })
  
export class JobListComponent implements OnInit {

  
  jobList : any = [];
  
  constructor(private router: Router,private dataService: DataService, public comm: CommunicationService ) { }
  //FILTERING PARAMETER
  filterObj: any={
    companyName:"",
    jobName:"",
    location:""
  }
  filteredData :any =  [];
  cloneDeepjobArray : any = [];
  ngOnInit() {
    this.dataService.get('/api/job-posting/getJobList').subscribe((res): any => {
      this.jobList = _.each(res,function(eachdata){
        eachdata['companyName'] = eachdata['companyId']['companyName']
        return eachdata;
      })
      this.cloneDeepjobArray = this.jobList;
     }, (error) => {
       console.log(error);
     });
  }
  
  onViewClick(idval){
    this.router.navigate(['/jobPublish/viewJobPublish/'+idval+'/jobpublish']);
  }

  jobFilter = function(event,keyName){
    this.filterObj[keyName]= event.target.value
    var keys = _.keys(this.filterObj);
    this.currentPage=0;
    var where = this;
    this.jobList = __.filter(this.cloneDeepjobArray,function(eachdata){
    var flag = true;
    var that = where;
      __.each(keys,function(keyValue){
        if(that.filterObj[keyValue] != ""){
           var originalValue = eachdata[keyValue];
           var filterValue = that.filterObj[keyValue];
          if((originalValue.toLowerCase()).indexOf(filterValue.toLowerCase()) == -1){
            flag = false; 
          }
        }
      });
      if(flag == true){
        return eachdata;
      }
 });
}

} 