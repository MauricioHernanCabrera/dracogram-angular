import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-user',
  styleUrls: ['form-user.component.scss'],
  templateUrl: 'form-user.component.html',
})
export class FormUserComponent {
  constructor(
    public dialogRef: MatDialogRef<FormUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  save(event) {
    event.preventDefault();
    if (this.data.form.invalid) return;
    this.dialogRef.close(this.data.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
