import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator ,AbstractControl,ValidationErrors} from '@angular/forms';

@Directive({
  selector: '[hinvEmailvaildator]',
  providers:[{
    provide:NG_VALIDATORS,
    useExisting:EmailvaildatorDirective,
    multi:true
  }]
})
export class EmailvaildatorDirective implements Validator{

  constructor() { }
  
  validate(control:AbstractControl):ValidationErrors | null {

    const value = control.value as string;

    if(value == null) return null;

    if(value.includes('test')){
      return {
        invaildEmail:true
      }
    }

    return null;
  }
}
