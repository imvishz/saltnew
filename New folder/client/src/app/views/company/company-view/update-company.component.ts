import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../data.service';
import { CommunicationService } from '../../../communication.service';
import { Router, ActivatedRoute} from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
    selector : 'add-company',
    templateUrl : './update-company.component.html'
})
export class updateCompanyComponent implements OnInit{

    companyForm: FormGroup;
    loading = false;
    submitted = false;
    companyId:any;
    companyDetail:any;
    backUps:any;
    uploadedFileName : string;
    filesToUpload : any;
    downloadImage:any;


    constructor( private formBuilder: FormBuilder,private dataService: DataService,private router: Router, private route: ActivatedRoute, public comm: CommunicationService) { }

    ngOnInit() {
      console.log("environment.serverurl",environment.serverurl);
      this.companyForm = this.formBuilder.group({
          companyName: ['', Validators.required],
          email: ['', [Validators.required, Validators.pattern(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}/i)]],
          contactPerson: ['', Validators.required],
          contactNo: ['', [Validators.pattern('^[0-9+() -/]*$')]],
          street: ['', Validators.required],
          city: ['', Validators.required],
          postalCode: ['', Validators.required],
          country: ['', Validators.required]
      });
      this.companyId=this.route.snapshot.paramMap.get('id');

      this.dataService.get('/api/company/getCompanyDetail/'+this.companyId).subscribe((res): any => {
        if(res.length>0){
          this.companyDetail=res[0];
          this.backUps = Object.assign({}, res[0]);
          this.downloadImage=environment.serverurl+this.companyDetail.orginalFilePath;
        }
       }, (error) => {
         console.log(error);
       });
    }

    get f() { return this.companyForm.controls; }

  onSubmit() {
      this.submitted = true;
      this.loading = true;
      if(this.companyForm.status == 'INVALID') {
        return true;
      } else {
        if(this.uploadedFileName) {
          this.upload(); 
        } else {
          this.restOfFields(null);
        }
      }  
   }

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
      companyId:this.companyId         
    }

    if(this.uploadedFileName) {
      obj['fileName'] =  docDetails['originalname'];
      obj['fileType'] =  docDetails['mimetype'];
      obj['filePath'] =  docDetails['path'];
      obj['orginalFilePath'] =  docDetails['savedPath'];
    }

    this.dataService.post('/api/company/update-company', obj).subscribe((res): any => {
        this.comm.sendMessage(JSON.stringify({content:"Company successfully updated", type:"S"}));
        this.router.navigate(['company/company']);
    }, (error) => {
      this.comm.sendMessage(JSON.stringify({content:"Company update failed", type:"E"}));
    });
 }

   onReset(){
     this.companyDetail = Object.assign({}, this.backUps);
   }

   onBack(){
      window.history.back();
   }

}
