import {Component, OnInit, ViewChild, ɵConsole} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../../../data.service';
import { CommunicationService } from '../../../communication.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {
     cookieValue : {};
    feature : any = "View";
    isUpdating : boolean = false;
    loading = false;
    submitted = false;
    userDetail : any = {};
    userId:any;
    firstName:any;
    uploadedFileName : string;
    filesToUpload : any;

    public industries: Object[] = [
      { name: 'IT' },
      { name: 'Hardware' },
      { name: 'Others' }
    ];
    public qualifications: Object[] = [
      { name: 'BE' },
      { name: 'ME' },
      { name: 'MBA' }
    ];
    public skills: Object[] = [
        { name: 'Angular' },
        { name: 'React' },
        { name: 'Java' }
    ];
    public locations: Object[] = [
        { name: 'Chennai' },
        { name: 'Bangalore' }
    ];
    public fields: Object = { text: 'name', value: 'name' };
    public box : string = 'Box';

    constructor(private router: Router, private route: ActivatedRoute,private dataService: DataService, public comm: CommunicationService,private cookieService: CookieService) { 
      this.cookieValue = this.cookieService.getAll();
      this.userId = JSON.parse(this.cookieValue['userData'])['id'];
    }

    ngOnInit() {
      this.dataService.get('/api/user-profile/getprofile/'+this.userId).subscribe((res): any => {
          console.log("res",res)
          this.userDetail = res;
          this.userDetail['firstName'] = this.userDetail['firstName'] ? this.userDetail['firstName']: "-";
          this.userDetail['email'] = this.userDetail['userId'] ? this.userDetail['userId']['userName'] : "-";
          this.userDetail['industry'] = [this.userDetail['industry']];
          this.userDetail['qualification'] = [this.userDetail['qualification']];
          this.userDetail['location'] = [this.userDetail['location']];
          this.userDetail['experience'] = this.userDetail['experience'] + " Yrs";
          this.userDetail['orginalFilePath'] = this.userDetail['orginalFilePath'] ? environment.serverurl+this.userDetail['orginalFilePath']: "http://localhost:9000/companyDocument/dummy_license.jpg";
          this.userDetail['fileName'] = this.userDetail['fileName'] ? this.userDetail['fileName']: "-";

          // this.userDetail['firstName'] = "-";
          // this.userDetail['email'] =  "-";
          // this.userDetail['industry'] = "";
          // this.userDetail['qualification'] = "";
          // this.userDetail['location'] = "";
          // this.userDetail['experience'] ='';
      }, (error) => {
        console.log(error);
      });
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



    updateProfile() {
      this.submitted = true;
      this.loading = true;    
      let obj = {
          firstName : this.userDetail['firstName'],
          lastName : this.userDetail['lastName'],
          mobile : this.userDetail['mobile'],
          dob : this.userDetail['dob'],
          industry : this.userDetail['industry'][0],
          employeeType : this.userDetail['employeeType'],
          experience : this.userDetail['experience'],
          qualification : this.userDetail['qualification'][0],
          skillset : this.userDetail['skillset'],
          location : this.userDetail['location'][0],
          exptCtc : this.userDetail['exptCtc']
      };
      if(this.uploadedFileName) {
        console.log("hit")
          this.makeFileRequest("/api/user-profile/upload", this.filesToUpload).then((result) => {
              this.uploadedFileName="";
              if(this.uploadedFileName) {
                obj['fileName'] =  result['originalname'];
                obj['fileType'] =  result['mimetype'];
                obj['filePath'] =  result['path'];
                obj['orginalFilePath'] =  result['savedPath'];
              }
              this.dataService.post('/api/user-profile/update-profile/' + this.userDetail['_id'], obj).subscribe((res): any => {
                this.comm.sendMessage(JSON.stringify({content:"Profile updated", type:"S"}));
                this.dataService.selfReload(this.router.url);
              }, (error) => {
                  this.comm.sendMessage(JSON.stringify({content:"Failed to update profile", type:"E"}));
              });
          }, (error) => {
              console.error(error);
              this.comm.sendMessage(JSON.stringify({content:error,title:"Registration Failed",type:"E"}));
          });
      } else {
        this.dataService.post('/api/user-profile/update-profile/' + this.userDetail['_id'], obj).subscribe((res): any => {
          this.comm.sendMessage(JSON.stringify({content:"Profile updated", type:"S"}));
          this.dataService.selfReload(this.router.url);
        }, (error) => {
            this.comm.sendMessage(JSON.stringify({content:"Failed to update profile", type:"E"}));
        });
      }
      
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
    onReset(){
      window.history.back();
    }

    updateClick(){
        this.isUpdating = !this.isUpdating;
    }

}
