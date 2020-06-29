import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// import { AuthService } from './../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router // private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit() {}

  login(event: Event) {
    event.preventDefault();
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000);
    // if (this.form.valid) {
    //   const value = this.form.value;
    //   // this.authService.login(value.email, value.password)
    //   // .then(() => {
    //   //   this.router.navigate(['/admin']);
    //   // })
    //   // .catch(() => {
    //   //   alert('no es valido');
    //   // });
    // }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
}
