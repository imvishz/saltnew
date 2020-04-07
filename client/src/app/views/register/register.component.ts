import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../data.service';
import { CommunicationService } from '../../communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  loading = false;
  submitted = false;
  mismatchPwd = false;
  uploadedFileName : any = "";

  constructor(private formBuilder: FormBuilder,private dataService: DataService,private router: Router, public comm: CommunicationService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}/i)]],
        password: ['', Validators.required],
        confirmPwd: ['', Validators.required],
        contactNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  get f() { return this.userForm.controls; }

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
      if( this.userForm.status === 'INVALID' ){
          return true;
      } else if( this.userForm.value.password !== this.userForm.value.confirmPwd ){
        this.mismatchPwd = true;
        return true;
      }
      
      let obj = {
        firstName : this.userForm.value.firstName,
        lastName : this.userForm.value.lastName,
        email : this.userForm.value.email,
        password : this.userForm.value.password,
        mobile : this.userForm.value.contactNo
      }

      this.dataService.post('/api/user-profile/register', obj).subscribe((res): any => {
        if(res['code'] === 200) {
          this.comm.sendMessage(JSON.stringify({content:"User registered successfully",title:"Registration",type:"S"}));
            this.router.navigate(['/userlogin']);
        } else {
          this.comm.sendMessage(JSON.stringify({content:"User registered failed",title:"Registration",type:"E"}));
        }
      }, (error) => {
        console.log(error);
      });
   }

}

