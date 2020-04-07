import { Directive ,Input} from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';
import { DataService } from '../../data.service';


@Directive({
  selector: '[appPatternFormatValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: PatternFormatValidatorDirective, multi: true}]
})
export class PatternFormatValidatorDirective  implements Validator{

	validationObj:any;

    @Input() private appPatternFormatValidator: String;

	constructor(public DataService: DataService){
			this.validationObj = this.DataService.validationObj;
	}

 validate(formControl:FormControl): ValidationErrors{
 	var isValidPhoneNumber = true;
 		var pattern = this.validationObj[this.appPatternFormatValidator.toString()]['pattern'];
 		if(formControl.value){
 			 isValidPhoneNumber = pattern.test(formControl.value);
 		}
  		const message = {
					      'customerPatterValidator': { 'message': this.validationObj[this.appPatternFormatValidator.toString()]['errorMessage'] }
   						 };

 		return (isValidPhoneNumber == true) ?  null : message;
 	}
}
