import {Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector:'[upperCaseOnly]'
})
export class UpperCaseOnlyRestrictValidatorDirective{
    
    private regex: RegExp = new RegExp(/^[A-Z]*$/g);
    private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home', '-','ALT' ];
    constructor(private el: ElementRef){}

    @HostListener('keydown' ,['$event']) onKeyDown(event) {
        console.log(event.key)
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        let current: string = this.el.nativeElement.value;
        let next: string = current.concat(event.key);
        if (next && !String(next).match(this.regex)) {
            event.preventDefault()
        }
    };


}