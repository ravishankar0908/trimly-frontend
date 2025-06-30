import { FormControl } from '@angular/forms';

export interface SpecializationModel {
  name: FormControl<string>;
  description: FormControl<string>;
}
