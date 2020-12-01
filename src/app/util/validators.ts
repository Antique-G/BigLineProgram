import { FormControl } from '@angular/forms';
export function isNumber(control: FormControl):any{
    const number = /^[0-9]*$/;
    let newV =control.value
    const result = number.test(newV);
    return result ? null : { isNumber: true };
}

export function isFloat(control: FormControl):any{
    const number = /^\d+(\.\d+)?$/;
    let newV =control.value
    const result = number.test(newV);
    return result ? null : { isFloat: true };
}
