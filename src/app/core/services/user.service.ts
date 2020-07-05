import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from './../../../environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    return throwError(error.error);
  }

  getAll() {
    return this.http
      .get(`${environment.baseUrl}/users`)
      .pipe(catchError(this.handleError));
  }

  createOne(user: User) {
    return this.http
      .post(`${environment.baseUrl}/users`, user)
      .pipe(catchError(this.handleError));
  }

  getOne(id: string) {
    return this.http
      .get(`${environment.baseUrl}/users/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateOne(id: string, user: Partial<User>) {
    return this.http
      .patch(`${environment.baseUrl}/users/${id}`, user)
      .pipe(catchError(this.handleError));
  }

  deleteOne(id: string) {
    return this.http
      .delete(`${environment.baseUrl}/users/${id}`)
      .pipe(catchError(this.handleError));
  }
}
