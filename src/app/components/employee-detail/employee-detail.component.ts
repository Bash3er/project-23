import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { EmployeeService } from '../../services/employee.service';
import { AttendanceService } from '../../services/attendance.service';
import { LeaveService } from '../../services/leave.service';
import { Employee, AttendanceRecord, LeaveRequest, LeaveBalance } from '../../models/models';
import { InitialsPipe } from '../../pipes/filter-employees.pipe';
import { LeaveTypeBadgePipe } from '../../pipes/filter-employees.pipe';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule, MatButtonModule, MatTabsModule, MatChipsModule, MatDividerModule, InitialsPipe, LeaveTypeBadgePipe],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private empSvc = inject(EmployeeService);
  private attendanceSvc = inject(AttendanceService);
  private leaveSvc = inject(LeaveService);

  employee: Employee | null = null;
  attendance: AttendanceRecord[] = [];
  leaveRequests: LeaveRequest[] = [];
  leaveBalance: LeaveBalance | null = null;
  loading = true;

  get presentDays(): number { return this.attendance.filter(a => a.status === 'present' || a.status === 'late').length; }
  get absentDays(): number { return this.attendance.filter(a => a.status === 'absent').length; }
  get lateDays(): number { return this.attendance.filter(a => a.status === 'late').length; }
  get attendanceRate(): number {
    return this.attendance.length ? Math.round((this.presentDays / this.attendance.length) * 100) : 0;
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.empSvc.getEmployeeById(id).subscribe({
      next: emp => {
        this.employee = emp ?? this.empSvc.getMockEmployees().find(e => e.id === id) ?? null;
        this.loading = false;
      },
      error: () => {
        this.employee = this.empSvc.getMockEmployees().find(e => e.id === id) ?? null;
        this.loading = false;
      }
    });
    this.attendanceSvc.getAttendanceByEmployee(id).subscribe(a => this.attendance = a);
    this.leaveSvc.getLeavesByEmployee(id).subscribe(l => this.leaveRequests = l);
    this.leaveSvc.getLeaveBalance(id).subscribe(b => this.leaveBalance = b ?? null);
  }
}
