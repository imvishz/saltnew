import { Directive,Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';


@Directive({
  selector: '[appSelectBoxValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: SelectBoxValidatorDirective, multi: true}]
})
export class SelectBoxValidatorDirective implements Validator{

@Input() private appSelectBoxValidator: any;

  constructor() { }

 validate(formControl:FormControl): ValidationErrors{
 		const message = {
					      'selectBoxValidator': { 'message': "@labelName required!"}
   						 };
  		return (formControl.value != this.appSelectBoxValidator) ? null : message;
  	}
}
