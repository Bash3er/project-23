import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { AttendanceService } from '../../services/attendance.service';
import { LeaveService } from '../../services/leave.service';
import { DashboardStats, LeaveRequest, AttendanceRecord } from '../../models/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule, MatButtonModule, MatProgressBarModule, MatChipsModule, MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private attendanceSvc = inject(AttendanceService);
  private leaveSvc = inject(LeaveService);

  stats: DashboardStats | null = null;
  pendingLeaves: LeaveRequest[] = [];
  todayAttendance: AttendanceRecord[] = [];
  loading = true;
  today = new Date();

  ngOnInit(): void {
    this.attendanceSvc.getDashboardStats().subscribe(s => {
      this.stats = s;
      this.loading = false;
    });
    this.leaveSvc.getPendingLeaves().subscribe(l => this.pendingLeaves = l.slice(0, 5));
    this.attendanceSvc.getAttendanceByDate('2024-01-15').subscribe(a => this.todayAttendance = a);
  }

  getGreeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  }
}
