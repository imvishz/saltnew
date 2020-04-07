import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DataService } from '../../../data.service';
import { CommunicationService } from '../../../communication.service';

@Component({
  selector: 'app-job-publish',
  templateUrl: './job-publish.component.html',
  styleUrls: ['./job-publish.component.scss']
})
export class JobPublishComponent implements OnInit {
  
  jobList : any = [];
  tempList : any = [];
  constructor(private router: Router,private dataService: DataService, public comm: CommunicationService ) { }

  ngOnInit() {
    this.dataService.get('/api/job-posting/getJobList').subscribe((res): any => {
      this.jobList=res;
      this.tempList = this.jobList;
     }, (error) => {
       console.log(error);
     });
  }
  
  onViewClick(idval){
    this.router.navigate(['/jobPublish/viewJobPublish/'+idval+'/jobpost'])
  }
  onUpdateClick(idval){
    this.router.navigate(['/jobPublish/updateJobPublish/'+idval])
  }
  onDeleteClick(compId){
    this.dataService.deleteById('/api/job-posting/deleteJob/'+compId)
        .subscribe((res): any => {
          //reload the page
          this.dataService.selfReload(this.router.url);
          this.comm.sendMessage(JSON.stringify({content:"Company deleted successfully", title:"Deleteion", type:"S"}));
        }, (error) => {
            console.log(error);
            this.comm.sendMessage(JSON.stringify({content:"Failed to delete compnay", title:"Deleteion", type:"E"}));
        });
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.tempList.filter(function(d) {
      return (d.companyId.companyName.toLowerCase().indexOf(val) !== -1 || d.jobName.toLowerCase().indexOf(val) !== -1 || d.location.toLowerCase().indexOf(val) !== -1 || !val);
    });

    // update the rows
    this.jobList = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
}

}
