import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute ,NavigationExtras} from '@angular/router';
import {NgForm} from '@angular/forms';
import { DataService } from '../../data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  loginBy: any;
  loginFrom: any;
  userName:any = "";
  userPassword:any = "";
  loginSubmitFlag:boolean = false;
  loginDetails:any;
  authResult:any;

  constructor(private route: ActivatedRoute,private router: Router,private dataService: DataService) {}

  ngOnInit(){
    this.route.data.subscribe(from=>{
      this.loginBy=from;
    });
  }
  onForgotPSClick(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "requestBy": this.loginBy.from
      }
  };
  this.router.navigate(["forgotPassword"], navigationExtras);
  }
   onUSorPSchange(){
    this.authResult='';
   }
  loginClick(frm:NgForm){
    this.loginSubmitFlag = true;
    if(!frm.valid){
       return;
    }
   this.authResult='';

    this.loginSubmitFlag = false;
    this.loginDetails={loginType:this.loginBy.from,userName:this.userName,password:this.userPassword}

    this.dataService.post('/api/login/loginAuthentication', this.loginDetails).subscribe((res): any => {  
     if(res['code'] == 200){
       //Set_Cookies Start
       var cookieFlag = this.dataService.check_cookie('userData');
       if(cookieFlag  == true){
           this.dataService.delete_cookie();
           this.dataService.delete_cookieName('userData');
       }
       console.log("res['data']");
       console.log(res['data']);
       this.dataService.set_cookie(res['data']);
       this.router.navigate(['/dashboard']);
     } else if(res['code'] == 204) {
       console.log('ssww')
          this.authResult="Not a valid user";
     }else{
          this.authResult="User Name and Password doesn't match";
     }
     }, (error) => {
       console.log(error);
     });


    // const obj = {};
    // obj['userName'] = this.userName;
    // obj['password'] = this.userPassword;
    // obj['loginType'] = this.loginBy.from;
    //   this.dataService.post('/api/login/loginAuthentication', obj).subscribe((res): any => {
    //   if(res['code'] == 200){
    //     this.router.navigate(['/dashboard']);
    //   } else {
    //     console.log('authentication failed');
    //   }
    //   }, (error) => {
    //     console.log(error);
    //   });
  }
}
