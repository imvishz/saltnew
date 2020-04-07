import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { DataService } from '../../../../data.service';
import { Router, NavigationEnd } from '@angular/router';
import { CommunicationService } from '../../../../communication.service';

@Component({
  selector: 'app-job-publish-add',
  templateUrl: './job-publish-add.component.html',
  styleUrls: ['./job-publish-add.component.scss']
})
export class JobPublishAddComponent implements OnInit {

  companyList : any = [];
  tempList : any = [];
  jobPublishForm:FormGroup;
  submitted = false;
  dop:any = "";
  expiryDate:any = "";
  

  constructor(private formBuilder: FormBuilder,private router: Router,private dataService: DataService, public comm: CommunicationService) { }

  ngOnInit() {
    this.dataService.get('/api/company/getActiveCompanyList').subscribe((res): any => {
      this.companyList=res;
      this.tempList = this.companyList;
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
      expiryDate:new Date(this.jobPublishForm.value.expiryDate)
      // dop:this.jobPublishForm.value.dop,
      // expiryDate:this.jobPublishForm.value.expiryDate
      }

    console.log("hit",obj)

    this.dataService.post('/api/job-posting/createJob', obj).subscribe((res): any => {
      if(res['code'] == 200) {
        this.comm.sendMessage(JSON.stringify({content:"Job created successfully",title:"Saved",type:"S"}));
          this.router.navigate(['jobPublish/jobPublish']);
      } else {
        this.comm.sendMessage(JSON.stringify({content:"Job created failed",title:"Saved",type:"E"}));
      }
    }, (error) => {
      console.log(error);
    });
  }
}
