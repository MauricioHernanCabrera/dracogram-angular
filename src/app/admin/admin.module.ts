import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { UsersComponent } from './components/users/users.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FormUserComponent } from './components/form-user/form-user.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { MaterialModule } from './../material/material.module';

@NgModule({
  declarations: [UsersComponent, LayoutComponent, FormUserComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AdminModule {}
