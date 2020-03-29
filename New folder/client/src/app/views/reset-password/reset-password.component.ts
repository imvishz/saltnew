import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { DataService } from '../../data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


import {Location} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router,private dataService: DataService) { }
  backToLogin:boolean=false;
  userEmail:any;
  retsetSubmitFlag:Boolean;
  reuserPassword:any;
  passwordMatch:boolean;
  redirecturlval:string;
  sendObject:any;
  userPassword:any;
  errorMessage:any;
  ngOnInit() {
  console.log('ss',this.route.snapshot.params['id']);
    // get user related details using the id start
  this.userEmail="rosh@gmail.com";
  this.redirecturlval="userlogin";
    // end
  }
  
  backClick(){
    // this._location.back();
    
    this.router.navigate(['/'+this.redirecturlval]);
    // this.router.navigate(['/'+"userlogin"]);
  }
  onRePsCHange(rePasword,password){
    this.errorMessage='';
     if(rePasword===password){
           this.passwordMatch=true;
     }else{
           this.passwordMatch=false;
     }
  }
  
  onpsChange(password){
    this.errorMessage='';
    this.reuserPassword="";
  }
  resetClick(frm:NgForm){
    console.log('hit',frm)
    this.retsetSubmitFlag = true;
    console.log('1',frm.valid)
    console.log('3',this.passwordMatch)
    if(!frm.valid||!this.passwordMatch){
       return;
    }
    this.sendObject={emailID:this.userEmail,password:this.userPassword,reqestedBy:this.redirecturlval}
    // 
    // reset server functionality
    this.retsetSubmitFlag=false;
    console.log('hit2')
    
    // if(respose===success){
    //  this.backToLogin=true;
    // }
    const obj = {};
    obj['userName'] = this.userEmail;
    obj['reqestmadeBy'] = this.redirecturlval;
    obj['password'] =this.userPassword;
    obj['status']=false;
    obj['reqID']=this.route.snapshot.params['id'];
    console.log('dd',obj);
      this.dataService.post('/api/login/passwordReset', obj).subscribe((res): any => {
        console.log('aaa',res)
      if(res['code'] == 200){
        console.log('1')
          this.backToLogin=true;
          //need to pass url from backend
      }else{
        console.log('2')
        this.errorMessage=res['result']  
      }
        
        
      }, (error) => {
        console.log(error);
      });   
    
  }
  
  
}
