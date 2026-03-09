import { Component, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Employee, DEPARTMENTS } from '../../models/models';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatDividerModule],
  template: `
    <div class="dialog-header">
      <div class="dialog-icon"><mat-icon>{{ isEdit ? 'edit' : 'person_add' }}</mat-icon></div>
      <div>
        <h2>{{ isEdit ? 'Edit Employee' : 'Add New Employee' }}</h2>
        <p>{{ isEdit ? 'Update employee information' : 'Fill in the details to register a new employee' }}</p>
      </div>
      <button mat-icon-button mat-dialog-close class="close-btn"><mat-icon>close</mat-icon></button>
    </div>

    <form #empForm="ngForm" (ngSubmit)="onSubmit(empForm)" novalidate>
      <mat-dialog-content class="dialog-body">

        <div class="form-row">
          <mat-form-field appearance="outline">
            <mat-label>Full Name</mat-label>
            <mat-icon matPrefix>person</mat-icon>
            <input matInput [(ngModel)]="formData.name" name="name" required minlength="3"
              #name="ngModel" placeholder="e.g. Arjun Sharma">
            @if (name.invalid && name.touched) {
              <mat-error>Full name is required (min 3 chars)</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Email Address</mat-label>
            <mat-icon matPrefix>email</mat-icon>
            <input matInput [(ngModel)]="formData.email" name="email" required email
              #email="ngModel" placeholder="email@lnt.com">
            @if (email.invalid && email.touched) {
              <mat-error>Valid email is required</mat-error>
            }
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline">
            <mat-label>Department</mat-label>
            <mat-icon matPrefix>business</mat-icon>
            <mat-select [(ngModel)]="formData.department" name="department" required #dept="ngModel">
              @for (d of departments; track d) {
                <mat-option [value]="d">{{ d }}</mat-option>
              }
            </mat-select>
            @if (dept.invalid && dept.touched) {
              <mat-error>Department is required</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Designation</mat-label>
            <mat-icon matPrefix>work</mat-icon>
            <input matInput [(ngModel)]="formData.designation" name="designation" required
              #desig="ngModel" placeholder="e.g. Software Engineer">
            @if (desig.invalid && desig.touched) {
              <mat-error>Designation is required</mat-error>
            }
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline">
            <mat-label>Phone Number</mat-label>
            <mat-icon matPrefix>phone</mat-icon>
            <input matInput [(ngModel)]="formData.phone" name="phone" required
              pattern="[0-9]{10}" #phone="ngModel" placeholder="10-digit number">
            @if (phone.invalid && phone.touched) {
              <mat-error>Valid 10-digit phone required</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Join Date</mat-label>
            <mat-icon matPrefix>calendar_today</mat-icon>
            <input matInput [(ngModel)]="formData.joinDate" name="joinDate" type="date" required
              #joinDate="ngModel">
            @if (joinDate.invalid && joinDate.touched) {
              <mat-error>Join date is required</mat-error>
            }
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline">
            <mat-label>Reporting Manager</mat-label>
            <mat-icon matPrefix>supervisor_account</mat-icon>
            <input matInput [(ngModel)]="formData.manager" name="manager" placeholder="Manager name">
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Status</mat-label>
            <mat-select [(ngModel)]="formData.status" name="status">
              <mat-option value="active">Active</mat-option>
              <mat-option value="inactive">Inactive</mat-option>
            </mat-select>
          </mat-form-field>
        </div>

      </mat-dialog-content>

      <mat-dialog-actions class="dialog-actions">
        <button type="button" mat-stroked-button mat-dialog-close>Cancel</button>
        <button type="submit" mat-flat-button color="primary" [disabled]="empForm.invalid">
          <mat-icon>{{ isEdit ? 'save' : 'person_add' }}</mat-icon>
          {{ isEdit ? 'Save Changes' : 'Add Employee' }}
        </button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [`
    .dialog-header {
      display: flex; align-items: flex-start; gap: 14px;
      padding: 24px 24px 0;
      .dialog-icon {
        width: 44px; height: 44px; background: var(--primary); border-radius: 12px;
        display: flex; align-items: center; justify-content: center;
        mat-icon { color: white; }
      }
      h2 { margin: 0; font-size: 18px; font-weight: 700; }
      p { margin: 2px 0 0; font-size: 13px; color: var(--text-muted); }
      .close-btn { margin-left: auto; }
    }
    .dialog-body { padding: 20px 24px !important; max-height: 70vh; overflow-y: auto; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 4px;
      mat-form-field { width: 100%; }
      @media (max-width: 500px) { grid-template-columns: 1fr; }
    }
    .dialog-actions { padding: 0 24px 24px !important; gap: 10px; justify-content: flex-end !important; }
  `]
})
export class EmployeeFormComponent {
  departments = DEPARTMENTS;
  isEdit: boolean;
  formData: Partial<Employee> = {
    name: '', email: '', department: '', designation: '',
    phone: '', joinDate: '', status: 'active', manager: ''
  };

  constructor(
    private dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    this.isEdit = !!data;
    if (data) this.formData = { ...data };
  }

  onSubmit(form: NgForm): void {
    if (form.valid) this.dialogRef.close(this.formData);
  }
}
