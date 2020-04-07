import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { DataService } from '../../data.service';
import { Router, ActivatedRoute,Params, Data } from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
  resetReqBy:String;

  
  constructor(private route: ActivatedRoute,private router: Router,private dataService: DataService,private _location: Location) {
    this.route.queryParams.subscribe(params => {
      this.resetReqBy = params["requestBy"];
      console.log('this.resetReqBy',this.resetReqBy)
  });
   }
  retsetSubmitFlag:boolean;
  backToLogin:boolean=false;
  errorMessage:string;
  navigateTo:String;
  userEmail:any;
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params['requestBy'])
      // this.firstname = params["firstname"];
      // this.lastname = params["lastname"];
     });
  }
  
  backClick(){
    // this._location.back();
    
    this.router.navigate(['/'+this.resetReqBy]);
    // this.router.navigate(['/'+"userlogin"]);
  }
  modelChanged(vaxl){
    this.errorMessage='';
  }
  resetClick(frm:NgForm){
    console.log('hit')
    this.retsetSubmitFlag = true;
    if(!frm.valid){
       return;
    }
    this.retsetSubmitFlag=false;
    console.log('hit2')
    
    // check valid mail id and send url link to mail
    const obj = {};
    obj['userMailId'] = this.userEmail;
    obj['reqestmadeBy'] = this.resetReqBy;
    console.log('dd',obj)
      this.dataService.post('/api/login/mailValidationAndRestPswd', obj).subscribe((res): any => {
        console.log('aaa',res)
      if(res['code'] == 200){
        console.log('1')
          this.backToLogin=true;
           this.navigateTo=res['navUrl'];//need to pass url from backend
      }else{
        console.log('2')
        this.errorMessage=res['result']
      }
        
        
      }, (error) => {
        console.log(error);
      });
  }

}
