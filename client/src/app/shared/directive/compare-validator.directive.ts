import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appCompareValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: CompareValidatorDirective, multi: true}]
})
export class CompareValidatorDirective implements Validator{

	@Input() private appCompareValidator : string;
	result;
  constructor() { }

  validate(formControl:FormControl): ValidationErrors{
  		const valueToCompare = formControl.parent.get(this.appCompareValidator);

			const message = {
						      'compareValidator': { 'message': "@labelName and "+this.appCompareValidator+" does not match!"}
	   						 };
  	return (valueToCompare.value && valueToCompare.value != formControl.value) ? message : null;
  }

}
