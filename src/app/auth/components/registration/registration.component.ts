import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserRegistrationModel } from '../../models/user.registration.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}
  passwordHide: boolean = true;
  confirmPasswordHide: boolean = true;
  user: boolean = true;
  isSubmitting: boolean = false;
  registrationFormData!: FormGroup;

  ngOnInit(): void {
    this.getFormData();
  }

  OnroleChange(event: any) {
    if (event.value === 'shopowner') {
      this.user = false;
    }
    if (event.value === 'user') {
      this.user = true;
    }
    this.getFormData();
  }

  getFormData() {
    if (this.user) {
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
    } else {
      this.registrationFormData = this.formBuilder.group(
        {
          shopName: ['', [Validators.required]],
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
          role: ['shopowner', [Validators.required]],
          termAndConditions: [true, Validators.requiredTrue],
        },
        { validators: this.passwordMatchValidator }
      );
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

  Submit() {
    if (this.registrationFormData.invalid) {
      this.registrationFormData.markAllAsTouched();
      return;
    } else {
      this.isSubmitting = true;

      this.authService
        .Registration(this.registrationFormData.value as UserRegistrationModel)
        .subscribe(
          (res) => {
            this.toaster.success(res.message, 'success');
            this.registrationFormData.reset();
            this.registrationFormData.markAsUntouched();
            this.registrationFormData.markAsPristine();

            Object.keys(this.registrationFormData.controls).forEach((key) => {
              this.registrationFormData.get(key)?.setErrors(null);
            });

            this.registrationFormData.patchValue({
              role: 'user',
              termAndConditions: true,
            });
            this.isSubmitting = false;
            this.router.navigate(['auth/login']);
          },
          (err) => {
            this.isSubmitting = false;
            if (err.status === 409)
              this.toaster.error(err.error.messages, 'error');
            if (err.status === 406)
              this.toaster.error(err.error.messages, 'error');
            if (err.status === 500)
              this.toaster.error(err.error.messages, 'error');
          }
        );
    }
  }
}
