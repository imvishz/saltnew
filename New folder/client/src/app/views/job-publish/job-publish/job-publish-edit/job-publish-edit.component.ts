import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { DataService } from '../../../../data.service';
import { CommunicationService } from '../../../../communication.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-job-publish-edit',
  templateUrl: './job-publish-edit.component.html',
  styleUrls: ['./job-publish-edit.component.scss']
})
export class JobPublishEditComponent implements OnInit {
  jobId:any;
  jobDetail : any = {};
  companyList : any = [];
  tempList : any = [];
  jobPublishForm:FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,private router: Router, private route: ActivatedRoute,private dataService: DataService, public comm: CommunicationService ) { }

  ngOnInit() {
    this.dataService.get('/api/company/getActiveCompanyList').subscribe((res): any => {
      this.companyList=res;
      this.tempList = this.companyList;
     }, (error) => {
       console.log(error);
     });
     this.jobId=this.route.snapshot.paramMap.get('id');
     this.dataService.get('/api/job-posting/getJobDetail/'+this.jobId).subscribe((res): any => {
      console.log('ddXSdd',res)
      if(res.length>0){
        this.jobDetail=res[0];
      }
     }, (error) => {
       console.log(error);
     });
     this.jobPublishForm=this.formBuilder.group({
      companyName:['',Validators.required],
      jobName : ['',Validators.required],
      industry : ['',Validators.required], 
      jobType : ['',Validators.required],
      designation : ['',Validators.required],
      location : ['',Validators.required],
      description : ['',Validators.required],    
      vacancy : ['',Validators.required],
      qualification : ['',Validators.required],
      experience : ['',Validators.required],
      skills : ['',Validators.required],
      dop : ['',Validators.required],
      expiryDate : ['',Validators.required]
    })
  }
  get f() { return this.jobPublishForm.controls; }
  onBack(){
    window.history.back();
  }
  onReset(){
    console.log(this.tempList,"asas")
    this.jobPublishForm.reset();
  }
  onSubmit() {
    this.submitted = true;
    
    
    if(this.jobPublishForm.status == 'INVALID'){
      return true;
    }

    let obj = {
      companyId:this.jobPublishForm.value.companyName,
      jobName:this.jobPublishForm.value.jobName,
      industry:this.jobPublishForm.value.industry,
      jobType:this.jobPublishForm.value.jobType,
      designation:this.jobPublishForm.value.designation,
      location:this.jobPublishForm.value.location,
      description:this.jobPublishForm.value.description,
      vacancy:this.jobPublishForm.value.vacancy,
      qualification:this.jobPublishForm.value.qualification,
      experience:this.jobPublishForm.value.experience,
      skills:this.jobPublishForm.value.skills,
      dop:new Date(this.jobPublishForm.value.dop),
      expiryDate:new Date(this.jobPublishForm.value.expiryDate),
      jobId:this.jobDetail._id
      // dop:this.jobPublishForm.value.dop,
      // expiryDate:this.jobPublishForm.value.expiryDate
      }

    console.log("hit",obj)

    this.dataService.post('/api/job-posting/updateJobDetail/'+this.jobDetail._id, obj).subscribe((res): any => {
      if(res['code'] == 200) {
        this.comm.sendMessage(JSON.stringify({content:"Updated successfully",title:"Registration",type:"S"}));
          this.router.navigate(['jobPublish/jobPublish']);
      } else {
        this.comm.sendMessage(JSON.stringify({content:"Failed to update data",title:"Registration",type:"E"}));
      }
    }, (error) => {
      console.log(error);
    });
  }








  

}
