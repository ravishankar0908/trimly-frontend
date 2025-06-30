import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { UserRegistrationModel } from '../../models/user.registration.model';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MyDecodedToken } from '../../models/token.model';
import { LoginModel } from '../../models/login.model';

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
      this.loginFormData.markAllAsTouched();
    } else {
      this.isLoggingIn = true;
      this.authService.login(this.loginFormData.value as LoginModel).subscribe({
        next: (res) => {
          this.handleLoginSuccess(res);
          this.isLoggingIn = false;
        },
        error: (err) => {
          this.handleError(err);
          this.isLoggingIn = false;
        },
      });
    }
  }

  handleLoginSuccess(res: any) {
    const jwtToken = res.jwtToken;
    this.TokenDecodedValues(jwtToken);
    if (jwtToken) {
      localStorage.setItem('jwtToken', jwtToken);
      const role = this.authService.getRole();
      if (role) {
        this.redirectByRole(role, res.message);
        this.toasterService.success(res.message, 'success');
        this.loginFormData.reset();
      }
    }
  }
  handleError(err: any) {
    const errorCodes = [400, 404, 403, 500];
    if (errorCodes.includes(err.status)) {
      this.toasterService.error(err.error.message, 'error');
    }
  }

  redirectByRole(role: string, message: string) {
    if (role === 'admin') {
      this.routerService.navigate(['../admin/dashboard']);
    } else if (role === 'user') {
      this.routerService.navigate(['../users/dashboard']);
    } else if (role === 'shopowner') {
      this.routerService.navigate(['../shops/dashboard']);
    }
  }

  TokenDecodedValues(token: any) {
    if (token) {
      const decodedToken = jwtDecode<MyDecodedToken>(token);
      localStorage.setItem('id', decodedToken.id);
    }
  }
}
