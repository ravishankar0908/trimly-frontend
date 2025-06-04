import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private toaster: ToastrService
  ) {}
  passwordHide: Boolean = true;
  confirmPasswordHide: Boolean = true;
  registrationFormData!: FormGroup;

  ngOnInit(): void {
    this.getFormData();
  }

  getFormData() {
    this.registrationFormData = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        city: ['', [Validators.required]],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)],
        ],
        emailAddress: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/),
            Validators.minLength(8),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        role: ['user', [Validators.required]],
        termAndConditions: [true, Validators.requiredTrue],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  Submit() {
    if (this.registrationFormData.invalid) {
      this.registrationFormData.markAllAsTouched();
      return;
    } else {
      console.log(this.registrationFormData.value);
      this.registrationFormData.reset({
        firstName: '',
        lastName: '',
        gender: '',
        city: '',
        phoneNumber: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        role: 'user',
        termAndConditions: true,
      });
    }
  }

  passwordMatchValidator(formGroup: AbstractControl) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');
    if (password?.value !== confirmPassword?.value) {
      return confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      const errors = confirmPassword?.errors;
      if (errors) {
        delete errors['passwordMismatch'];
        if (Object.keys(errors).length === 0) {
          confirmPassword?.setErrors(null);
        } else {
          confirmPassword?.setErrors(errors);
        }
      }
    }
    return null;
  }

  signInWithGoogle() {
    alert('sign with google');
  }
}
