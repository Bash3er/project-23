import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LeaveService } from '../../services/leave.service';
import { AuthService } from '../../services/auth.service';
import { LeaveRequest } from '../../models/models';
import { LeaveTypeBadgePipe } from '../../pipes/filter-employees.pipe';
import { LeaveStatusHighlightDirective } from '../../directives/attendance-highlight.directive';

@Component({
  selector: 'app-leave-approval',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    MatCardModule, MatIconModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatTableModule, MatTabsModule,
    MatChipsModule, MatDialogModule, MatSnackBarModule, MatTooltipModule,
    LeaveTypeBadgePipe, LeaveStatusHighlightDirective
  ],
  templateUrl: './leave-approval.component.html',
  styleUrls: ['./leave-approval.component.scss']
})
export class LeaveApprovalComponent implements OnInit {
  private leaveSvc = inject(LeaveService);
  private authSvc = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);

  allLeaves: LeaveRequest[] = [];
  selectedLeave: LeaveRequest | null = null;

  approvalForm: FormGroup = this.fb.group({
    remarks: ['', Validators.maxLength(200)]
  });

  filterStatus = 'pending';
  filterDept = '';
  loading = false;

  get pending() { return this.allLeaves.filter(l => l.status === 'pending'); }
  get approved() { return this.allLeaves.filter(l => l.status === 'approved'); }
  get rejected() { return this.allLeaves.filter(l => l.status === 'rejected'); }
  get filtered() {
    return this.allLeaves.filter(l => {
      const ms = !this.filterStatus || l.status === this.filterStatus;
      const md = !this.filterDept || l.department === this.filterDept;
      return ms && md;
    });
  }
  get departments(): string[] {
    return [...new Set(this.allLeaves.map(l => l.department))];
  }

  ngOnInit(): void {
    this.leaveSvc.getLeaveRequests().subscribe(l => this.allLeaves = l);
  }

  selectLeave(leave: LeaveRequest): void {
    this.selectedLeave = leave;
    this.approvalForm.reset();
  }

  approve(): void {
    if (!this.selectedLeave) return;
    const user = this.authSvc.getUser();
    this.leaveSvc.updateLeaveStatus(
      this.selectedLeave.id!,
      'approved',
      user?.name ?? 'HR',
      this.approvalForm.value.remarks
    ).subscribe(() => {
      this.snackBar.open('✓ Leave approved!', 'Close', { duration: 3000, panelClass: 'success-snack' });
      this.ngOnInit();
      this.selectedLeave = null;
    });
  }

  reject(): void {
    if (!this.selectedLeave) return;
    const user = this.authSvc.getUser();
    this.leaveSvc.updateLeaveStatus(
      this.selectedLeave.id!,
      'rejected',
      user?.name ?? 'HR',
      this.approvalForm.value.remarks
    ).subscribe(() => {
      this.snackBar.open('Leave rejected.', 'Close', { duration: 3000 });
      this.ngOnInit();
      this.selectedLeave = null;
    });
  }
}
