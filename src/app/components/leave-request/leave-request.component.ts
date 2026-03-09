import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { LeaveService } from '../../services/leave.service';
import { AuthService } from '../../services/auth.service';
import { LeaveRequest, LeaveBalance, LEAVE_TYPES } from '../../models/models';
import { LeaveTypeBadgePipe } from '../../pipes/filter-employees.pipe';

@Component({
  selector: 'app-leave-request',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatCardModule, MatIconModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatSnackBarModule, MatStepperModule,
    MatChipsModule, MatDividerModule, LeaveTypeBadgePipe
  ],
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})
export class LeaveRequestComponent implements OnInit {
  private fb = inject(FormBuilder);
  private leaveSvc = inject(LeaveService);
  private authSvc = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  leaveTypes = LEAVE_TYPES;
  leaveBalance: LeaveBalance | null = null;
  myLeaves: LeaveRequest[] = [];
  submitting = false;
  submitted = false;

  leaveForm: FormGroup = this.fb.group({
    leaveType: ['', Validators.required],
    fromDate: ['', Validators.required],
    toDate: ['', Validators.required],
    reason: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
    contactDuring: [''],
    handoverTo: ['']
  }, { validators: this.dateRangeValidator });

  get user() { return this.authSvc.getUser(); }
  get leaveDays(): number {
    const { fromDate, toDate } = this.leaveForm.value;
    if (!fromDate || !toDate) return 0;
    const diff = new Date(toDate).getTime() - new Date(fromDate).getTime();
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1);
  }

  dateRangeValidator(group: FormGroup) {
    const from = group.get('fromDate')?.value;
    const to = group.get('toDate')?.value;
    if (from && to && new Date(to) < new Date(from)) {
      return { dateRange: true };
    }
    return null;
  }

  ngOnInit(): void {
    if (this.user) {
      this.leaveSvc.getLeaveBalance(this.user.employeeId).subscribe(b => this.leaveBalance = b ?? null);
      this.leaveSvc.getLeavesByEmployee(this.user.employeeId).subscribe(l => this.myLeaves = l);
    }
  }

  getBalance(type: string): number {
    if (!this.leaveBalance) return 0;
    return (this.leaveBalance as any)[type] ?? 0;
  }

  onSubmit(): void {
    if (this.leaveForm.invalid || !this.user) return;
    this.submitting = true;

    const leave: Omit<LeaveRequest, 'id'> = {
      employeeId: this.user.employeeId,
      employeeName: this.user.name,
      department: this.user.department,
      leaveType: this.leaveForm.value.leaveType,
      fromDate: this.leaveForm.value.fromDate,
      toDate: this.leaveForm.value.toDate,
      days: this.leaveDays,
      reason: this.leaveForm.value.reason,
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0]
    };

    this.leaveSvc.applyLeave(leave).subscribe(() => {
      this.submitting = false;
      this.submitted = true;
      this.snackBar.open('✓ Leave request submitted successfully!', 'Close', { duration: 4000, panelClass: 'success-snack' });
      this.myLeaves.unshift({ ...leave, id: Date.now() });
      this.leaveForm.reset();
      setTimeout(() => this.submitted = false, 5000);
    });
  }

  resetForm(): void {
    this.leaveForm.reset();
    this.submitted = false;
  }
}
