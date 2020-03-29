import { Component, OnInit , Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'show-error',
  template:`
  			<ul *ngIf="shouldShowErrors()" style="list-style-type: none;">
  				<li style="color: red;text-align: left;" *ngFor="let error of listOfErrors(); index as i; first as isFirst; last as isLast">
           <span *ngIf="isFirst">{{error}}</span>
           </li>
  			</ul>	
  			`
})
export class ShowerrormessageComponent{

@Input() private control: AbstractControlDirective | AbstractControl;

 @Input() private submitFlag: any;

  @Input() private label: any;


   controlName: string = "";
  
  private static readonly errorMessages = {
		   'required': (params) => params +' required !',
		   'minlength': (params) => 'The min number of characters is ' + params.requiredLength,
		   'maxlength': (params) => 'The max allowed number of characters is ' + params.requiredLength,
       'min': (params) => 'The min number of characters is ' + params.requiredLength,
       'max': (params) => 'The max allowed number of characters is ' + params.requiredLength,
		   'pattern': (params) => 'The required pattern is: ' + params.requiredPattern,
       'selectBoxValidator' : (params) => params.message,
       'customerPatterValidator': (params) => params.message,
       'compareValidator': (params) => params.message
  }

  

  shouldShowErrors(): boolean {
   return this.control &&
     this.control.errors &&
     (this.control.invalid && this.submitFlag);
 }

listOfErrors(): string[] {
   return Object.keys(this.control.errors)
     .map(field => this.getMessage(field, this.control.errors[field]));
 }

 private getMessage(type: string, params  : any) {
       if(type == "required"){
            params = this.label['labelName'];
       }
       if(type == "selectBoxValidator" || type == "compareValidator"){
        params['message'] = params['message'].replace('@labelName',this.label['labelName'])
       }
   return ShowerrormessageComponent.errorMessages[type](params);
 }

}
