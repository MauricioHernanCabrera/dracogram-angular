import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from './../../../environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private handleError(error: HttpErrorResponse) {
    return throwError(error.error);
  }

  login(email: string, password: string) {
    return this.http
      .post(`${environment.baseUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(catchError(this.handleError));
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    return this.http
      .post(`${environment.baseUrl}/auth/register`, {
        firstName,
        lastName,
        email,
        password,
      })
      .pipe(catchError(this.handleError));
  }

  verify() {
    // const config = {
    //   headers: {
    //     Authorizattion: `Bearer ${token}`,
    //   },
    // };

    return this.http
      .get(`${environment.baseUrl}/auth/verify`)
      .pipe(catchError(this.handleError));
  }

  setToken(token: string) {
    const myDate = new Date();
    const expires = new Date(myDate.setDate(myDate.getDate() + 30));

    this.cookieService.set('token', token, expires, '/');
  }

  getToken() {
    return this.cookieService.get('token');
  }

  isAuthenticated(): boolean {
    return false;
    // const token = this.getToken();
    // console.log('isAuthenticated', this.jwtHelperService.isTokenExpired(token));
    // return !this.jwtHelperService.isTokenExpired(token);
  }
}
