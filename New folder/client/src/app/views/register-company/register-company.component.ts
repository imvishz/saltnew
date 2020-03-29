import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../data.service';
import { CommunicationService } from '../../communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register-company.component.html'
})

export class RegisterCompanyComponent implements OnInit {

  companyForm: FormGroup;
  loading = false;
  submitted = false;
  mismatchPwd = false;
  uploadedFileName : any = "";

  constructor(private formBuilder: FormBuilder,private dataService: DataService,private router: Router, public comm: CommunicationService) { }

  ngOnInit() {
    this.companyForm = this.formBuilder.group({
        companyName: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}/i)]],
        password: ['', Validators.required],
        confirmPwd: ['', Validators.required],
        contactPerson: ['', Validators.required],
        contactNo: ['', [Validators.required, Validators.pattern('^[0-9+() -/]*$')]],
        street: ['', Validators.required],
        city: ['', Validators.required],
        postalCode: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')]],
        country: ['', Validators.required]
    });
  }

  get f() { return this.companyForm.controls; }

  openDialog() {
    document.getElementById('fileid').click();
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        this.uploadedFileName = file.name;
        formData.append('data_archive', file, file.name);
      }
    }

  onSubmit() {
      this.submitted = true;
      this.loading = true;
      this.mismatchPwd = false;
      if( this.companyForm.status == 'INVALID' ){
          return true;
      } else if( this.companyForm.value.password !== this.companyForm.value.confirmPwd ){
        this.mismatchPwd = true;
        return true;
      }
      
      let obj = {
        companyName : this.companyForm.value.companyName,
        email:this.companyForm.value.email,
        password:this.companyForm.value.password,
        contactPerson:this.companyForm.value.contactPerson,
        contactNo:this.companyForm.value.contactNo,
        street:this.companyForm.value.street,
        city:this.companyForm.value.city,
        postalCode:this.companyForm.value.postalCode,
        country:this.companyForm.value.country,
        status: "Pending"         
      }

      this.dataService.post('/api/company/create-company', obj).subscribe((res): any => {
        if(res['code'] == 200) {
          this.comm.sendMessage(JSON.stringify({content:"Company registered successfully",title:"Registration",type:"S"}));
            this.router.navigate(['/companylogin']);
        } else {
          this.comm.sendMessage(JSON.stringify({content:"Company registered failed",title:"Registration",type:"E"}));
        }
      }, (error) => {
        console.log(error);
      });
   }

}
