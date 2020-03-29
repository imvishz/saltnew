import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../data.service';
import { CommunicationService } from '../../../communication.service';
import { Router, ActivatedRoute ,NavigationExtras} from '@angular/router';

@Component({
    selector : 'add-company',
    templateUrl : './add-company.component.html'
})
export class AddCompanyComponent implements OnInit{

    companyForm: FormGroup;
    loading = false;
    submitted = false;
    uploadedFileName : string;
    filesToUpload : any;

    constructor( private formBuilder: FormBuilder,private dataService: DataService,private router: Router, public comm: CommunicationService) { }

    ngOnInit() {
      this.companyForm = this.formBuilder.group({
          companyName: ['', Validators.required],
          email: ['', [Validators.required, Validators.pattern(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}/i)]],
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
      this.filesToUpload = event.target.files;
      let fileList: FileList = event.target.files;
      if(fileList.length > 0) {
        let file: File = fileList[0];              
        this.uploadedFileName = file.name;
      }
    }

    upload() {
      this.makeFileRequest("/api/company/upload", this.filesToUpload).then((result) => {
          console.log(result);
          this.restOfFields(result);
      }, (error) => {
          console.error(error);
          this.comm.sendMessage(JSON.stringify({content:error,title:"Registration Failed",type:"E"}));
      });
    }

    makeFileRequest(url: string, fileArray) {
      return new Promise((resolve, reject) => {
          var xhr = new XMLHttpRequest();
          let fileList: FileList = fileArray;
          let formData:FormData = new FormData();
          if(fileList.length > 0) {
              let file: File = fileList[0];              
              formData.append('uploads', file, file.name);
          }
          
          xhr.onreadystatechange = function () {
              if (xhr.readyState == 4) {
                  if (xhr.status == 200) {
                      resolve(JSON.parse(xhr.response));
                  } else {
                      reject(xhr.response);
                  }
              }
          }
          xhr.open("POST", url, true);
          xhr.send(formData);
      });
    }

  onSubmit() {
      this.submitted = true;
      this.loading = true;
      if(this.companyForm.status == 'INVALID') {
          return true;
      } else {
        if(this.uploadedFileName) {
          this.upload(); 
        } else {
          this.restOfFields(null)
      }
    }
      
      let obj = {
        companyName : this.companyForm.value.companyName,
        email:this.companyForm.value.email,
        contactPerson:this.companyForm.value.contactPerson,
        contactNo:this.companyForm.value.contactNo,
        street:this.companyForm.value.street,
        city:this.companyForm.value.city,
        postalCode:this.companyForm.value.postalCode,
        country:this.companyForm.value.country,
        status: "Active"         
      }
      // this.dataService.post('/api/company/create-company', obj).subscribe((res): any => {
      //   if(res['code'] == 200) {
      //     this.comm.sendMessage(JSON.stringify({content:"Job publish created successfully",title:"Registration",type:"S"}));
      //       this.router.navigate(['company/company']);
      //   } else {
      //     this.comm.sendMessage(JSON.stringify({content:"Job publish created failed",title:"Registration",type:"E"}));
      //   }
      // });         
  }

   restOfFields(docDetails) {
    let obj = {
      companyName : this.companyForm.value.companyName,
      email:this.companyForm.value.email,
      contactPerson:this.companyForm.value.contactPerson,
      contactNo:this.companyForm.value.contactNo,
      street:this.companyForm.value.street,
      city:this.companyForm.value.city,
      postalCode:this.companyForm.value.postalCode,
      country:this.companyForm.value.country,
      status: "Active"         
    }
    if(this.uploadedFileName) {
      obj['fileName'] =  docDetails['originalname'];
      obj['fileType'] =  docDetails['mimetype'];
      obj['filePath'] =  docDetails['path'];
      obj['orginalFilePath'] =  docDetails['savedPath'];
    }
    this.dataService.post('/api/company/create-company', obj).subscribe((res): any => {
      if(res['code'] == 200) {
        this.comm.sendMessage(JSON.stringify({content:"Company created successfully",title:"Registration",type:"S"}));
          this.router.navigate(['company/company']);
      } else {
        this.comm.sendMessage(JSON.stringify({content:"Company created failed",title:"Registration",type:"E"}));
      }
    }, (error) => {
      console.log(error);
    });
   }

   onReset(){
     this.companyForm.reset();
   }

   onBack(){
      window.history.back();
   }

}
