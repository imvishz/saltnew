import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { Router, RouterModule,ActivatedRoute, NavigationEnd } from '@angular/router';
import * as _ from "lodash";
import * as __ from "underscore";
import { CookieService } from 'ngx-cookie-service'; 

@Injectable()
export class DataService {

    constructor(public router: Router, private http: Http, private cookieService: CookieService) { }

    selfReload(activeComp){
        this.router.navigateByUrl('/500', {skipLocationChange: true}).then(()=>this.router.navigate([activeComp]));
    }

    get(url) {
            return this.http.get(url)
                // .map((respones) => respones.json())
                .pipe(map(data => data.json()));
    }

    post(url, postBody: any) {
            let headers;
            let options;
            headers = new Headers();
            headers.append('Content-Type', 'application/json');
            options = new RequestOptions({ headers: headers });
            return this.http.post(url, postBody, options)
                  .pipe(map(data => data.json()));

    }

    deleteById(url) {
        return this.http.delete(url)
            // .map((respones) => respones.json())
            .pipe(map(data => data.json()));
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }

    validationObj = {
        "passwordPattern": {
            "pattern": /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s])/,
            "errorMessage": "Password must contain at least one uppercase character, one lowercase character, one special character & one digit !!"
        },
        "phoneNumber": {
            "pattern": "",
            "errorMessage": ""
        },
        "numbersOnly": {
            "pattern": /^[0-9]*$/,
            "errorMessage": "Numbers only allowed !"
        },
        "mailId": {
            "pattern": /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "errorMessage": "Invalid mail id !"
        },
        "decimalWithFourDigit":{
            "pattern":/^\d*(\.\d{1,4})?$/,
            "errorMessage":"Decimal only"
        },
        "decimalWithTwoDigit":{
            "pattern":/^\d*(\.\d{1,2})?$/,
            "errorMessage":"Decimal only"
        },
        "pan":{
            "pattern": /^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/,
            "errorMessage": "Invalid pan number!"
        },
        "percentage":{
            "pattern": /^([0-9]{1,2}([\.][0-9]{1,})?$|100([\.][0]{1,})?)$/,
            "errorMessage": "Invalid percentage value!"
		},
        "ifsc":{
            "pattern":/^[A-Za-z]{4}[0-9]{6,7}$/,
            "errorMessage": "Invalid ifsc code!"
        },
        "aadhar":
        {
            "pattern":/^[0-9]{12}$/,
            "errorMessage": "Invalid aadhar!"
        }
    }
    set_cookie(res: any) {
        var expireTime = 30;
        var now = new Date();
        var exp = new Date(now.getTime() + expireTime * 60 * 1000);
        this.cookieService.set('userData', JSON.stringify(res), exp ,'/');
    }

    delete_cookieName(res){
        // var now = new Date();
        // var exp = new Date(now.getTime());
        // this.cookieService.set('userData', JSON.stringify(res), exp ,'/');
        this.cookieService.deleteAll();
     }

    refresh_cookie(url: string) {
        var cookiesObj;
        var expireTime = 30;
        var now = new Date();
        var exp = new Date(now.getTime() + expireTime * 60 * 1000);
        cookiesObj = this.cookieService.getAll()
        if(cookiesObj.hasOwnProperty("userData")){
           this.cookieService.set('userData', cookiesObj['userData'], exp ,'/');
        }
        if (cookiesObj.hasOwnProperty("userData") || url.indexOf("loginAuthentication") != -1 || url.indexOf("forgotPassword") != -1 || url.indexOf("encryptAndDecrypt") != -1 || url.indexOf("resetPassword") != -1) {
            return "session refresh";
        } else {
            return this.router.navigate(['/userlogin']);
        }
    }

    get_cookie() {
        var cookiesObj;
        var obj = {};
        cookiesObj = this.cookieService.getAll();
        if (cookiesObj.hasOwnProperty("userData")) {
            return cookiesObj;
        } else if (cookiesObj.hasOwnProperty("authCode")) {
            return obj['userData'] = JSON.stringify(cookiesObj);
        } else {
            return this.router.navigate(['/userlogin']);
        }
    }
    check_cookie(CookieName){
       return this.cookieService.check(CookieName);
    }
    
   
    delete_cookie() {
        this.cookieService.deleteAll('/');
    }
  

}
