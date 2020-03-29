import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { CommunicationService } from './communication.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  subscription: Subscription;
  constructor(private router: Router, private toastr: ToastrService, public comm: CommunicationService,private cookieService: CookieService) {
      this.subscription = this.comm.getMessage().subscribe(msg => {
        this.triggerToaster(JSON.parse(msg.info));
      });
      
   }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  triggerToaster(msg) {
    const config = {
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        closeButton: true,
        newestOnTop: true,
        timeOut : 5000,
        extendedTimeOut : 1000,
        maxOpened : 1,
        progressBar : true
    };

    if (msg.type == 'S') {
        this.toastr.success(msg.content, msg.title, config);
    } else if (msg.type == 'E') {
        this.toastr.error(msg.content, msg.title, config);
    } else if (msg.type == 'W') {
        this.toastr.warning(msg.content, msg.title, config);
    } else {
        this.toastr.info(msg.content, msg.title, config);
    }
}

}
