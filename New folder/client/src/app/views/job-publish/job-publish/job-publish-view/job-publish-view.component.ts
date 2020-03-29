import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { DataService } from '../../../../data.service';
import { CommunicationService } from '../../../../communication.service';
@Component({
  selector: 'app-job-publish-view',
  templateUrl: './job-publish-view.component.html',
  styleUrls: ['./job-publish-view.component.scss']
})
export class JobPublishViewComponent implements OnInit {
  
  jobId:any;
  pageType:string = "";
  jobDetail : any = {};
  companyList : any = [];
  tempList : any = [];
  isUpdating:boolean = false;
  constructor(private router: Router, private route: ActivatedRoute,private dataService: DataService, public comm: CommunicationService ) { }

  ngOnInit() {
    this.dataService.get('/api/company/getCompanyList').subscribe((res): any => {
      this.companyList=res;
      this.tempList = this.companyList;
     }, (error) => {
       console.log(error);
     });
    this.jobId=this.route.snapshot.paramMap.get('id');
    this.pageType=this.route.snapshot.paramMap.get('pagetype');
      this.dataService.get('/api/job-posting/getJobDetail/'+this.jobId).subscribe((res): any => {
        if(res.length>0){
          this.jobDetail=res[0];
          this.jobDetail.companyId = res[0].companyId._id;
        }
       }, (error) => {
         console.log(error);
       });
      //fetch the details of selected company thru api's
  }
  onBack(){
    window.history.back();
  }
  onJobApplyClick(){
    var obj = {
      "userName": "Vimal",
      "experience" : "2 yrs",
      "location":"chennai",
      "resumeName":"1cb159a1bcd5028201424dc4431edf3a"
      }
    this.dataService.post('/api/login/sendUserRegisterMail', obj).subscribe((res): any => {
      if(res['code'] == 204){
        this.comm.sendMessage(JSON.stringify({content:res['result'],title:"Job Apply",type:"E"}));
      }else if(res['code'] == 200) {
        this.comm.sendMessage(JSON.stringify({content:res['result'],title:"Job Apply ",type:"S"}));
        this.router.navigate(['jobpostedlist']);
      } else {
        this.comm.sendMessage(JSON.stringify({content:res['result'],title:"Job Apply",type:"E"}));
      }
    }, (error) => {
      console.log(error);
    });
  }
}
