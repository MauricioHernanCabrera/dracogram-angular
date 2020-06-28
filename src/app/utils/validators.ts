import { AbstractControl } from '@angular/forms';

export class MyValidators {
  static example(control: AbstractControl) {
    const value = control.value;

    if (value > 10000) {
      return {
        example: true,
      };
    }

    return {
      example: false,
    };
  }
}
