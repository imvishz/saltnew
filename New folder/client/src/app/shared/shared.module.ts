import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowerrormessageComponent } from './component/showerrormessage.component';
import {SelectBoxValidatorDirective} from './directive/select-box-validator.directive';
import { PatternFormatValidatorDirective } from './directive/pattern-format-validator.directive';
import { CompareValidatorDirective } from './directive/compare-validator.directive';
import { NumbersOnlyRestrictValidatorDirective } from './directive/numbers-only-validator.directive';
import { UpperCaseOnlyRestrictValidatorDirective } from './directive/upperCase-only-validator.directive';
import { AutofocusDirective } from './directive/auto-focus.directive';
@NgModule({
  declarations: [
    ShowerrormessageComponent,
    SelectBoxValidatorDirective,
    PatternFormatValidatorDirective,
    CompareValidatorDirective,
    NumbersOnlyRestrictValidatorDirective,
    UpperCaseOnlyRestrictValidatorDirective,
    AutofocusDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShowerrormessageComponent,
    SelectBoxValidatorDirective,
    PatternFormatValidatorDirective,
    CompareValidatorDirective,
    NumbersOnlyRestrictValidatorDirective,
    UpperCaseOnlyRestrictValidatorDirective,
    AutofocusDirective
  ]
})
export class SharedModule { }
