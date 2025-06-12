import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { UserRegistrationModel } from '../../models/user.registration.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private authService: AuthService,
    private routerService: Router
  ) {}
  isLoggingIn: boolean = false;
  passwordHide: boolean = true;
  loginFormData!: FormGroup;
  signInWithGoogle() {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loginFormData = this.formBuilder.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
        ],
      ],
    });
  }

  Submit() {
    if (this.loginFormData.invalid) {
      this.loginFormData.markAllAsTouched;
    } else {
      this.isLoggingIn = true;
      this.authService
        .login(this.loginFormData.value as UserRegistrationModel)
        .subscribe(
          (res) => {
            const jwtToken = res.jwtToken;
            localStorage.setItem('jwtToken', jwtToken);
            const role = this.authService.getRole();
            if (role === 'admin') {
              this.routerService.navigate(['../admin/dashboard']);
              this.toasterService.success(res.message, 'success');
            } else if (role === 'user') {
              this.routerService.navigate(['../user/']);
              this.toasterService.success(res.message, 'success');
            }
            this.isLoggingIn = false;
            this.loginFormData.reset();
          },
          (err) => {
            if (
              err.status === 400 ||
              err.status === 404 ||
              err.status === 403 ||
              err.status === 500
            ) {
              this.toasterService.error(err.error.message, 'error');
            }
          }
        );
    }
  }
}
