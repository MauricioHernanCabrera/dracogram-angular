import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { UsersComponent } from './components/users/users.component';
import { LayoutComponent } from './components/layout/layout.component';

import { SharedModule } from './../shared/shared.module';
import { MaterialModule } from './../material/material.module';

@NgModule({
  declarations: [UsersComponent, LayoutComponent],
  imports: [CommonModule, SharedModule, MaterialModule, AdminRoutingModule],
})
export class AdminModule {}
