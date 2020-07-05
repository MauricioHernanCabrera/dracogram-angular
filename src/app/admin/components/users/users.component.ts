import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../core/services/user.service';
import { Response } from './../../../core/models/response.model';
import { User } from 'src/app/core/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { findIndex } from 'lodash';
import CryptoJS from 'crypto-js';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormUserComponent } from '../form-user/form-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: Array<User> = [];
  search: string = '';

  form: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((response: Response) => {
      this.users = response.data.map((user) => ({
        ...user,
        gravatarUrl: this.makeGravatarUrl(user.email),
      }));
    });
  }

  get usersFiltered() {
    const search = this.search.toLowerCase();
    return this.users.filter(({ email }) =>
      email.toLowerCase().includes(search)
    );
  }

  makeGravatarUrl(email) {
    return `https://www.gravatar.com/avatar/${CryptoJS.MD5(
      email.toLowerCase()
    )}`;
  }

  openFormCreate(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    const dialogRef = this.dialog.open(FormUserComponent, {
      width: '450px',
      data: { form: this.form, isCreated: true },
    });

    dialogRef.afterClosed().subscribe((userData) => {
      if (userData === null) return;
      this.users.push({
        ...userData,
        id: Date.now().toString(),
        gravatarUrl: this.makeGravatarUrl(userData.email),
      });
    });
  }

  openFormUpdate(user: User): void {
    this.form = this.formBuilder.group({
      firstName: [user.firstName, [Validators.required]],
      lastName: [user.lastName, [Validators.required]],
      email: [user.email, [Validators.required, Validators.email]],
    });

    const dialogRef = this.dialog.open(FormUserComponent, {
      width: '450px',
      data: { form: this.form, isCreated: false },
    });

    dialogRef.afterClosed().subscribe((userData) => {
      if (userData === null) return;

      const indexUser = findIndex(this.users, ['id', user.id]);
      if (indexUser === -1) return;

      this.users.splice(indexUser, 1, {
        ...userData,
        id: user.id,
        gravatarUrl: this.makeGravatarUrl(userData.email),
      });
    });
  }
}
