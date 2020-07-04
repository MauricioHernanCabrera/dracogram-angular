import { Injectable } from '@angular/core';
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

  verify(token: string) {
    const config = {
      headers: {
        Authorizattion: `Bearer ${token}`,
      },
    };

    return this.http.get(`${environment.baseUrl}/auth/verify`, config);
  }

  setToken(token: string) {
    this.cookieService.set('token', token);
  }

  getToken() {
    return this.cookieService.get('token');
  }
}
