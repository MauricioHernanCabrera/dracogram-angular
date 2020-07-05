import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../../../core/services/auth.service';
import { finalize } from 'rxjs/operators';
import { Alert } from './../../../core/models/alert.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  alert: Alert;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit() {}

  register(event: Event) {
    event.preventDefault();
    if (this.form.invalid) return;

    this.loading = true;
    this.alert = null;
    const { firstName, lastName, email, password } = this.form.value;

    this.authService
      .register(firstName, lastName, email, password)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (response) => {
          this.authService
            .login(email, password)
            .pipe(
              finalize(() => {
                this.loading = false;
              })
            )
            .subscribe(
              (response) => {
                this.router.navigate(['/']);
                this.alert = {
                  message: 'Usuario logueado',
                  type: 'success',
                };
              },
              (error) => {
                this.alert = {
                  message: error.message,
                  type: 'error',
                };
              }
            );
        },
        (error) => {
          this.alert = {
            message: error.message,
            type: 'error',
          };
        }
      );
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
}
