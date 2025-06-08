import { FormControl } from '@angular/forms';

export interface UserRegistrationModel {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  gender: FormControl<string>;
  city: FormControl<string>;
  phoneNumber: FormControl<string>;
  emailAddress: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  role: FormControl<'user' | 'shopowner'>;
  termAndConditions: FormControl<boolean>;
}
