import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Response } from './../../../core/models/response.model';
import { AuthService } from './../../../core/services/auth.service';
import { finalize } from 'rxjs/operators';
import { Alert } from './../../../core/models/alert.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  alert: Alert;
  form: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit() {}

  login(event: Event) {
    event.preventDefault();
    if (this.form.invalid) return;

    this.loading = true;
    this.alert = null;
    const { email, password } = this.form.value;

    this.authService
      .login(email, password)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (response: Response) => {
          this.authService.setToken(response.data.token);
          this.router.navigate(['/admin/users']);
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
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
}
