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
    if(newV.length==0) return
    const result = number.test(newV);
    return result ? null : { isFloat: true };
}


// export function isNumFloat(control: FormControl):any{
//     const number = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
//     let newV =control.value;
//     console.log("newV",newV,newV.length)
//     if(newV.length==0) return
//     const result = number.test(newV);
//     return result ? null : { isNumFloat: true };
// }