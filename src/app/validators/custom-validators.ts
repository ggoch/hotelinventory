import { AbstractControl, FormGroup } from '@angular/forms';

export class CustomValidator {
  static ValidatorName(control: AbstractControl) {
    const value = control.value as string;
    if (value.includes('test')) return { invalidName: true };

    return null;
  }

  static ValidateSpecialChar(char: string) {
    return (control: AbstractControl) => {
      const value = control.value as string;
      if (value.includes(char)) return { invalidSpecialChar: true };

      return null;
    };
  }

  static Validatedate(control:FormGroup){
    const checkInTime:any = new Date(control.get('checkInDate')?.value);
    const checkoutTime:any = new Date(control.get('checkOutDate')?.value);
    const diffTime = checkoutTime - checkInTime;
    const diffDays = Math.ceil(diffTime/(1000*60*60*24))
    if(diffDays<=0){
        control.get('checkOutDate')?.setErrors({
            invalidDate:true
        })
        return {invalidDate:true}
    }

    return null;
  }
}
