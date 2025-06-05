import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

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
      console.log(this.loginFormData.value);
      this.loginFormData.reset();
    }
  }
}
