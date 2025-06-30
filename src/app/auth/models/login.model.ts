import { FormControl } from '@angular/forms';

export interface LoginModel {
  emailAddress: FormControl<string>;
  password: FormControl<string>;
}
