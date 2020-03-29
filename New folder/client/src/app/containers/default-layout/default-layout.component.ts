import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  cookieValue : {};
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  userType:string = "";
  userName:string = "";
  userId:string ="";
  constructor(private dataService: DataService,private router: Router,private cookieService: CookieService,@Inject(DOCUMENT) _document?: any) {
    this.cookieValue = this.cookieService.getAll();
    this.userName = JSON.parse(this.cookieValue['userData'])['userName'];
      if(!this.cookieValue.hasOwnProperty("userData")){
          // this.router.navigateByUrl('/userlogin');
      }else{
        this.userType = JSON.parse(this.cookieValue['userData'])['loginType'];
        this.userId = JSON.parse(this.cookieValue['userData'])['id'];

        this.changes = new MutationObserver((mutations) => {
          this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
        });
        this.element = _document.body;
        this.changes.observe(<Element>this.element, {
          attributes: true,
          attributeFilter: ['class']
        });
      }
    
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
  onLogoutClick = function(){
    console.log("onLogoutClick")
     //Set_Cookies Start
     var cookieFlag = this.dataService.check_cookie('userData');
     if(cookieFlag  == true){
         this.dataService.delete_cookie();
         this.dataService.delete_cookieName('userData');
         this.router.navigateByUrl('/userlogin');
     }else{
        this.router.navigateByUrl('/userlogin');

     }
    
  }

  onprofileClick = function(){
    if(this.userType == "userlogin"){
      this.router.navigateByUrl('/profile/user-profile?id='+this.userId);
    }else if(this.userType == "companylogin"){
      this.router.navigateByUrl('/profile/company-profile?id='+this.userId);

    }
  }
}
