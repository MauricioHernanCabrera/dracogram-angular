import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../core/services/user.service';
import { Response } from './../../../core/models/response.model';
import { User } from 'src/app/core/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import CryptoJS from 'crypto-js';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: Array<User> = [];
  search: string = '';

  constructor(private userService: UserService) {}

  makeGravatarUrl(email) {
    return `https://www.gravatar.com/avatar/${CryptoJS.MD5(
      email.toLowerCase()
    )}`;
  }

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
}
